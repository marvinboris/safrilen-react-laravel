import { UserGroupIcon } from '@heroicons/react/24/outline'

import { useContentContext } from '../../../app/contexts/content'
import { convertDate, updateObject } from '../../../app/helpers/utils'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import UserType from '../../../app/types/models/user'

import Photo from '../../../components/backend/ui/list/photo'
import Action from '../../../components/backend/ui/list/action'
import ManageRead from '../../../components/backend/ui/page/read'

import { selectAuth } from '../../../features/auth/authSlice'
import { selectBackend, _delete } from '../../../features/backend/backendSlice'

const ManagerUsersPage = () => {
    const dispatch = useAppDispatch()

    const { role } = useAppSelector(selectAuth)
    const { data: backend } = useAppSelector(selectBackend)

    const { content } = useContentContext()
    const { cms: { backend: { components: { list: { action, see } }, pages: { users: { form } } } } } = content!

    const resource = 'users'
    const props = { delete: (id: number) => dispatch(_delete({ role: role!, resource, id })) }

    const data = (backend && backend.users ? (backend.users as UserType[]) : []).map(user => {
        return updateObject(user, {
            created_at: convertDate(user.created_at),
            photo: <Photo photo={user.photo} see={see} title={`${form.user_photo}: ${user.name}`} />,
            action: <Action props={props} resource={resource} item={user} />,
        });
    });

    const fields = [
        { name: form.full_name, key: 'name' },
        { name: form.email, key: 'email' },
        { name: form.phone, key: 'phone' },
        { name: form.role, key: 'role' },
        { name: form.photo, key: 'photo' },
        { name: action, key: 'action', fixed: true }
    ]

    return <ManageRead data={data} fields={fields} icon={UserGroupIcon} resource={resource} />
}

export default ManagerUsersPage
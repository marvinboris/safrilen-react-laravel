import { TagIcon } from '@heroicons/react/24/outline'

import { useContentContext } from '../../../app/contexts/content'
import { convertDate, updateObject } from '../../../app/helpers/utils'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import RoleType from '../../../app/types/models/role'

import Action from '../../../components/backend/ui/list/action'
import ManageRead from '../../../components/backend/ui/page/read'

import { selectAuth } from '../../../features/auth/authSlice'
import { selectBackend, _delete } from '../../../features/backend/backendSlice'

const ManageRolesPage = () => {
    const dispatch = useAppDispatch()

    const { role } = useAppSelector(selectAuth)
    const { data: backend } = useAppSelector(selectBackend)

    const { content } = useContentContext()
    const { cms: { backend: { components: { list: { action, see } }, pages: { roles: { form } } } } } = content!

    const resource = 'roles'
    const props = { delete: (id: number) => dispatch(_delete({ role: role!, resource, id })) }

    const data = (backend && backend.roles ? (backend.roles as RoleType[]) : []).map(role => updateObject(role, {
        created_at: convertDate(role.created_at),
        action: <Action props={props} resource='roles' item={role} />,
    }));

    const fields = [
        { name: form.name, key: 'name' },
        { name: form.description, key: 'description' },
        { name: form.created_at, key: 'created_at' },
        { name: action, key: 'action', fixed: true }
    ]

    return <ManageRead data={data} fields={fields} icon={TagIcon} resource={resource} />
}

export default ManageRolesPage
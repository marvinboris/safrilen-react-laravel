import { PhotoIcon } from '@heroicons/react/24/outline'

import { useContentContext } from '../../../app/contexts/content'
import { convertDate, updateObject } from '../../../app/helpers/utils'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import ImageType from '../../../app/types/models/image'

import Photo from '../../../components/backend/ui/list/photo'
import Action from '../../../components/backend/ui/list/action'
import ManageRead from '../../../components/backend/ui/page/read'

import { selectAuth } from '../../../features/auth/authSlice'
import { selectBackend, _delete } from '../../../features/backend/backendSlice'

const ManagerImagesPage = () => {
    const dispatch = useAppDispatch()

    const { role } = useAppSelector(selectAuth)
    const { data: backend } = useAppSelector(selectBackend)

    const { content } = useContentContext()
    const { cms: { backend: { components: { list: { action, see } }, pages: { images: { form } } } } } = content!

    const resource = 'images'
    const props = { delete: (id: number) => dispatch(_delete({ role: role!, resource, id })) }

    const data = (backend && backend.images ? (backend.images as ImageType[]) : []).map(image => {
        return updateObject(image, {
            created_at: convertDate(image.created_at),
            photo: <Photo photo={image.photo} see={see} title={image.photo!} />,
            action: <Action props={props} resource='images' item={image} />,
        });
    });

    const fields = [
        { name: form.photo, key: 'photo' },
        { name: action, key: 'action', fixed: true }
    ]

    return <ManageRead data={data} fields={fields} icon={PhotoIcon} resource={resource} />
}

export default ManagerImagesPage
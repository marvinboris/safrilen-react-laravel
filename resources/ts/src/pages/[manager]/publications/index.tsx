import { ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/outline'

import { useContentContext } from '../../../app/contexts/content'
import { useLanguageContext } from '../../../app/contexts/language'
import { convertDate, htmlEntities, updateObject } from '../../../app/helpers/utils'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import PublicationType from '../../../app/types/models/publication'

import Action from '../../../components/backend/ui/list/action'
import Photo from '../../../components/backend/ui/list/photo'
import Status from '../../../components/backend/ui/list/status'
import ManageRead from '../../../components/backend/ui/page/read'

import { selectAuth } from '../../../features/auth/authSlice'
import { selectBackend, _delete } from '../../../features/backend/backendSlice'

const ManagePublicationsPage = () => {
    const dispatch = useAppDispatch()

    const { role } = useAppSelector(selectAuth)
    const { data: backend } = useAppSelector(selectBackend)

    const { content } = useContentContext()
    const { cms: { backend: { components: { list: { action, see } }, pages: { publications: { form } } } } } = content!

    const { language } = useLanguageContext()
    const abbr = language?.abbr!

    const resource = 'publications'
    const props = { delete: (id: number) => dispatch(_delete({ role: role!, resource, id })) }

    const data = (backend && backend.publications ? (backend.publications as PublicationType[]) : []).map(publication => {
        return updateObject(publication, {
            created_at: convertDate(publication.created_at),
            title: publication.title[abbr],
            description: publication.description[abbr],
            body: htmlEntities(publication.body[abbr]),
            photo: <Photo photo={publication.photo} see={see} title={`${form.publication_photo}: ${publication.title}`} />,
            is_active: <Status value={publication.is_active === 1} />,
            action: <Action props={props} resource='publications' item={publication} />,
        });
    });

    const fields = [
        { name: form.title, key: 'title' },
        { name: form.description, key: 'description' },
        { name: form.body, key: 'body' },
        { name: form.is_active, key: 'is_active' },
        { name: form.photo, key: 'photo' },
        { name: action, key: 'action', fixed: true }
    ]

    return <ManageRead data={data} fields={fields} icon={ChatBubbleLeftEllipsisIcon} resource={resource} />
}

export default ManagePublicationsPage
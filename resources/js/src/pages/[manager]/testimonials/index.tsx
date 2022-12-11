import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline'

import { useContentContext } from '../../../app/contexts/content'
import { convertDate, updateObject } from '../../../app/helpers/utils'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import TestimonialType from '../../../app/types/models/testimonial'

import Photo from '../../../components/backend/ui/list/photo'
import Action from '../../../components/backend/ui/list/action'
import ManageRead from '../../../components/backend/ui/page/read'

import { selectAuth } from '../../../features/auth/authSlice'
import { selectBackend, _delete } from '../../../features/backend/backendSlice'

const ManageTestimonialsPage = () => {
    const dispatch = useAppDispatch()

    const { role } = useAppSelector(selectAuth)
    const { data: backend } = useAppSelector(selectBackend)

    const { content } = useContentContext()
    const { cms: { backend: { components: { list: { action, see } }, pages: { testimonials: { form } } } } } = content!

    const resource = 'testimonials'
    const props = { delete: (id: number) => dispatch(_delete({ role: role!, resource, id })) }

    const data = (backend && backend.testimonials ? (backend.testimonials as TestimonialType[]) : []).map(testimonial => {
        return updateObject(testimonial, {
            created_at: convertDate(testimonial.created_at),
            photo: <Photo photo={testimonial.photo} see={see} title={`${form.testimonial_photo}: ${testimonial.name}`} />,
            action: <Action props={props} resource='testimonials' item={testimonial} />,
        });
    });

    const fields = [
        { name: form.name, key: 'name' },
        { name: form.title, key: 'title' },
        { name: form.body, key: 'body' },
        { name: form.photo, key: 'photo' },
        { name: action, key: 'action', fixed: true }
    ]

    return <ManageRead data={data} fields={fields} icon={ChatBubbleOvalLeftEllipsisIcon} resource={resource} />
}

export default ManageTestimonialsPage
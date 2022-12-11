import { CogIcon } from '@heroicons/react/24/outline'

import { useContentContext } from '../../../app/contexts/content'
import { convertDate, updateObject } from '../../../app/helpers/utils'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import FeatureType from '../../../app/types/models/feature'

import Action from '../../../components/backend/ui/list/action'
import ManageRead from '../../../components/backend/ui/page/read'

import { selectAuth } from '../../../features/auth/authSlice'
import { selectBackend, _delete } from '../../../features/backend/backendSlice'

const ManagerFeaturesPage = () => {
    const dispatch = useAppDispatch()

    const { role } = useAppSelector(selectAuth)
    const { data: backend } = useAppSelector(selectBackend)

    const { content } = useContentContext()
    const { cms: { backend: { components: { list: { action } }, pages: { features: { form } } } } } = content!

    const resource = 'features'
    const props = { delete: (id: number) => dispatch(_delete({ role: role!, resource, id })) }

    const data = (backend && backend.features ? (backend.features as FeatureType[]) : []).map(feature => updateObject(feature, {
        created_at: convertDate(feature.created_at),
        action: <Action props={props} resource='features' item={feature} />,
    }));

    const fields = [
        { name: form.name, key: 'name' },
        { name: form.prefix, key: 'prefix' },
        { name: form.created_at, key: 'created_at' },
        { name: action, key: 'action', fixed: true }
    ]

    return <ManageRead data={data} fields={fields} icon={CogIcon} resource={resource} />
}

export default ManagerFeaturesPage
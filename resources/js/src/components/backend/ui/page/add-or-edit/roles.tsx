import { PencilIcon, TagIcon } from "@heroicons/react/24/outline"
import { ChangeEvent, useEffect, useState } from "react"

import { useContentContext } from "../../../../../app/contexts/content"
import { useAppSelector } from "../../../../../app/hooks"
import FeatureInterface from "../../../../../app/types/models/feature"
import ManagerResourceManageStateType from "../../../../../app/types/account/manager/add-or-edit/state"

import { selectBackend } from "../../../../../features/backend/backendSlice"

import Input from "../../form/input"

import ManagerAddOrEdit from "."

type Props = { edit?: boolean }
type FeatureType = { id: number, permissions: string[] }

const initialState = {
    name: '',
    description: '',

    add: false,
}

export default function ManageAddOrEditRoles({ edit }: Props) {
    const { data: backend } = useAppSelector(selectBackend)

    const { content } = useContentContext()
    const { cms: { backend: { pages: { roles: { form } } } } } = content!

    const [state, setState] = useState<ManagerResourceManageStateType>({ ...initialState })
    const [features, setFeatures] = useState<FeatureType[] | null>(null)

    useEffect(() => {
        if (!features && state.features) setFeatures(state.features as FeatureType[])
    }, [features, state.features])

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, name, value } = e.target;
        if (name.includes('features')) {
            let featuresCp = [...(features || [])];

            if (name.includes('id')) {
                const [, featureId] = id.split('-');
                const feature = featuresCp.find(f => f.id === +featureId);

                if ('checked' in e.target && e.target.checked && !feature) featuresCp.push({ id: +featureId, permissions: [] });
                else featuresCp = featuresCp.filter(f => f.id !== +featureId);
            } else if (name.includes('permissions')) {
                const [, featureId, abbr] = id.split('-');
                const featureIndex = featuresCp.findIndex(f => f.id === +featureId);
                const feature = featuresCp[featureIndex];
                let permissions = [...feature.permissions];
                const found = permissions.includes(abbr);

                if ('checked' in e.target && e.target.checked && !found) permissions.push(abbr);
                else permissions = permissions.filter(permission => permission !== abbr);

                featuresCp[featureIndex] = { ...feature, permissions };
            }

            return setFeatures(featuresCp);
        }
        setState({ ...state, [name]: 'files' in e.target && e.target.files ? e.target.files[0] : value });
    }

    const featuresItems = (backend && backend.features ? (backend.features as (FeatureInterface & { id: number })[]) : []).map(feature => {
        const element = (features || []).find(i => i.id === feature.id);

        const permissions = [{ abbr: 'c', name: form.create }, { abbr: 'u', name: form.update }, { abbr: 'd', name: form.delete }].map(permission => {
            const checked = element && element.permissions.includes(permission.abbr);

            return <div key={JSON.stringify(permission)}>
                <div className="flex space-x-2">
                    <input type="checkbox" id={`feature-${feature.id}-${permission.abbr}`} checked={checked} name={`features[${feature.id}][permissions][${permission.abbr}]`} onChange={inputChangeHandler} />
                    <label htmlFor={`feature-${feature.id}-${permission.abbr}`}>{permission.name}</label>
                </div>
            </div>
        });

        const checked = element !== undefined;

        return <div key={JSON.stringify(feature)}>
            <div className="flex items-center space-x-2">
                <input type="checkbox" id={`feature-${feature.id}`} className="pb-2" checked={checked} name={`features[${feature.id}][id]`} onChange={inputChangeHandler} />
                <label htmlFor={`feature-${feature.id}`} className="font-medium">{feature.name}</label>
            </div>

            {checked && <div className='grid lg:grid-cols-3'>{permissions}</div>}
        </div>
    });

    return <ManagerAddOrEdit icon={TagIcon} edit={edit} resource='roles' singular='role' initialState={initialState} state={state} setState={setState}>
        <div className='grid md:grid-cols-3'>
            <div className="md:col-span-2">
                <div className="flex-1 grid gap-y-2 gap-x-4 grid-cols-1 md:grid-cols-2 overflow-auto">
                    <Input icon={TagIcon} onChange={inputChangeHandler} value={state.name as string} name="name" required validation={{ required: true }} label={form.name} />
                    <Input icon={PencilIcon} onChange={inputChangeHandler} value={state.description as string} name="description" required validation={{ required: true }} label={form.description} />
                </div>

                <div className="mt-4">
                    <div className="pb-2 text-lg font-bold">{form.features}</div>
                    <div className="space-y-2">
                        {featuresItems}
                    </div>
                </div>
            </div>
        </div>
    </ManagerAddOrEdit>
}
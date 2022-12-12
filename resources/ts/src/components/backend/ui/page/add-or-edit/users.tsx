import { EnvelopeIcon, LockClosedIcon, PencilSquareIcon, TagIcon, UserGroupIcon, UserIcon } from "@heroicons/react/24/outline"
import { ChangeEvent, useState } from "react"

import { useContentContext } from "../../../../../app/contexts/content"
import { useAppSelector } from "../../../../../app/hooks"
import RoleType from "../../../../../app/types/models/role"
import ManagerResourceManageStateType from "../../../../../app/types/account/manager/add-or-edit/state"

import { selectBackend } from "../../../../../features/backend/backendSlice"

import Input from "../../form/input"
import InputImage from "../../form/input-image"
import Select from "../../form/select"

import * as utility from '../../utils'

import ManagerAddOrEdit from "."

type Props = { edit?: boolean }

const initialState = {
    name: '',
    phone: '',
    photo: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: '',

    add: false,
}

export default function ManageAddOrEditUsers({ edit }: Props) {
    const { data: backend } = useAppSelector(selectBackend)

    const { content } = useContentContext()
    const { cms: { backend: { pages: { users: { form } } } } } = content!

    const [state, setState] = useState<ManagerResourceManageStateType>({ ...initialState })

    const inputChangeHandler = utility.add.component.inputChangeHandler(setState)
    const fileUpload = utility.add.component.fileUpload

    const roles = backend && backend.roles ? (backend.roles as RoleType[]) : []
    const rolesOptions = roles.map(role => <option key={JSON.stringify(role)} value={role.id}>{role.name}</option>);

    return <ManagerAddOrEdit icon={UserGroupIcon} edit={edit} resource='users' singular='user' initialState={initialState} state={state} setState={setState} staticChild={<>
        <input type="file" id="photo" name="photo" className="hidden" onChange={inputChangeHandler} accept=".png,.jpg,.jpeg" />
    </>}>
        <div className='grid md:grid-cols-3 gap-4'>
            <div className="md:col-span-2">
                <div className="flex-1 grid gap-y-2 gap-x-4 grid-cols-1 md:grid-cols-2 overflow-auto">
                    <Input type="text" icon={UserIcon} onChange={inputChangeHandler} value={state.name as string} name="name" required validation={{ required: true }} label={form.name} />
                    <Input type="tel" addon={!edit && <span className="text-sm">+237</span>} onChange={inputChangeHandler} value={state.phone as string} name="phone" required validation={{ required: true }} label={form.phone} />
                    <Input type="password" icon={LockClosedIcon} onChange={inputChangeHandler} value={state.password as string} name="password" required validation={{ required: true, minLength: 5 }} label={form.password} />
                    <Input type="password" icon={LockClosedIcon} onChange={inputChangeHandler} value={state.password_confirmation as string} name="password_confirmation" required validation={{ required: true, minLength: 5 }} label={form.password_confirmation} />
                    <Input type="email" icon={EnvelopeIcon} onChange={inputChangeHandler} value={state.email as string} name="email" required validation={{ required: true, isEmail: true }} label={form.email} />
                    <Select icon={TagIcon} name="role" label={form.role} onChange={inputChangeHandler} required validation={{ required: true }} value={state.role as string}>
                        <option>{form.select_role}</option>
                        {rolesOptions}
                    </Select>
                </div>
            </div>

            <div>
                <InputImage label={form.photo} name="photo" value={state.photo as string} onClick={() => fileUpload('photo')} />
            </div>
        </div>
    </ManagerAddOrEdit>
}
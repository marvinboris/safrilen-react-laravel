import { ChatBubbleOvalLeftEllipsisIcon, EyeIcon, GlobeAltIcon, WrenchIcon } from "@heroicons/react/24/outline"
import { Fragment, useState } from "react"

import { useContentContext } from "../../../../../app/contexts/content"
import ManagerResourceManageStateType from "../../../../../app/types/account/manager/add-or-edit/state"

import Input from "../../form/input"
import InputImage from "../../form/input-image"
import Select from "../../form/select"

import * as utility from '../../utils'

import ManagerAddOrEdit from "."

type Props = { edit?: boolean }

const initialState = {
    name: '',
    link: '',
    title: {},
    photo: '',
    is_active: '1',

    translate: (import.meta as ImportMeta & { env: { [key: string]: string } }).env.VITE_DEFAULT_LANG,

    add: false,
}

export default function ManageAddOrEditTestimonials({ edit }: Props) {
    const { content } = useContentContext()
    const { cms: { backend: { components: { form: { active, inactive } }, pages: { testimonials: { form } } } }, languages } = content!

    const [state, setState] = useState<ManagerResourceManageStateType>({ ...initialState })

    const inputChangeHandler = utility.add.component.inputChangeHandler(state, setState)
    const fileUpload = utility.add.component.fileUpload

    const languagesOptions = languages.map(language => <option key={JSON.stringify(language)} value={language.abbr}>{language.name}</option>);

    return <ManagerAddOrEdit icon={ChatBubbleOvalLeftEllipsisIcon} edit={edit} resource='testimonials' singular='testimonial' initialState={initialState} state={state} setState={setState} staticChild={<>
        <input type="file" id="photo" name="photo" className="hidden" onChange={inputChangeHandler} accept=".png,.jpg,.jpeg" />
    </>}>
        <div className='grid md:grid-cols-3 gap-4'>
            <div className="md:col-span-2">
                <div className="flex-1 grid gap-y-2 gap-x-4 md:grid-cols-2 overflow-auto">
                    {languages.map(l => <Fragment key={`language-${l.abbr}`}>
                        <Input icon={WrenchIcon} id={`title-${l.abbr}`} className={l.abbr === state.translate ? "" : "hidden"} onChange={inputChangeHandler} value={(state.title as { [key: string]: string })[l.abbr]} name={`title[${l.abbr}]`} required validation={{ required: true }} label={form.title} />
                    </Fragment>)}
                </div>
            </div>

            <div>
                <Select name="translate" label={form.language} onChange={inputChangeHandler} value={state.translate as string}>
                    {languagesOptions}
                </Select>
            </div>

            <div className="md:col-span-3">
                <hr />
            </div>

            <div className="md:col-span-2">
                <div className="flex-1 grid gap-y-2 gap-x-4 grid-cols-1 md:grid-cols-2 overflow-auto">
                    <Input icon={ChatBubbleOvalLeftEllipsisIcon} onChange={inputChangeHandler} value={state.name as string} name="name" required validation={{ required: true }} label={form.name} />
                    <Input icon={GlobeAltIcon} onChange={inputChangeHandler} value={state.link as string} name="link" required validation={{ required: true }} label={form.link} />
                    <Select icon={EyeIcon} label={form.is_active} onChange={inputChangeHandler} value={state.is_active as string} name="is_active" required validation={{ required: true }}>
                        <option>{form.select_status}</option>
                        <option value={1}>{active}</option>
                        <option value={0}>{inactive}</option>
                    </Select>
                </div>
            </div>

            <div>
                <InputImage label={form.photo} name="photo" value={state.photo as string} onClick={() => fileUpload('photo')} />
            </div>
        </div>
    </ManagerAddOrEdit>
}
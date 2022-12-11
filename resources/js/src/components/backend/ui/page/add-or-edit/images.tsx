import { WrenchIcon } from "@heroicons/react/24/outline"
import { ChangeEvent, useState } from "react"

import { useContentContext } from "../../../../../app/contexts/content"
import ManagerResourceManageStateType from "../../../../../app/types/account/manager/add-or-edit/state"

import InputImage from "../../form/input-image"

import * as utility from '../../utils'

import ManagerAddOrEdit from "."

type Props = { edit?: boolean }

const initialState = {
    photo: '',

    add: false,
}

export default function ManageAddOrEditImages({ edit }: Props) {
    const { content } = useContentContext()
    const { cms: { backend: { pages: { images: { form } } } } } = content!

    const [state, setState] = useState<ManagerResourceManageStateType>({ ...initialState })

    const inputChangeHandler = utility.add.component.inputChangeHandler(setState)
    const fileUpload = utility.add.component.fileUpload

    return <ManagerAddOrEdit icon={WrenchIcon} edit={edit} resource='images' singular='image' initialState={initialState} state={state} setState={setState} staticChild={<>
        <input type="file" id="photo" name="photo" className="hidden" onChange={inputChangeHandler} accept=".png,.jpg,.jpeg" />
    </>}>
        <div className='grid md:grid-cols-3 gap-4'>
            <div>
                <InputImage label={form.photo} name="photo" value={state.photo as string} onClick={() => fileUpload('photo')} />
            </div>
        </div>
    </ManagerAddOrEdit>
}
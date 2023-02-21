import React, { useState } from "react";
import ReactQuillOrigin from 'react-quill';

import 'react-quill/dist/quill.snow.css';

type ReactQuillProps = {
    name: string
    label: string
    defaultValue?: string
}

export default function ReactQuill({ name, label, defaultValue = '' }: ReactQuillProps) {
    const [value, setValue] = useState(defaultValue)

    return <>
        {label && <label htmlFor={name}>{label}</label>}

        <ReactQuillOrigin id={name} theme="snow" value={value} onChange={setValue} />
        <input type="hidden" name={name} value={value} />
    </>
}
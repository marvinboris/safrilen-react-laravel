import { ComponentProps, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useContentContext } from '../../../../app/contexts/content'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks'
import Status from '../../../../app/types/enums/status'
import ResourceType from '../../../../app/types/resource'

import { Head } from '../../navigation/layout'
import PageTitle from '../title/page'
import * as utility from '../utils'

import { selectAuth } from '../../../../features/auth/authSlice'
import { get, reset, selectBackend, _delete } from '../../../../features/backend/backendSlice'

type Props = {
    data: { [x: string | number]: any }[]
    icon: (props: ComponentProps<'svg'>) => JSX.Element
    fields: { key: string, name: string, className?: string, fixed?: boolean }[]
    resource: ResourceType
}

export default function ManageRead({ resource, icon, fields, data }: Props) {
    const dispatch = useAppDispatch()

    const { role } = useAppSelector(selectAuth)
    const { status, data: backend, message } = useAppSelector(selectBackend)

    const { content } = useContentContext()
    const { cms: { global: { app_name }, backend: { pages: { [resource]: { index, title } } } } } = content!

    const [isMounted, setIsMounted] = useState(false)
    const params = useMemo(() => ({ role: role!, resource }), [resource, role])

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (status === Status.IDLE && !(backend && backend[resource])) {
            dispatch(get(params))
            setIsMounted(true)
        }
    }, [backend, dispatch, params, resource, status])

    const props = useMemo(() => ({
        auth: { role: role! },
        backend: { status, data: backend!, message },
        content: content!,
        history: { push: navigate, state: location.state },

        get: (page?: number, show?: number | string, search?: string) => dispatch(get({ ...params, page, show, search })),
        delete: (id: number) => dispatch(_delete({ ...params, id: id })),
        reset: () => dispatch(reset()),
    }), [backend, content, dispatch, location.state, message, navigate, params, role, status])

    return <main className='flex-1 flex flex-col'>
        <Head link={`/${role}/${resource}`} title={`${index} | ${app_name}`} description={`${app_name} : ${index}`} />

        <PageTitle icon={icon} title={title} subtitle={index} />

        <utility.index.lifecycle.render icon={icon} props={props} isMounted={isMounted} resource={resource} data={data} fields={fields} />
    </main>
}
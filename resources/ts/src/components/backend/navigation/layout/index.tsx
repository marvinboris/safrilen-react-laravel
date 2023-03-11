import { ReactNode, useEffect, useState } from 'react'
import { HeadProvider, Title, Meta, Link } from 'react-head'
import { useNavigate } from 'react-router-dom'

import SideDrawerContext from '../../../../app/contexts/sideDrawer'
import { useAppSelector } from '../../../../app/hooks'
import { selectAuth } from '../../../../features/auth/authSlice'

import Footer from '../footer'
import Toolbar from '../toolbar'

import SideDrawer from './side-drawer'

interface LayoutProps {
    children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
    const [open, setOpen] = useState(false)
    const { token } = useAppSelector(selectAuth)

    const navigate = useNavigate()

    useEffect(() => {
        const isAuth = localStorage.getItem('token') !== null
        if ((!token && isAuth) || !isAuth) navigate('/')
    }, [navigate, token])

    return token ? <SideDrawerContext.Provider value={{ open, setOpen }}>
        <div className='h-screen flex relative overflow-hidden font-body'>
            <SideDrawer />

            <div className='flex-1 h-screen flex flex-col bg-secondary-100 overflow-y-auto'>
                <Toolbar />
                <div className="relative flex flex-col flex-1">
                    {children}
                </div>
                <Footer />
            </div>
        </div>
    </SideDrawerContext.Provider> : null
}

export interface PageParams {
    link: string
    title: string
    description: string
}

export const Head = ({ link, title, description }: PageParams) => <HeadProvider>
    <Title>{title}</Title>
    <Meta name="description" content={description} />
    <Link rel="canonical" href={location.origin + link} />

    <Meta property='og:title' content={title} />
    <Meta property="og:description" content={description} />
    <Meta property="og:url" content={link} />

    <Meta property='twitter:title' content={title} />
    <Meta property="twitter:description" content={description} />
</HeadProvider>
import { ReactNode } from 'react'
import { HeadProvider, Title, Meta, Link } from 'react-head'

import Footer from './footer'
import Toolbar from './toolbar'

interface LayoutProps {
    children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
    return <div className='min-h-screen flex flex-col relative'>
        <Toolbar />

        <div className="main-wrapper">
            {children}
        </div>

        <Footer />
    </div>
}

interface PageParams {
    link: string
    title: string
    description: string
}

export const Head = ({ link, title, description }: PageParams) => <HeadProvider>
    <Title>{title}</Title>
    <Meta name="description" content={description} />
    <Link rel="canonical" href={link} />

    <Meta property='og:title' content={title} />
    <Meta property="og:description" content={description} />
    <Meta property="og:url" content={link} />

    <Meta property='twitter:title' content={title} />
    <Meta property="twitter:description" content={description} />
</HeadProvider>
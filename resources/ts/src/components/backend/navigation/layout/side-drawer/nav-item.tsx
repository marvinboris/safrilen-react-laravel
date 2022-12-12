import { ComponentProps, ReactNode, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { useSideDrawerContext } from '../../../../../app/contexts/sideDrawer'
import { classNames } from '../../../../../app/helpers/utils'
import { useWindowSize } from '../../../../../app/hooks'

interface NavItemProps {
    href: string
    children: ReactNode
    main?: boolean
    items?: { href: string, label: string }[]
    icon: (props: ComponentProps<'svg'>) => JSX.Element
}

export default function NavItem({ href, icon: Icon, main, children, items }: NavItemProps) {
    const location = useLocation()
    const active = location.pathname.startsWith(href)

    const { width } = useWindowSize()
    const { setOpen } = useSideDrawerContext()

    const [navItemOpen, setNavItemOpen] = useState(false)

    const hideSideDrawer = () => {
        if (width !== undefined && width < 768) setOpen(false)
    }

    return items ? <div>
        <button onClick={() => setNavItemOpen(status => !status)} className={classNames("flex items-center rounded-[12.5106px] w-full truncate transition-all duration-200", main ? 'text-white font-display bg-white relative py-4 scale-[0.87] font-medium shadow-lg after:absolute after:inset-y-3 after:left-2 after:w-1 after:bg-orange after:rounded-xl after:shadow-md' : active ? 'bg-white/10 text-white font-medium py-3 mr-6 px-[11px]' : 'text-secondary-300 hover:text-white px-[11px]')}>
            <div className={classNames(main ? 'mr-[11.68px] pl-[29.19px]' : 'mr-[22px]')}><Icon className={classNames(main ? 'text-white/20 w-4' : 'text-white/50 w-6')} /></div>

            <div>{children}</div>
        </button>

        <div className={classNames('relative overflow-hidden text-sm transition-all duration-200', navItemOpen ? 'max-h-96 py-2' : 'max-h-0')}>
            <div className='absolute -top-[18px] left-[23px] h-full w-[1px] opacity-20'><div className='h-full w-full bg-white' /></div>

            <div className='space-y-2.5'>
                {items.map(({ href: _href, label }) => <div key={`nav-item-${href}-items-${_href}`} className="relative ml-[64px]">
                    <div className='absolute w-7 h-[1px] bg-white/20 top-1/2 -left-[39px] -translate-y-1/2' />

                    <Link onClick={hideSideDrawer} className={classNames(location.pathname.startsWith(href + _href) ? "font-medium text-white" : "text-secondary-300", "transition-all duration-200")} to={href + _href}>{label}</Link>
                </div>)}
            </div>
        </div>
    </div> : <Link to={href} onClick={hideSideDrawer} className={classNames("flex items-center rounded-[12.5106px] w-full truncate transition-all duration-200", main ? 'text-white font-display bg-white relative py-4 scale-[0.87] font-medium shadow-lg after:absolute after:inset-y-3 after:left-2 after:w-1 after:bg-orange after:rounded-xl after:shadow-md' : active ? 'bg-white/10 text-white font-medium py-3 mr-6 px-[11px]' : 'text-secondary-300 hover:text-white px-[11px]')}>
        <div className={classNames(main ? 'mr-[11.68px] pl-[29.19px]' : 'mr-[22px]')}><Icon className={classNames(main ? 'text-white/20 w-4' : 'text-white/50 w-6')} /></div>

        <div>{children}</div>
    </Link>
}
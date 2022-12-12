import { ComponentProps, ReactNode } from 'react'
import View from "../../../ui/view";

type SolutionBlockProps = {
    title: string
    description: ReactNode
    icon: (props: ComponentProps<'svg'>) => JSX.Element
}

export default function SolutionBlock({ title, description, icon: Icon }: SolutionBlockProps) {
    return <View block title={title} action={<div className='cursor-pointer flex flex-1 w-full flex-col items-center justify-center text-center space-y-4 py-2 md:py-3 rounded-lg bg-transparent hover:bg-secondary-100 transition-all duration-200'>
        <div><Icon className='w-16 text-primary' /></div>
        <div className='font-medium'>{title}</div>
    </div>}>
        <div className="container">
            <h3 className="text-primary font-bold text-2xl pb-4 mb-4 border-b border-secondary-300">{title}</h3>

            <div>
                {description}
            </div>
        </div>
    </View>
}
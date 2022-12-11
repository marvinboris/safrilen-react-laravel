import { BoltIcon, LightBulbIcon, PresentationChartLineIcon, ShieldCheckIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline'

import { Head } from '../../components/frontend/navigation/layout'
import SectionBlock from '../../components/frontend/ui/blocks/section'
import ServiceBlock from '../../components/frontend/ui/blocks/service'
import PageTitle from '../../components/frontend/ui/title/page'
import SectionTitle from '../../components/frontend/ui/title/section'

import { useContentContext } from '../../app/contexts/content'

const ServicesPage = () => {
    const { content } = useContentContext()
    const { services, cms: { global: { app_name }, frontend: { header: { menu }, components: { solutions }, pages: { services: cms } } } } = content!

    const servicesContent = services.map(service => <div key={`service-${service.id}`} className='flex-none w-full md:w-1/2 xl:w-1/3 px-3'>
        <ServiceBlock {...service} />
    </div>)

    const solutionsContent = solutions.map((solution, i) => {
        const Icon = [LightBulbIcon, PresentationChartLineIcon, BoltIcon, ShieldCheckIcon, WrenchScrewdriverIcon][i]

        return <div key={`solution-${solution}`} className='flex flex-col flex-none w-1/2 md:w-1/3 px-2 md:px-3 items-center text-center space-y-4 pb-4 md:pb-6'>
            <div><Icon className='w-16 text-primary' /></div>
            <div className='font-medium'>{solution}</div>
        </div>
    })

    return <>
        <Head link='/services' title={`${menu.services} | ${app_name}`} description={cms.description} />
        <main>
            <PageTitle title={cms.title} subtitle={cms.subtitle} />

            <SectionBlock id="services">
                <div className="container">
                    <SectionTitle centered head={cms.services.head} title={cms.services.title} />

                    <div className="flex flex-wrap -mx-3">
                        {servicesContent}
                    </div>
                </div>
            </SectionBlock>

            <SectionBlock id="solutions" className="bg-grid-primary/[0.05] relative z-0 after:absolute after:bottom-0 after:inset-0 after:bg-gradient-to-t after:from-white after:to-transparent after:-z-10">
                <div className="container">
                    <SectionTitle centered head={cms.solutions.head} title={cms.solutions.title} />

                    <div className="flex flex-wrap justify-center -mx-2 px-2 md:-mx-3 md:px-3">
                        {solutionsContent}
                    </div>
                </div>
            </SectionBlock>
        </main>
    </>
}

export default ServicesPage
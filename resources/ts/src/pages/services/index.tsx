import { BoltIcon, LightBulbIcon, PresentationChartLineIcon, ShieldCheckIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline'

import { useContentContext } from '../../app/contexts/content'

import { Head } from '../../components/frontend/navigation/layout'
import SectionBlock from '../../components/frontend/ui/blocks/section'
import SolutionBlock from '../../components/frontend/ui/blocks/solution'
import ServiceBlock from '../../components/frontend/ui/blocks/service'
import PageTitle from '../../components/frontend/ui/title/page'
import SectionTitle from '../../components/frontend/ui/title/section'

const ServicesPage = () => {
    const { content } = useContentContext()
    const { services, cms: { global: { app_name }, frontend: { header: { menu }, components: { solutions }, pages: { services: cms } } } } = content!

    const servicesContent = services.map(service => <div key={`service-${service.id}`} className='flex-none w-full md:w-1/2 xl:w-1/3 px-3'>
        <ServiceBlock {...service} />
    </div>)

const solutionsContent = solutions.map((solution, i) => {
    const Icon = [LightBulbIcon, PresentationChartLineIcon, BoltIcon, ShieldCheckIcon, WrenchScrewdriverIcon][i]

    return <div key={`solution-${solution}`} className="flex-none flex flex-col w-1/2 md:w-1/3 p-2 md:p-3">
      <SolutionBlock icon={Icon} title={solution} rank={i + 1} description={"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati nemo quae error deserunt dignissimos doloremque, dolorum fugit veniam quam ducimus! Ullam doloribus maxime dignissimos quo ex quibusdam, alias excepturi voluptate?"} />
    </div>
  })

    return <>
        <Head link='/services' title={`${menu.services} | ${app_name}`} description={cms.description} />
        <main>
            <PageTitle title={cms.title} />

            <SectionBlock id="services">
                <div className="container">
                    <SectionTitle centered title={cms.services.title} />

                    <div className="flex flex-wrap justify-center -mx-3">
                        {servicesContent}
                    </div>
                </div>
            </SectionBlock>

            <SectionBlock id="solutions" className="bg-grid-primary/[0.05] relative z-0 after:absolute after:bottom-0 after:inset-0 after:bg-gradient-to-t after:from-white after:to-transparent after:-z-10">
                <div className="container">
                    <SectionTitle centered title={cms.solutions.title} />

                    <div className="flex flex-wrap justify-center -mx-2 px-2 md:-mx-3 md:px-3">
                        {solutionsContent}
                    </div>
                </div>
            </SectionBlock>
        </main>
    </>
}

export default ServicesPage
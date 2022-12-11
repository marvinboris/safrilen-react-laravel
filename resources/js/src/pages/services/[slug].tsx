import { useParams } from 'react-router-dom'

import { useContentContext } from '../../app/contexts/content'
import { useLanguageContext } from '../../app/contexts/language'

import { Head } from '../../components/frontend/navigation/layout'
import SectionBlock from '../../components/frontend/ui/blocks/section'
import ServiceBlock from '../../components/frontend/ui/blocks/service'
import PageTitle from '../../components/frontend/ui/title/page'
import SectionTitle from '../../components/frontend/ui/title/section'

const ServicePage = () => {
    const {slug} = useParams()

    const { content } = useContentContext()
    const { services, cms: { global: { app_name }, frontend: { header: { menu }, pages: { services: cms } } } } = content!

    const { language } = useLanguageContext()
    const abbr = language?.abbr!

    const service = services.find(service => service.slug === slug)
    const servicesContent = services.filter(_service => service && (_service.id !== service.id)).map(service => <div key={`service-${service.id}`} className='flex-none w-full md:w-1/2 xl:w-1/3 px-3'>
        <ServiceBlock {...service} />
    </div>)

    return <>
        <Head link={`/services/${slug}`} title={`${service ? `${service.title[abbr]} - ` : ''}${menu.services} | ${app_name}`} description={service ? service.body[abbr] : cms.description} />
        <main>
            <PageTitle title={cms.title} subtitle={service ? service.title[abbr] : cms.subtitle} />

            {service && <SectionBlock id="service">
                <div className="container">
                    <SectionTitle title={service.title[abbr]} />

                    <div className="grid md:grid-cols-2 gap-6">
                        {service.photo && <div>
                            <img src={service.photo} alt={service.title[abbr]} className="rounded-[30px]" />
                        </div>}

                        <div>
                            <div dangerouslySetInnerHTML={{ __html: service.body[abbr] }} />
                        </div>
                    </div>
                </div>
            </SectionBlock>}

            <SectionBlock id="services" className="bg-grid-primary/[0.05] relative z-0 after:absolute after:bottom-0 after:inset-0 after:bg-gradient-to-t after:from-white after:to-transparent after:-z-10">
                <div className="container">
                    <SectionTitle centered head={cms.services.head} title={cms.services.title} />

                    <div className="flex flex-wrap -mx-3">
                        {servicesContent}
                    </div>
                </div>
            </SectionBlock>
        </main>
    </>
}

export default ServicePage
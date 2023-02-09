import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { useContentContext } from '../../app/contexts/content'
import { useLanguageContext } from '../../app/contexts/language'
import PublicationType from '../../app/types/models/publication'

import { Head } from '../../components/frontend/navigation/layout'
import BlogSideDrawer from '../../components/frontend/pages/blog/side-drawer'
import SectionBlock from '../../components/frontend/ui/blocks/section'
import PageTitle from '../../components/frontend/ui/title/page'
import SectionTitle from '../../components/frontend/ui/title/section'

const PublicationPage = () => {
    const { slug } = useParams()

    const { content } = useContentContext()
    const { cms: { global: { app_name }, frontend: { header: { menu }, pages: { publications: cms } } } } = content!

    const { language } = useLanguageContext()
    const abbr = language?.abbr!

    const [publications, setPublications] = useState<PublicationType[]>([])

    useEffect(() => {
        axios.get<PublicationType[]>(`/api/publications`).then(res => setPublications(res.data))
    }, [])

    const publication = publications.find(publication => publication.slug === slug)

    return <>
        <Head link={`/blog/${slug}`} title={`${publication ? `${publication.title[abbr]} - ` : ''}${menu.blog} | ${app_name}`} description={publication ? publication.body[abbr] : cms.description} />
        <main>
            <PageTitle title={cms.title} subtitle={publication ? publication.title[abbr] : cms.subtitle} />

            <div className="container">
                <SectionBlock>
                    <SectionTitle title={publication ? publication.title[abbr] : cms.subtitle} />
                    <div className='grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8'>
                        {publication && <div className='lg:col-span-3'>
                            {publication.photo && <div>
                                <img src={publication.photo} alt={publication.title[abbr]} className="rounded-[30px]" />
                            </div>}

                            <div className='space-y-4 mt-5'>
                                <div className='font-medium text-lg'>{publication.description[abbr]}</div>
                                <div className='list-disc pl-4 space-y-3' />
                                <div dangerouslySetInnerHTML={{ __html: publication.body[abbr] }} />
                            </div>
                        </div>}

                        <BlogSideDrawer publications={publication ? publications.filter(_publication => _publication.id !== publication.id) : publications} />
                    </div>
                </SectionBlock>
            </div>
        </main>
    </>
}

export default PublicationPage
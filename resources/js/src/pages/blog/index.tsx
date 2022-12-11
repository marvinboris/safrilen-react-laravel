import { ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { useContentContext } from '../../app/contexts/content'
import PublicationType from '../../app/types/models/publication'

import { Head } from '../../components/frontend/navigation/layout'
import BlogSideDrawer from '../../components/frontend/pages/blog/side-drawer'
import SectionBlock from '../../components/frontend/ui/blocks/section'
import PageTitle from '../../components/frontend/ui/title/page'
import { useLanguageContext } from '../../app/contexts/language'

const BlogPage = () => {
    const { content } = useContentContext()
    const { cms: { global: { app_name }, frontend: { header: { menu }, pages: { publications: cms } } } } = content!

    const { language } = useLanguageContext()
    const abbr = language?.abbr!

    const [publications, setPublications] = useState<PublicationType[]>([])

    useEffect(() => {
        axios.get<PublicationType[]>(`/api/publications`).then(res => setPublications(res.data))
    }, [])

    const publicationsContent = publications.filter((p, i) => i < 10).map(publication => <div key={`publication-${publication.id}`}>
        <Link to={publication.link!} className="aspect-video block relative overflow-hidden rounded-[30px]">
            <img src={publication.photo!} alt={publication.title[abbr]} className="image-cover" />
        </Link>

        <div className="py-4 space-y-2">
            <div className="flex items-end space-x-2">
                <div><ChatBubbleLeftEllipsisIcon className='w-8 text-primary' /></div>
                <Link to={publication.link!} className="text-3xl font-semibold">{publication.title[abbr]}</Link>
            </div>
            <div>{publication.description[abbr]}</div>
        </div>
    </div>)

    return <>
        <Head link='/blog' title={`${menu.blog} | ${app_name}`} description={cms.description} />
        <main>
            <PageTitle title={cms.title} subtitle={cms.subtitle} />

            <div className="container">
                <SectionBlock id="publications">
                    <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
                        <div className='space-y-6 lg:space-y-16 lg:col-span-3'>
                            {publicationsContent}
                        </div>

                        <BlogSideDrawer publications={publications.filter(publication => !publications.filter((p, i) => i < 10).map(p => p.id).includes(publication.id))} />
                    </div>
                </SectionBlock>
            </div>
        </main>
    </>
}

export default BlogPage
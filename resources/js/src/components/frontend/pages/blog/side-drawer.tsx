import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

import { useContentContext } from "../../../../app/contexts/content";
import { useLanguageContext } from "../../../../app/contexts/language";
import PublicationType from "../../../../app/types/models/publication";

import Input from "../../ui/form/input";

type Props = {
    publications: PublicationType[]
}

export default function BlogSideDrawer({ publications }: Props) {
    const { content } = useContentContext()
    const { cms: { frontend: { pages: { publications: cms } } } } = content!

    const { language } = useLanguageContext()
    const abbr = language?.abbr!

    const publicationsContent = publications.map(publication => <div key={`publication-${publication.id}`}>
        <div className="flex items-center space-x-4">
            <Link to={publication.link!} className="flex-none block aspect-square w-20 relative overflow-hidden rounded-xl">
                <img src={publication.photo!} alt={publication.title[abbr]} className="image-cover absolute inset-0" />
            </Link>

            <div className="space-y-2">
                <Link to={publication.link!} className="font-semibold text-sm">{publication.title[abbr]}</Link>
                <div className="text-xs line-clamp-2">{publication.description[abbr]}</div>
            </div>
        </div>
    </div>)

    return <div className='space-y-6'>
        <div>
            <Input inputSize='sm' type="search" name='search' icon={MagnifyingGlassIcon} placeholder={cms.search} />
        </div>

        <div>
            <div className='mb-2 font-medium'>{cms.recent}</div>
            <div className="space-y-2">{publicationsContent}</div>
        </div>
    </div>
}
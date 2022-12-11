import { ChevronDoubleRightIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

import { useContentContext } from "../../../../app/contexts/content";
import { useLanguageContext } from "../../../../app/contexts/language";
import { classNames } from "../../../../app/helpers/utils";
import ServiceType from "../../../../app/types/models/service";

export default function ServiceBlock({ title, link, photo, white }: ServiceType & { white?: boolean }) {
    const { content } = useContentContext()
    const { cms: { frontend: { components: { service_block } } } } = content!

    const { language } = useLanguageContext()
    const abbr = language?.abbr!

    return <Link to={link} className={classNames("pb-5 block group w-full md:w-auto", white ? 'text-white' : '')}>
        <div className="aspect-video relative overflow-hidden rounded-[30px] w-full">
            {photo && <img src={photo} alt={title[abbr]} className="group-hover:scale-110 transition-all duration-200" />}
        </div>

        <div className="font-semibold text-xl truncate mt-3" title={title[abbr]}>{title[abbr]}</div>

        <div className='inline-flex items-center text-sm group'><span>{service_block.read_more}</span><ChevronDoubleRightIcon className="w-3 ml-1 group-hover:ml-2 group-hover:w-4 transition-all duration-200 text-yellow" /></div>
    </Link>
}
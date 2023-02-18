import { Link } from "react-router-dom";

import { useLanguageContext } from "../../../../app/contexts/language";
import PublicationType from "../../../../app/types/models/publication";

export default function PublicationBlock({ photo, title, description, link }: PublicationType) {
    const {language} = useLanguageContext()
    const abbr = language?.abbr!

    return <div className="rounded-[30px] overflow-hidden shadow">
        <Link to={link!} className="block aspect-[4/3] w-full relative bg-primary/10">
            <img src={photo!} alt={title[abbr]} className="w-full h-full object-contain" />
        </Link>

        <div className="bg-white pt-4 pb-5 px-6">
            <Link to={link!} className="font-semibold text-lg">{title[abbr]}</Link>
            <div className="text-sm truncate" title={description[abbr]}>{description[abbr]}</div>
        </div>
    </div>
}
import { Link } from "react-router-dom";
import { useLanguageContext } from "../../../../app/contexts/language";

import { classNames } from "../../../../app/helpers/utils";
import ProductType from "../../../../app/types/models/product";

export default function ProductBlock({ name, price, link, photo, white }: ProductType & { white?: boolean }) {
    const { language } = useLanguageContext()
    const abbr = language?.abbr!

    return <Link to={link} className={classNames("block rounded-[30px] bg-white overflow-hidden shadow-lg relative z-0 p-3 pb-5", white ? '' : 'before:bg-primary/[0.05] before:absolute before:inset-0 before:-z-10')}>
        <div className="mt-8 mb-3">
            <img src={photo!} alt={name[abbr]} className="object-contain w-full h-28" />
        </div>

        <div className="text-sm line-clamp-2 mb-1.5 text-center font-medium">{name[abbr]}</div>
    </Link>
}
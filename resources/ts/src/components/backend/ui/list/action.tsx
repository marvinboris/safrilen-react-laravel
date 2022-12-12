import { EyeIcon, LinkIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

import { useAppSelector } from "../../../../app/hooks";
import ApiAccountUserType from "../../../../app/types/api/account/user";

import { selectAuth } from "../../../../features/auth/authSlice";

import Delete from "./delete";

type ActionProps = {
    item: { id?: string, link?: string } & any
    props: { delete: (id: number) => void }
    resource: string
}

export default function Action({ item, resource, props }: ActionProps) {
    const { role, data } = useAppSelector(selectAuth)

    if (props) {
        resource = resource.split('_').join('-');

        let additionalContent;
        if (role === 'user') {
            const feature = (data as ApiAccountUserType).role.features.find(f => f.prefix === resource);

            additionalContent = <>
                {(feature && feature.permissions.includes('u')) && <Link to={`/${role}/${resource}/${item.id}/edit`} className="mx-1">
                    <PencilIcon className="text-sky w-5" />
                </Link>}
                {(feature && feature.permissions.includes('d')) && <span className="mx-1"><Delete deleteAction={() => props.delete(item.id!)}><TrashIcon className="w-5 text-red cursor-pointer" /></Delete></span>}
            </>;
        }
        else if (role === 'admin') additionalContent = <>
            <Link to={`/${role}/${resource}/${item.id}/edit`} className="mx-1">
                <PencilIcon className="text-sky w-5" />
            </Link>
            <span className="mx-1"><Delete deleteAction={() => props.delete(item.id!)}><TrashIcon className="w-5 text-red cursor-pointer" /></Delete></span>
        </>;

        return <div className="text-center flex items-center">
            {item.link && <a href={item.link} target="_blank" rel="noreferrer" className='mx-1'>
                <LinkIcon className="w-5 text-blue" />
            </a>}

            <Link to={`/${role}/${resource}/${item.id}`} className="mx-1">
                <EyeIcon className="text-green w-5" />
            </Link>

            {additionalContent}
        </div>
    }
    return null;
}
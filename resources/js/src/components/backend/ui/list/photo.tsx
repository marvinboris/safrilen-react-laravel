import { EyeIcon } from "@heroicons/react/24/outline";

import View from "../../../ui/view";

type PhotoProps = {
    photo?: string
    see: string
    title: string
}

export default function Photo({ photo, see, title }: PhotoProps) {
    return photo ? <div className="flex items-center space-x-2">
        <span>{see}</span>

        <span className="ml-auto">
            <View action={<EyeIcon className="w-5 text-green cursor-pointer" />}>
                <img src={photo} className="w-full" alt={title} />
            </View>
        </span>
    </div> : null;
}
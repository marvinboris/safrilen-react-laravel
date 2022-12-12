import { Dialog, Transition } from '@headlessui/react'
import { EyeIcon } from '@heroicons/react/20/solid'
import { Fragment, useState } from 'react'

import ImageType from '../../../../app/types/models/image'

export default function ImageBlock({ photo }: ImageType) {
    let [isOpen, setIsOpen] = useState<boolean>(false)

    return <div>
        <div onClick={() => setIsOpen(true)} className="cursor-pointer">
            <div className="aspect-square rounded-2xl overflow-hidden relative group">
                {photo && <img src={photo} alt="Image de galerie" className="image-cover group-hover:scale-[1.3] transition-all duration-700 cursor-pointer" />}
                <div className='absolute opacity-0 inset-0 flex items-center justify-center bg-black/60 group-hover:opacity-100 transition-all duration-200'>
                    <EyeIcon className='text-white w-0 group-hover:w-10 transition-all duration-200' />
                </div>
            </div>
        </div>

        <Transition show={isOpen} as={Fragment}>
            <Dialog onClose={() => setIsOpen(false)} className="fixed inset-0 z-50 flex items-center">
                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-black/20 dark:bg-secondary-200/20" />
                </Transition.Child>

                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                    <Dialog.Panel className="container relative max-h-full">
                        {photo && <img src={photo} alt="Image de galerie" className='object-contain' />}
                    </Dialog.Panel>
                </Transition.Child>
            </Dialog>
        </Transition>
    </div>
}
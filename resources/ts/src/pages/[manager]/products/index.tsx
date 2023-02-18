import { ShoppingBagIcon } from '@heroicons/react/24/outline'

import { useContentContext } from '../../../app/contexts/content'
import { useLanguageContext } from '../../../app/contexts/language'
import { convertDate, htmlEntities, updateObject } from '../../../app/helpers/utils'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import ProductType from '../../../app/types/models/product'

import Photo from '../../../components/backend/ui/list/photo'
import Action from '../../../components/backend/ui/list/action'
import ManageRead from '../../../components/backend/ui/page/read'

import { selectAuth } from '../../../features/auth/authSlice'
import { selectBackend, _delete } from '../../../features/backend/backendSlice'

const ManageProductsPage = () => {
    const dispatch = useAppDispatch()

    const { role } = useAppSelector(selectAuth)
    const { data: backend } = useAppSelector(selectBackend)

    const { content } = useContentContext()
    const { cms: { backend: { components: { list: { action, see } }, pages: { products: { form } } } } } = content!

    const { language } = useLanguageContext()
    const abbr = language?.abbr!

    const resource = 'products'
    const props = { delete: (id: number) => dispatch(_delete({ role: role!, resource, id })) }

    const data = (backend && backend.products ? (backend.products as ProductType[]) : []).map(product => {
        return updateObject(product, {
            created_at: convertDate(product.created_at),
            name: product.name[abbr],
            description: htmlEntities(product.description[abbr]),
            photo: <Photo photo={product.photo} see={see} title={`${form.product_photo}: ${product.name}`} />,
            action: <Action props={props} resource='products' item={product} />,
        });
    });

    const fields = [
        { name: form.name, key: 'name' },
        { name: form.price, key: 'price' },
        { name: form.description, key: 'description' },
        { name: form.photo, key: 'photo' },
        { name: action, key: 'action', fixed: true }
    ]

    return <ManageRead data={data} fields={fields} icon={ShoppingBagIcon} resource={resource} />
}

export default ManageProductsPage
import axios from 'axios'
import { useEffect, useState } from 'react'

import { useContentContext } from '../../app/contexts/content'
import ProductType from '../../app/types/models/product'

import { Head } from '../../components/frontend/navigation/layout'
import SectionBlock from '../../components/frontend/ui/blocks/section'
import ProductBlock from '../../components/frontend/ui/blocks/product'
import PageTitle from '../../components/frontend/ui/title/page'
import SectionTitle from '../../components/frontend/ui/title/section'

type ProductsType = ProductType[]

const ProductsPage = () => {
    const { content } = useContentContext()
    const { cms: { global: { app_name }, frontend: { header: { menu }, pages: { products: cms } } } } = content!

    const [products, setProducts] = useState<ProductsType>([])

    useEffect(() => {
        axios.get<ProductsType>(`/api/products`).then(res => setProducts(res.data))
    }, [])

    const productsContent = products.map(product => <ProductBlock key={`product-${product.id}`} {...product} />)

    return <>
        <Head link='/products' title={`${menu.products} | ${app_name}`} description={cms.description} />
        <main>
            <PageTitle title={cms.title} />

            <SectionBlock id="products">
                <div className="container">
                    <SectionTitle centered title={cms.products.title} />

                    <div className="grid gap-4 md:gap-6 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                        {productsContent}
                    </div>
                </div>
            </SectionBlock>
        </main>
    </>
}

export default ProductsPage
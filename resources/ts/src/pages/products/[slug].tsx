import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useContentContext } from '../../app/contexts/content'
import { useLanguageContext } from '../../app/contexts/language'
import ProductType from '../../app/types/models/product'

import { Head } from '../../components/frontend/navigation/layout'
import SectionBlock from '../../components/frontend/ui/blocks/section'
import ProductBlock from '../../components/frontend/ui/blocks/product'
import PageTitle from '../../components/frontend/ui/title/page'
import SectionTitle from '../../components/frontend/ui/title/section'

const ProductPage = () => {
    const { slug } = useParams()

    const { content } = useContentContext()
    const { cms: { global: { app_name }, frontend: { header: { menu }, pages: { products: cms } } } } = content!

    const { language } = useLanguageContext()
    const abbr = language?.abbr!

    const [products, setProducts] = useState<ProductType[]>([])

    useEffect(() => {
        axios.get<ProductType[]>(`/api/products`).then(res => setProducts(res.data))
    }, [])

    const product = products.find(product => product.slug === slug)
    const productsContent = products.filter(_product => product && (_product.id !== product.id)).map(product => <ProductBlock key={`product-${product.id}`} {...product} />)

    return <>
        <Head link={`/products/${slug}`} title={`${product ? `${product.name[abbr]} - ` : ''}${menu.products} | ${app_name}`} description={product ? product.description[abbr] : cms.description} />
        <main>
            <PageTitle title={cms.title} subtitle={product ? product.name[abbr] : cms.subtitle} />

            {product && <SectionBlock id="product">
                <div className="container">
                    <div>
                        {product.photo && <div className='md:h-96 p-6 rounded-[30px] bg-primary/10 md:float-left md:mr-6 mb-6'>
                            <img src={product.photo} alt={product.name[abbr]} className="object-contain w-full h-full" />
                        </div>}

                        <div>
                            <SectionTitle title={product.name[abbr]} />

                            {/* <div className='my-3'>
                                <span className='text-2xl font-bold'>{product.price}</span>{' '}<span>XAF</span>
                            </div> */}

                            <div className="mt-3 md:min-h-[384px]" dangerouslySetInnerHTML={{ __html: product.description[abbr] }} />
                        </div>
                    </div>
                </div>
            </SectionBlock>}

            <SectionBlock id="products" className="bg-grid-primary/[0.05] relative z-0 after:absolute after:bottom-0 after:inset-0 after:bg-gradient-to-t after:from-white after:to-transparent after:-z-10">
                <div className="container">
                    <SectionTitle centered title={cms.products.title} />

                    <div className="grid gap-6 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                        {productsContent}
                    </div>
                </div>
            </SectionBlock>
        </main>
    </>
}

export default ProductPage
export default interface ProductType {
    id: number
    name: Translatable
    description: Translatable
    price: number
    photo?: string
    slug: string
    link: string
    is_active: 0 | 1
    created_at: Date
    updated_at: Date
}
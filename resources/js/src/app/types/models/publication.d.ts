export default interface PublicationType {
    id: number
    title: Translatable
    description: Translatable
    body: Translatable
    photo?: string
    slug: string
    link: string
    is_active: 0 | 1
    created_at: Date
    updated_at: Date
}
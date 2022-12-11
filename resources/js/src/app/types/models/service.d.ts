export default interface ServiceType {
    id: number
    title: Translatable
    body: Translatable
    photo?: string
    slug: string
    link: string
    is_active: 0 | 1
    created_at: Date
    updated_at: Date
}
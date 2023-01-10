export default interface TestimonialType {
    id: number
    name: string
    title: Translatable
    photo?: string
    link: string
    is_active: 0 | 1
    created_at: Date
    updated_at: Date
}
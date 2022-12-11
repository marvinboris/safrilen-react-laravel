export default interface AdminType {
    id: number
    name: string
    email: string
    password: string
    photo?: string
    phone: string
    language: string
    created_at: Date
    updated_at: Date
}
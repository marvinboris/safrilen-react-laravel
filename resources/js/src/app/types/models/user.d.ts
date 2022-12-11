export default interface UserType {
    id: number
    name: string
    email: string
    password: string
    photo?: string
    phone: string
    role: string
    language: string
    created_at: Date
    updated_at: Date
}
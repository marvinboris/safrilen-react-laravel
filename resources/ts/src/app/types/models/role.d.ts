export default interface RoleType {
    id: number
    name: string
    description: string
    features: { feature: FeatureType, access: ('c' | 'u' | 'd')[] }[]
    created_at: Date
    updated_at: Date
}
import UserType from "../../models/user"

type ApiAccountUserType = UserType & { role: { features: { id: number, prefix: string, access: string[] }[] } }

export default ApiAccountUserType
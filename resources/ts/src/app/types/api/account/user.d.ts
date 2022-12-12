import FeatureType from "../../models/feature"
import UserType from "../../models/user"

type ApiAccountUserType = UserType & { role: { features: (FeatureType & { permissions: string[] })[] } }

export default ApiAccountUserType
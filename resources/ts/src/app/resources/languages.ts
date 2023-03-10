import axios from 'axios'

import LanguageType from "../types/language"

export const getLanguages = async () => {
    const res = await axios.get<LanguageType[]>('/api/languages')
    return res.data
} 
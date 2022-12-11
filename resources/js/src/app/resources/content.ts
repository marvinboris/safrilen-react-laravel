import axios from 'axios'

import ContentType from '../types/content'

export const getContent = async (language: string) => {
    const res = await axios.get<ContentType>(`/api/content/${language}`)
    return res.data
} 
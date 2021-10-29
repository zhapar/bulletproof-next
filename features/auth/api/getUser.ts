import { axios } from '@/lib/axios'

import { AuthUser } from '../types'

export const getUser = () => {
  return axios.get('/auth/me')
}

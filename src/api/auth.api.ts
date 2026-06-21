import api from '../lib/axios'

export interface UserProfile {
  id: string
  user_id: string
  role: 'owner' | 'manager' | 'guard' | 'customer'
  store_id: string | null
  name: string
  email: string
  phone?: string
  avatar_url?: string
}

export const authApi = {
  getMe: () => api.get<{ success: boolean; data: UserProfile }>('/auth/me'),
}

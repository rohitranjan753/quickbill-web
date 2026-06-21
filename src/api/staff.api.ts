import api from '../lib/axios'

export interface Guard {
  id: string
  user_id: string
  store_id: string
  role: string
  name: string
  phone?: string
  is_active: boolean
  invited_at: string
  joined_at?: string
  current_shift?: {
    id: string
    shift_start: string
    total_scans: number
  } | null
}

export interface GuardsListResponse {
  items: Guard[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export const staffApi = {
  list: (storeId: string, params: Record<string, unknown> = {}) =>
    api.get<{ success: boolean; data: GuardsListResponse }>(`/stores/${storeId}/staff`, { params }),

  add: (storeId: string, email: string) =>
    api.post<{ success: boolean; data: Guard }>(`/stores/${storeId}/staff`, { email }),

  remove: (storeId: string, staffId: string) =>
    api.delete<{ success: boolean }>(`/stores/${storeId}/staff/${staffId}`),
}

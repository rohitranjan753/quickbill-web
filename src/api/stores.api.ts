import api from '../lib/axios'

export interface Store {
  id: string
  name: string
  address: string
  city: string
  state: string
  pincode: string
  phone?: string
  email?: string
  gstin?: string
  logo_url?: string
  is_active: boolean
  created_at: string
}

export interface CreateStoreDto {
  name: string
  address: string
  city: string
  state: string
  pincode: string
  phone?: string
  email?: string
  gstin?: string
}

export const storesApi = {
  create: (data: CreateStoreDto) =>
    api.post<{ success: boolean; data: Store }>('/stores', data),

  getById: (id: string) =>
    api.get<{ success: boolean; data: Store }>(`/stores/${id}`),

  update: (id: string, data: Partial<CreateStoreDto>) =>
    api.patch<{ success: boolean; data: Store }>(`/stores/${id}`, data),
}

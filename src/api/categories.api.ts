import api from '../lib/axios'

export interface Category {
  id: string
  store_id: string
  name: string
  display_order: number
  is_active: boolean
}

export interface CategoriesListResponse {
  items: Category[]
  total: number
  page: number
  limit: number
}

export const categoriesApi = {
  list: (storeId: string) =>
    api.get<{ success: boolean; data: CategoriesListResponse }>(`/stores/${storeId}/categories`),

  create: (storeId: string, data: { name: string }) =>
    api.post<{ success: boolean; data: Category }>(`/stores/${storeId}/categories`, data),
}

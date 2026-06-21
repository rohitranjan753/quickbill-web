import api from '../lib/axios'

export interface InventoryItem {
  id: string
  product_id: string
  store_id: string
  quantity: number
  reserved_quantity: number
  low_stock_threshold: number
  last_restocked_at?: string
  product: {
    id: string
    name: string
    barcode: string
    unit: string
  }
}

export interface InventoryListResponse {
  items: InventoryItem[]
  total: number
  page: number
  limit: number
}

export const inventoryApi = {
  list: (storeId: string, params: Record<string, unknown> = {}) =>
    api.get<{ success: boolean; data: InventoryListResponse }>(`/stores/${storeId}/inventory`, { params }),

  update: (storeId: string, productId: string, data: { quantity: number; notes?: string }) =>
    api.patch<{ success: boolean; data: InventoryItem }>(`/stores/${storeId}/inventory/${productId}`, data),

  restock: (storeId: string, productId: string, data: { quantity: number; notes?: string }) =>
    api.post<{ success: boolean; data: InventoryItem }>(`/stores/${storeId}/inventory/${productId}/restock`, data),
}

import api from '../lib/axios'

export interface Product {
  id: string
  store_id: string
  category_id?: string
  barcode: string
  sku?: string
  name: string
  description?: string
  price: number
  mrp?: number
  tax_rate: number
  hsn_code?: string
  image_url?: string
  unit: string
  is_active: boolean
  created_at: string
  category?: { id: string; name: string }
}

export interface CreateProductDto {
  barcode: string
  name: string
  price: number
  mrp?: number
  sku?: string
  description?: string
  category_id?: string
  unit?: string
  tax_rate?: number
  hsn_code?: string
}

export interface BulkUploadResult {
  success_count: number
  error_count: number
  error_details?: Array<{ row: number; barcode?: string; errors: string[] }>
}

export interface ProductsListResponse {
  items: Product[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export const productsApi = {
  list: (storeId: string, params: Record<string, unknown> = {}) =>
    api.get<{ success: boolean; data: ProductsListResponse }>(`/stores/${storeId}/products`, { params }),

  create: (storeId: string, data: CreateProductDto) =>
    api.post<{ success: boolean; data: Product }>(`/stores/${storeId}/products`, data),

  update: (storeId: string, id: string, data: Partial<CreateProductDto>) =>
    api.patch<{ success: boolean; data: Product }>(`/stores/${storeId}/products/${id}`, data),

  delete: (storeId: string, id: string) =>
    api.delete<{ success: boolean }>(`/stores/${storeId}/products/${id}`),

  bulkUpload: (storeId: string, csvData: string) =>
    api.post<{ success: boolean; data: BulkUploadResult }>(`/stores/${storeId}/products/bulk`, { csv_data: csvData }),
}

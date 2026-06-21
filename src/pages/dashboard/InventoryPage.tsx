import { useState, useEffect, useCallback } from 'react'
import { Plus, Upload, Search, Pencil, Trash2, Package } from 'lucide-react'
import { useStore } from '../../context/StoreContext'
import { productsApi, type Product } from '../../api/products.api'
import { categoriesApi, type Category } from '../../api/categories.api'
import { Badge } from '../../components/ui/Badge'
import { EmptyState } from '../../components/ui/EmptyState'
import { Spinner } from '../../components/ui/Spinner'
import { AddProductModal } from '../../components/dashboard/AddProductModal'
import { EditProductModal } from '../../components/dashboard/EditProductModal'
import { CSVUploadModal } from '../../components/dashboard/CSVUploadModal'
import toast from 'react-hot-toast'

export function InventoryPage() {
  const { storeId } = useStore()
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [loading, setLoading] = useState(true)
  const [addOpen, setAddOpen] = useState(false)
  const [editProduct, setEditProduct] = useState<Product | null>(null)
  const [csvOpen, setCsvOpen] = useState(false)

  const LIMIT = 20

  const fetchProducts = useCallback(async () => {
    if (!storeId) return
    setLoading(true)
    try {
      const res = await productsApi.list(storeId, {
        page, limit: LIMIT,
        ...(search && { search }),
        ...(categoryFilter && { category_id: categoryFilter }),
      })
      setProducts(res.data.data.items)
      setTotal(res.data.data.total)
    } catch {
      toast.error('Failed to load products')
    } finally {
      setLoading(false)
    }
  }, [storeId, page, search, categoryFilter])

  useEffect(() => { fetchProducts() }, [fetchProducts])

  useEffect(() => {
    if (!storeId) return
    categoriesApi.list(storeId).then((res) => setCategories(res.data.data.items ?? []))
  }, [storeId])

  const handleDelete = async (product: Product) => {
    if (!confirm(`Delete "${product.name}"? This action cannot be undone.`)) return
    try {
      await productsApi.delete(storeId!, product.id)
      toast.success('Product deleted')
      fetchProducts()
    } catch {
      toast.error('Failed to delete product')
    }
  }

  const totalPages = Math.ceil(total / LIMIT)

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-on-surface">Products</h2>
          <p className="text-sm text-on-surface-variant">{total} products in catalog</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setCsvOpen(true)} className="btn-secondary text-sm py-2">
            <Upload size={14} />
            Bulk Upload
          </button>
          <button onClick={() => setAddOpen(true)} className="btn-primary text-sm py-2">
            <Plus size={14} />
            Add Product
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
          <input
            className="input-field pl-9"
            placeholder="Search by name or barcode..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
          />
        </div>
        <select
          className="input-field w-auto min-w-[150px]"
          value={categoryFilter}
          onChange={(e) => { setCategoryFilter(e.target.value); setPage(1) }}
        >
          <option value="">All Categories</option>
          {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Spinner size="lg" />
          </div>
        ) : products.length === 0 ? (
          <EmptyState
            icon={Package}
            title="No products yet"
            description="Add your first product or upload a CSV to get started"
            action={
              <button onClick={() => setAddOpen(true)} className="btn-primary text-sm">
                <Plus size={14} /> Add Product
              </button>
            }
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-outline-variant bg-surface-low">
                  {['Name', 'Barcode', 'Category', 'Price', 'MRP', 'Unit', 'Status', ''].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-on-surface-variant uppercase tracking-wide">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-outline-variant last:border-0 hover:bg-surface-low transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-medium text-on-surface text-sm">{product.name}</div>
                      {product.sku && <div className="text-xs text-outline font-mono mt-0.5">{product.sku}</div>}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-on-surface-variant">{product.barcode}</td>
                    <td className="px-4 py-3 text-sm text-on-surface-variant">{product.category?.name ?? '—'}</td>
                    <td className="px-4 py-3 text-sm font-numbers font-semibold text-on-surface">₹{product.price.toFixed(2)}</td>
                    <td className="px-4 py-3 text-sm font-numbers text-on-surface-variant">{product.mrp ? `₹${product.mrp.toFixed(2)}` : '—'}</td>
                    <td className="px-4 py-3 text-xs text-on-surface-variant">{product.unit}</td>
                    <td className="px-4 py-3">
                      <Badge variant={product.is_active ? 'success' : 'neutral'}>
                        {product.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setEditProduct(product)}
                          className="p-1.5 rounded-card hover:bg-surface-medium text-outline hover:text-primary transition-colors"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(product)}
                          className="p-1.5 rounded-card hover:bg-error/10 text-outline hover:text-error transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-on-surface-variant">
            Page {page} of {totalPages} · {total} products
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="btn-secondary text-sm py-1.5 px-3 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="btn-secondary text-sm py-1.5 px-3 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      <AddProductModal isOpen={addOpen} onClose={() => setAddOpen(false)} storeId={storeId!} categories={categories} onSuccess={fetchProducts} />
      <EditProductModal isOpen={!!editProduct} onClose={() => setEditProduct(null)} storeId={storeId!} product={editProduct} categories={categories} onSuccess={fetchProducts} />
      <CSVUploadModal isOpen={csvOpen} onClose={() => setCsvOpen(false)} storeId={storeId!} onSuccess={fetchProducts} />
    </div>
  )
}

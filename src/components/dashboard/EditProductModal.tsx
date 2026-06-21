import { useState, type FormEvent, useEffect } from 'react'
import { Modal } from '../ui/Modal'
import { productsApi, type Product, type CreateProductDto } from '../../api/products.api'
import type { Category } from '../../api/categories.api'
import toast from 'react-hot-toast'

interface EditProductModalProps {
  isOpen: boolean
  onClose: () => void
  storeId: string
  product: Product | null
  categories: Category[]
  onSuccess: () => void
}

const UNITS = ['piece', 'kg', 'g', 'litre', 'ml', 'pack']

export function EditProductModal({ isOpen, onClose, storeId, product, categories, onSuccess }: EditProductModalProps) {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState<Partial<CreateProductDto>>({})

  useEffect(() => {
    if (product) {
      setForm({
        barcode: product.barcode,
        name: product.name,
        price: product.price,
        mrp: product.mrp,
        sku: product.sku,
        description: product.description,
        category_id: product.category_id,
        unit: product.unit,
        tax_rate: product.tax_rate,
      })
    }
  }, [product])

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!product) return
    setLoading(true)
    try {
      await productsApi.update(storeId, product.id, {
        ...form,
        price: Number(form.price),
        mrp: form.mrp ? Number(form.mrp) : undefined,
        tax_rate: Number(form.tax_rate) || 0,
      })
      toast.success('Product updated!')
      onSuccess()
      onClose()
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message ?? 'Failed to update product'
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Product" size="lg">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-on-surface-variant mb-1.5 uppercase tracking-wide">Barcode *</label>
            <input className="input-field" value={form.barcode ?? ''} onChange={update('barcode')} required />
          </div>
          <div>
            <label className="block text-xs font-semibold text-on-surface-variant mb-1.5 uppercase tracking-wide">SKU</label>
            <input className="input-field" value={form.sku ?? ''} onChange={update('sku')} />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-on-surface-variant mb-1.5 uppercase tracking-wide">Product Name *</label>
          <input className="input-field" value={form.name ?? ''} onChange={update('name')} required />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-on-surface-variant mb-1.5 uppercase tracking-wide">Price (₹) *</label>
            <input className="input-field" type="number" min="0" step="0.01" value={form.price ?? ''} onChange={update('price')} required />
          </div>
          <div>
            <label className="block text-xs font-semibold text-on-surface-variant mb-1.5 uppercase tracking-wide">MRP (₹)</label>
            <input className="input-field" type="number" min="0" step="0.01" value={form.mrp ?? ''} onChange={update('mrp')} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-on-surface-variant mb-1.5 uppercase tracking-wide">Tax %</label>
            <input className="input-field" type="number" min="0" max="100" value={form.tax_rate ?? ''} onChange={update('tax_rate')} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-on-surface-variant mb-1.5 uppercase tracking-wide">Category</label>
            <select className="input-field" value={form.category_id ?? ''} onChange={update('category_id')}>
              <option value="">Select category</option>
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-on-surface-variant mb-1.5 uppercase tracking-wide">Unit</label>
            <select className="input-field" value={form.unit ?? 'piece'} onChange={update('unit')}>
              {UNITS.map((u) => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
        </div>
        <div className="flex gap-3 pt-2">
          <button type="button" onClick={onClose} className="flex-1 btn-secondary justify-center">Cancel</button>
          <button type="submit" disabled={loading} className="flex-1 btn-primary justify-center disabled:opacity-60">
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </Modal>
  )
}

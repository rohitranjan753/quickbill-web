import { useState, type FormEvent } from 'react'
import { Modal } from '../ui/Modal'
import { productsApi, type CreateProductDto } from '../../api/products.api'
import type { Category } from '../../api/categories.api'
import toast from 'react-hot-toast'

interface AddProductModalProps {
  isOpen: boolean
  onClose: () => void
  storeId: string
  categories: Category[]
  onSuccess: () => void
}

const UNITS = ['piece', 'kg', 'g', 'litre', 'ml', 'pack']

export function AddProductModal({ isOpen, onClose, storeId, categories, onSuccess }: AddProductModalProps) {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState<CreateProductDto & { initial_stock?: string }>({
    barcode: '', name: '', price: 0, mrp: undefined, sku: '', description: '',
    category_id: '', unit: 'piece', tax_rate: 0, initial_stock: '',
  })

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const payload: CreateProductDto = {
        barcode: form.barcode,
        name: form.name,
        price: Number(form.price),
        mrp: form.mrp ? Number(form.mrp) : undefined,
        sku: form.sku || undefined,
        description: form.description || undefined,
        category_id: form.category_id || undefined,
        unit: form.unit,
        tax_rate: Number(form.tax_rate) || 0,
      }
      await productsApi.create(storeId, payload)
      toast.success('Product added!')
      onSuccess()
      onClose()
      setForm({ barcode: '', name: '', price: 0, mrp: undefined, sku: '', description: '', category_id: '', unit: 'piece', tax_rate: 0 })
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message ?? 'Failed to add product'
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Product" size="lg">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-on-surface-variant mb-1.5 uppercase tracking-wide">Barcode *</label>
            <input className="input-field" placeholder="8901234567890" value={form.barcode} onChange={update('barcode')} required />
          </div>
          <div>
            <label className="block text-xs font-semibold text-on-surface-variant mb-1.5 uppercase tracking-wide">SKU</label>
            <input className="input-field" placeholder="SKU-001" value={form.sku ?? ''} onChange={update('sku')} />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-on-surface-variant mb-1.5 uppercase tracking-wide">Product Name *</label>
          <input className="input-field" placeholder="Aashirvaad Atta 5kg" value={form.name} onChange={update('name')} required />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-on-surface-variant mb-1.5 uppercase tracking-wide">Price (₹) *</label>
            <input className="input-field" type="number" min="0" step="0.01" placeholder="99.00" value={form.price || ''} onChange={update('price')} required />
          </div>
          <div>
            <label className="block text-xs font-semibold text-on-surface-variant mb-1.5 uppercase tracking-wide">MRP (₹)</label>
            <input className="input-field" type="number" min="0" step="0.01" placeholder="120.00" value={form.mrp ?? ''} onChange={update('mrp')} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-on-surface-variant mb-1.5 uppercase tracking-wide">Tax %</label>
            <input className="input-field" type="number" min="0" max="100" step="0.1" placeholder="5" value={form.tax_rate || ''} onChange={update('tax_rate')} />
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
            {loading ? <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" /> : null}
            {loading ? 'Adding...' : 'Add Product'}
          </button>
        </div>
      </form>
    </Modal>
  )
}

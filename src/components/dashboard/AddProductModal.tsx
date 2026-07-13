import { useState, useRef, type FormEvent } from 'react'
import { ImagePlus, X } from 'lucide-react'
import { Modal } from '../ui/Modal'
import { productsApi, type CreateProductDto } from '../../api/products.api'
import type { Category } from '../../api/categories.api'
import { supabase } from '../../lib/supabase'
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
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [form, setForm] = useState<CreateProductDto & { initial_stock?: string }>({
    barcode: '', name: '', price: 0, mrp: undefined, sku: '', description: '',
    category_id: '', unit: 'piece', tax_rate: 0, initial_stock: '',
  })

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file')
      return
    }
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const removeImage = () => {
    setImageFile(null)
    setImagePreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const uploadImage = async (file: File): Promise<string | undefined> => {
    const ext = file.name.split('.').pop() ?? 'jpg'
    const path = `${storeId}/${Date.now()}.${ext}`
    const { data, error } = await supabase.storage.from('product-images').upload(path, file)
    if (error) {
      toast.error('Image upload failed — product saved without image')
      return undefined
    }
    const { data: urlData } = supabase.storage.from('product-images').getPublicUrl(data.path)
    return urlData.publicUrl
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      let image_url: string | undefined
      if (imageFile) {
        image_url = await uploadImage(imageFile)
      }

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
        image_url,
      }
      await productsApi.create(storeId, payload)
      toast.success('Product added!')
      onSuccess()
      onClose()
      setForm({ barcode: '', name: '', price: 0, mrp: undefined, sku: '', description: '', category_id: '', unit: 'piece', tax_rate: 0 })
      setImageFile(null)
      setImagePreview(null)
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
        {/* Image upload */}
        <div>
          <label className="block text-xs font-semibold text-on-surface-variant mb-1.5 uppercase tracking-wide">Product Image</label>
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
          {imagePreview ? (
            <div className="relative w-full h-36 rounded-xl overflow-hidden border border-outline-variant">
              <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 w-7 h-7 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors"
              >
                <X size={14} className="text-white" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-24 rounded-xl border-2 border-dashed border-outline-variant hover:border-primary hover:bg-primary/5 flex flex-col items-center justify-center gap-2 transition-colors text-on-surface-variant hover:text-primary"
            >
              <ImagePlus size={22} />
              <span className="text-xs font-medium">Click to upload image</span>
            </button>
          )}
        </div>

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

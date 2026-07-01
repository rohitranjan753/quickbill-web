import { useState, type FormEvent } from 'react'
import { Store } from 'lucide-react'
import { storesApi, type CreateStoreDto } from '../../api/stores.api'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'

type FieldErrors = Partial<Record<keyof CreateStoreDto, string>>

export function CreateStoreForm() {
  const { refreshProfile } = useAuth()
  const [loading, setLoading] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [form, setForm] = useState<CreateStoreDto>({
    name: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    email: '',
    gstin: '',
  })

  const update = (field: keyof CreateStoreDto) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
    if (fieldErrors[field]) setFieldErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setFieldErrors({})
    try {
      await storesApi.create(form)
      await refreshProfile()
      toast.success('Store created! Welcome to QuickBill.')
    } catch (err: unknown) {
      const data = (err as { response?: { data?: { error?: string; message?: string; errors?: { field: string; message: string }[] } } })?.response?.data
      if (data?.error === 'VALIDATION_ERROR' && data.errors?.length) {
        const mapped: FieldErrors = {}
        for (const e of data.errors) mapped[e.field as keyof CreateStoreDto] = e.message
        setFieldErrors(mapped)
        toast.error('Please fix the highlighted fields.')
      } else {
        toast.error(data?.message ?? 'Failed to create store')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-full flex items-center justify-center py-8">
      <div className="w-full max-w-xl">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-velocity-gradient flex items-center justify-center mx-auto mb-4">
            <Store size={24} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-on-surface">Set up your store</h2>
          <p className="text-on-surface-variant text-sm mt-1">Tell us about your store to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="card p-6 flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold text-on-surface-variant mb-1.5 uppercase tracking-wide">
              Store Name *
            </label>
            <input className={`input-field ${fieldErrors.name ? 'border-red-500 ring-2 ring-red-500/20 focus:border-red-500 focus:ring-red-500/20' : ''}`} placeholder="Daily Fresh Mart" value={form.name} onChange={update('name')} required />
            {fieldErrors.name && <p className="text-xs text-red-600 mt-1">{fieldErrors.name}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface-variant mb-1.5 uppercase tracking-wide">
              Address *
            </label>
            <input className={`input-field ${fieldErrors.address ? 'border-red-500 ring-2 ring-red-500/20 focus:border-red-500 focus:ring-red-500/20' : ''}`} placeholder="123, Main Road" value={form.address} onChange={update('address')} required />
            {fieldErrors.address && <p className="text-xs text-red-600 mt-1">{fieldErrors.address}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-on-surface-variant mb-1.5 uppercase tracking-wide">City *</label>
              <input className={`input-field ${fieldErrors.city ? 'border-red-500 ring-2 ring-red-500/20 focus:border-red-500 focus:ring-red-500/20' : ''}`} placeholder="Bengaluru" value={form.city} onChange={update('city')} required />
              {fieldErrors.city && <p className="text-xs text-red-600 mt-1">{fieldErrors.city}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-on-surface-variant mb-1.5 uppercase tracking-wide">State *</label>
              <input className={`input-field ${fieldErrors.state ? 'border-red-500 ring-2 ring-red-500/20 focus:border-red-500 focus:ring-red-500/20' : ''}`} placeholder="Karnataka" value={form.state} onChange={update('state')} required />
              {fieldErrors.state && <p className="text-xs text-red-600 mt-1">{fieldErrors.state}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-on-surface-variant mb-1.5 uppercase tracking-wide">Pincode *</label>
              <input className={`input-field ${fieldErrors.pincode ? 'border-red-500 ring-2 ring-red-500/20 focus:border-red-500 focus:ring-red-500/20' : ''}`} placeholder="560001" value={form.pincode} onChange={update('pincode')} required />
              {fieldErrors.pincode && <p className="text-xs text-red-600 mt-1">{fieldErrors.pincode}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-on-surface-variant mb-1.5 uppercase tracking-wide">Phone <span className="normal-case font-normal">(10 digits)</span></label>
              <input className={`input-field ${fieldErrors.phone ? 'border-red-500 ring-2 ring-red-500/20 focus:border-red-500 focus:ring-red-500/20' : ''}`} placeholder="9876543210" value={form.phone} onChange={update('phone')} />
              {fieldErrors.phone && <p className="text-xs text-red-600 mt-1">{fieldErrors.phone}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-on-surface-variant mb-1.5 uppercase tracking-wide">Email</label>
              <input className={`input-field ${fieldErrors.email ? 'border-red-500 ring-2 ring-red-500/20 focus:border-red-500 focus:ring-red-500/20' : ''}`} type="email" placeholder="store@example.com" value={form.email} onChange={update('email')} />
              {fieldErrors.email && <p className="text-xs text-red-600 mt-1">{fieldErrors.email}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-on-surface-variant mb-1.5 uppercase tracking-wide">GSTIN <span className="normal-case font-normal">(15 chars)</span></label>
              <input className={`input-field ${fieldErrors.gstin ? 'border-red-500 ring-2 ring-red-500/20 focus:border-red-500 focus:ring-red-500/20' : ''}`} placeholder="22AAAAA0000A1Z5" value={form.gstin} onChange={update('gstin')} />
              {fieldErrors.gstin && <p className="text-xs text-red-600 mt-1">{fieldErrors.gstin}</p>}
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-primary justify-center mt-2 disabled:opacity-60 disabled:cursor-not-allowed">
            {loading ? (
              <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
            ) : null}
            {loading ? 'Creating Store...' : 'Create Store'}
          </button>
        </form>
      </div>
    </div>
  )
}

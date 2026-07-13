import { useState, useEffect, useRef, type FormEvent } from 'react'
import { Store, MapPin, LocateFixed, CheckCircle2, AlertCircle, ImagePlus, X } from 'lucide-react'
import { storesApi, type CreateStoreDto } from '../../api/stores.api'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../lib/supabase'
import toast from 'react-hot-toast'

type FieldErrors = Partial<Record<keyof CreateStoreDto, string>>
type LocationState = 'idle' | 'requesting' | 'granted' | 'denied' | 'unavailable'

interface Coords {
  latitude: number
  longitude: number
}

export function CreateStoreForm() {
  const { refreshProfile } = useAuth()
  const [loading, setLoading] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [locationState, setLocationState] = useState<LocationState>('idle')
  const [coords, setCoords] = useState<Coords | null>(null)
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const logoInputRef = useRef<HTMLInputElement>(null)
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

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationState('unavailable')
    }
  }, [])

  const requestLocation = () => {
    if (!navigator.geolocation) return
    setLocationState('requesting')
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ latitude: pos.coords.latitude, longitude: pos.coords.longitude })
        setLocationState('granted')
        toast.success('Location captured successfully.')
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) setLocationState('denied')
        else setLocationState('idle')
      },
      { timeout: 10000, enableHighAccuracy: true }
    )
  }

  const update = (field: keyof CreateStoreDto) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
    if (fieldErrors[field]) setFieldErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file')
      return
    }
    setLogoFile(file)
    setLogoPreview(URL.createObjectURL(file))
  }

  const removeLogo = () => {
    setLogoFile(null)
    setLogoPreview(null)
    if (logoInputRef.current) logoInputRef.current.value = ''
  }

  const uploadLogo = async (file: File): Promise<string | undefined> => {
    const ext = file.name.split('.').pop() ?? 'jpg'
    const path = `logos/${Date.now()}.${ext}`
    const { data, error } = await supabase.storage.from('store-images').upload(path, file)
    if (error) {
      toast.error('Logo upload failed — store created without logo')
      return undefined
    }
    const { data: urlData } = supabase.storage.from('store-images').getPublicUrl(data.path)
    return urlData.publicUrl
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setFieldErrors({})
    try {
      let logo_url: string | undefined
      if (logoFile) {
        logo_url = await uploadLogo(logoFile)
      }

      const payload: CreateStoreDto = {
        ...form,
        ...(coords ? { latitude: coords.latitude, longitude: coords.longitude } : {}),
        ...(logo_url ? { logo_url } : {}),
      }
      await storesApi.create(payload)
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

        {/* Location permission banner */}
        {locationState !== 'unavailable' && (
          <div className={`mb-4 rounded-xl border px-4 py-3.5 flex items-start gap-3 ${
            locationState === 'granted'
              ? 'bg-green-50 border-green-200'
              : locationState === 'denied'
              ? 'bg-red-50 border-red-200'
              : 'bg-surface-card border-outline-variant'
          }`}>
            <div className={`mt-0.5 flex-shrink-0 ${
              locationState === 'granted' ? 'text-green-600' :
              locationState === 'denied' ? 'text-red-500' : 'text-primary'
            }`}>
              {locationState === 'granted' ? (
                <CheckCircle2 size={17} />
              ) : locationState === 'denied' ? (
                <AlertCircle size={17} />
              ) : (
                <MapPin size={17} />
              )}
            </div>

            <div className="flex-1 min-w-0">
              {locationState === 'granted' && coords ? (
                <>
                  <p className="text-sm font-semibold text-green-800">Location captured</p>
                  <p className="text-xs text-green-700 mt-0.5">
                    {coords.latitude.toFixed(5)}, {coords.longitude.toFixed(5)} — your store will appear in the customer locator.
                  </p>
                </>
              ) : locationState === 'denied' ? (
                <>
                  <p className="text-sm font-semibold text-red-700">Location permission denied</p>
                  <p className="text-xs text-red-600 mt-0.5">
                    Allow location in your browser settings to enable the store locator, or continue without it.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-sm font-semibold text-on-surface">Allow location access</p>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    Used to pin your store on the customer locator map so shoppers nearby can find you.
                  </p>
                </>
              )}
            </div>

            {locationState === 'idle' && (
              <button
                type="button"
                onClick={requestLocation}
                className="flex-shrink-0 flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/10 hover:bg-primary/20 px-3 py-1.5 rounded-card transition-colors"
              >
                <LocateFixed size={13} />
                Allow
              </button>
            )}

            {locationState === 'requesting' && (
              <div className="flex-shrink-0 w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin mt-0.5" />
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="card p-6 flex flex-col gap-4">
          {/* Store logo upload */}
          <div>
            <label className="block text-xs font-semibold text-on-surface-variant mb-1.5 uppercase tracking-wide">
              Store Logo
            </label>
            <input ref={logoInputRef} type="file" accept="image/*" className="hidden" onChange={handleLogoChange} />
            {logoPreview ? (
              <div className="relative w-full h-32 rounded-xl overflow-hidden border border-outline-variant">
                <img src={logoPreview} alt="Store logo" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={removeLogo}
                  className="absolute top-2 right-2 w-7 h-7 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors"
                >
                  <X size={14} className="text-white" />
                </button>
                <button
                  type="button"
                  onClick={() => logoInputRef.current?.click()}
                  className="absolute bottom-2 right-2 px-3 py-1.5 bg-black/50 hover:bg-black/70 rounded-lg text-white text-xs font-medium transition-colors"
                >
                  Change
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => logoInputRef.current?.click()}
                className="w-full h-20 rounded-xl border-2 border-dashed border-outline-variant hover:border-primary hover:bg-primary/5 flex items-center justify-center gap-3 transition-colors text-on-surface-variant hover:text-primary"
              >
                <ImagePlus size={20} />
                <span className="text-xs font-medium">Upload store logo (optional)</span>
              </button>
            )}
          </div>

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

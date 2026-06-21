import { useState, type FormEvent } from 'react'
import { Modal } from '../ui/Modal'
import { staffApi } from '../../api/staff.api'
import { Shield, Info } from 'lucide-react'
import toast from 'react-hot-toast'

interface AddGuardModalProps {
  isOpen: boolean
  onClose: () => void
  storeId: string
  onSuccess: () => void
}

export function AddGuardModal({ isOpen, onClose, storeId, onSuccess }: AddGuardModalProps) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await staffApi.add(storeId, email.trim())
      toast.success('Guard added successfully!')
      onSuccess()
      onClose()
      setEmail('')
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
        'Failed to add guard'
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Guard" size="sm">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex items-start gap-2.5 bg-blue-50 border border-blue-200 rounded-card p-3">
          <Info size={15} className="text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-blue-800 leading-relaxed">
            The guard must already have a QuickBill account. They need to download the app and register first.
          </p>
        </div>

        <div>
          <label className="block text-xs font-semibold text-on-surface-variant mb-1.5 uppercase tracking-wide">
            Guard's Email Address *
          </label>
          <input
            className="input-field"
            type="email"
            placeholder="guard@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="flex gap-3 pt-1">
          <button type="button" onClick={onClose} className="flex-1 btn-secondary justify-center">Cancel</button>
          <button type="submit" disabled={loading} className="flex-1 btn-primary justify-center disabled:opacity-60">
            <Shield size={14} />
            {loading ? 'Adding...' : 'Add Guard'}
          </button>
        </div>
      </form>
    </Modal>
  )
}

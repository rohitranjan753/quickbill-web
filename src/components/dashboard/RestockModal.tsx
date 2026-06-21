import { useState, type FormEvent } from 'react'
import { Modal } from '../ui/Modal'
import { inventoryApi, type InventoryItem } from '../../api/inventory.api'
import toast from 'react-hot-toast'

interface RestockModalProps {
  isOpen: boolean
  onClose: () => void
  storeId: string
  item: InventoryItem | null
  mode: 'restock' | 'adjust'
  onSuccess: () => void
}

export function RestockModal({ isOpen, onClose, storeId, item, mode, onSuccess }: RestockModalProps) {
  const [quantity, setQuantity] = useState('')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!item) return
    setLoading(true)
    try {
      const qty = parseInt(quantity)
      if (isNaN(qty) || qty <= 0) { toast.error('Enter a valid quantity'); return }

      if (mode === 'restock') {
        await inventoryApi.restock(storeId, item.product_id, { quantity: qty, notes })
        toast.success(`Restocked ${qty} units`)
      } else {
        await inventoryApi.update(storeId, item.product_id, { quantity: qty, notes })
        toast.success(`Stock updated to ${qty}`)
      }
      onSuccess()
      onClose()
      setQuantity('')
      setNotes('')
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message ?? 'Operation failed'
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={mode === 'restock' ? 'Restock Product' : 'Adjust Stock'} size="sm">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {item && (
          <div className="bg-surface-low rounded-card p-3">
            <div className="text-sm font-medium text-on-surface">{item.product.name}</div>
            <div className="text-xs text-on-surface-variant mt-0.5">
              Current stock: <span className="font-mono font-semibold">{item.quantity}</span> units
            </div>
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold text-on-surface-variant mb-1.5 uppercase tracking-wide">
            {mode === 'restock' ? 'Quantity to Add *' : 'New Stock Quantity *'}
          </label>
          <input
            className="input-field"
            type="number"
            min="1"
            placeholder={mode === 'restock' ? '100' : '50'}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-on-surface-variant mb-1.5 uppercase tracking-wide">Notes</label>
          <input
            className="input-field"
            placeholder="e.g. New shipment from supplier"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <div className="flex gap-3 pt-1">
          <button type="button" onClick={onClose} className="flex-1 btn-secondary justify-center">Cancel</button>
          <button type="submit" disabled={loading} className="flex-1 btn-primary justify-center disabled:opacity-60">
            {loading ? 'Saving...' : mode === 'restock' ? 'Restock' : 'Update'}
          </button>
        </div>
      </form>
    </Modal>
  )
}

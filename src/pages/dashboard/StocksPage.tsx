import { useState, useEffect, useCallback } from 'react'
import { RefreshCw, Package } from 'lucide-react'
import { useStore } from '../../context/StoreContext'
import { inventoryApi, type InventoryItem } from '../../api/inventory.api'
import { Badge } from '../../components/ui/Badge'
import { EmptyState } from '../../components/ui/EmptyState'
import { Spinner } from '../../components/ui/Spinner'
import { RestockModal } from '../../components/dashboard/RestockModal'
import toast from 'react-hot-toast'

type ModalMode = 'restock' | 'adjust'

function getStockStatus(item: InventoryItem): { label: string; variant: 'success' | 'warning' | 'error' } {
  const available = item.quantity - item.reserved_quantity
  if (available <= 0) return { label: 'Out of Stock', variant: 'error' }
  if (available <= item.low_stock_threshold) return { label: 'Low Stock', variant: 'warning' }
  return { label: 'In Stock', variant: 'success' }
}

export function StocksPage() {
  const { storeId } = useStore()
  const [items, setItems] = useState<InventoryItem[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [modalItem, setModalItem] = useState<InventoryItem | null>(null)
  const [modalMode, setModalMode] = useState<ModalMode>('restock')
  const LIMIT = 20

  const fetchInventory = useCallback(async () => {
    if (!storeId) return
    setLoading(true)
    try {
      const res = await inventoryApi.list(storeId, { page, limit: LIMIT })
      const data = res.data.data
      setItems(data.items ?? [])
      setTotal(data.total ?? 0)
    } catch {
      toast.error('Failed to load inventory')
    } finally {
      setLoading(false)
    }
  }, [storeId, page])

  useEffect(() => { fetchInventory() }, [fetchInventory])

  const openModal = (item: InventoryItem, mode: ModalMode) => {
    setModalItem(item)
    setModalMode(mode)
  }

  const totalPages = Math.ceil(total / LIMIT)

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-on-surface">Stock Levels</h2>
          <p className="text-sm text-on-surface-variant">{total} products tracked</p>
        </div>
        <button onClick={fetchInventory} className="btn-ghost text-sm py-2">
          <RefreshCw size={14} />
          Refresh
        </button>
      </div>

      {/* Summary chips */}
      <div className="flex gap-3 flex-wrap">
        {[
          { label: 'Total tracked', value: total, color: 'bg-surface-card border border-outline-variant' },
          { label: 'Low stock', value: items.filter((i) => getStockStatus(i).variant === 'warning').length, color: 'bg-amber-50 border border-amber-200' },
          { label: 'Out of stock', value: items.filter((i) => getStockStatus(i).variant === 'error').length, color: 'bg-red-50 border border-red-200' },
        ].map((chip) => (
          <div key={chip.label} className={`flex items-center gap-2 ${chip.color} rounded-pill px-4 py-1.5`}>
            <span className="text-xs text-on-surface-variant">{chip.label}</span>
            <span className="font-bold text-on-surface text-sm font-numbers">{chip.value}</span>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Spinner size="lg" />
          </div>
        ) : items.length === 0 ? (
          <EmptyState
            icon={Package}
            title="No inventory data"
            description="Add products first to start tracking stock levels"
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-outline-variant bg-surface-low">
                  {['Product', 'Barcode', 'In Stock', 'Reserved', 'Available', 'Threshold', 'Status', 'Actions'].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-on-surface-variant uppercase tracking-wide">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map((item) => {
                  const available = item.quantity - item.reserved_quantity
                  const status = getStockStatus(item)
                  return (
                    <tr key={item.id} className={`border-b border-outline-variant last:border-0 hover:bg-surface-low transition-colors ${
                      status.variant === 'error' ? 'bg-red-50/30' : status.variant === 'warning' ? 'bg-amber-50/30' : ''
                    }`}>
                      <td className="px-4 py-3">
                        <div className="font-medium text-on-surface text-sm">{item.product.name}</div>
                        <div className="text-xs text-outline mt-0.5">{item.product.unit}</div>
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-on-surface-variant">{item.product.barcode}</td>
                      <td className="px-4 py-3 font-numbers font-bold text-on-surface text-sm">{item.quantity}</td>
                      <td className="px-4 py-3 font-numbers text-sm text-on-surface-variant">{item.reserved_quantity}</td>
                      <td className="px-4 py-3">
                        <span className={`font-numbers font-bold text-sm ${
                          available <= 0 ? 'text-error' : available <= item.low_stock_threshold ? 'text-amber-600' : 'text-primary'
                        }`}>{available}</span>
                      </td>
                      <td className="px-4 py-3 font-numbers text-sm text-on-surface-variant">{item.low_stock_threshold}</td>
                      <td className="px-4 py-3">
                        <Badge variant={status.variant}>{status.label}</Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1.5">
                          <button
                            onClick={() => openModal(item, 'restock')}
                            className="text-xs px-2.5 py-1 bg-primary/10 text-primary rounded-card font-medium hover:bg-primary/20 transition-colors"
                          >
                            Restock
                          </button>
                          <button
                            onClick={() => openModal(item, 'adjust')}
                            className="text-xs px-2.5 py-1 bg-surface-medium text-on-surface-variant rounded-card font-medium hover:bg-surface-high transition-colors"
                          >
                            Adjust
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-on-surface-variant">Page {page} of {totalPages}</p>
          <div className="flex gap-2">
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="btn-secondary text-sm py-1.5 px-3 disabled:opacity-50">Previous</button>
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="btn-secondary text-sm py-1.5 px-3 disabled:opacity-50">Next</button>
          </div>
        </div>
      )}

      <RestockModal
        isOpen={!!modalItem}
        onClose={() => setModalItem(null)}
        storeId={storeId!}
        item={modalItem}
        mode={modalMode}
        onSuccess={fetchInventory}
      />
    </div>
  )
}

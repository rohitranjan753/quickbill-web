import { useState, useEffect, useCallback } from 'react'
import { Plus, Shield, Trash2, Clock } from 'lucide-react'
import { useStore } from '../../context/StoreContext'
import { staffApi, type Guard } from '../../api/staff.api'
import { Badge } from '../../components/ui/Badge'
import { EmptyState } from '../../components/ui/EmptyState'
import { Spinner } from '../../components/ui/Spinner'
import { AddGuardModal } from '../../components/dashboard/AddGuardModal'
import toast from 'react-hot-toast'

export function GuardsPage() {
  const { storeId } = useStore()
  const [guards, setGuards] = useState<Guard[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [addOpen, setAddOpen] = useState(false)

  const fetchGuards = useCallback(async () => {
    if (!storeId) return
    setLoading(true)
    try {
      const res = await staffApi.list(storeId)
      const data = res.data.data
      setGuards(data.items ?? [])
      setTotal(data.total ?? 0)
    } catch {
      toast.error('Failed to load guards')
    } finally {
      setLoading(false)
    }
  }, [storeId])

  useEffect(() => { fetchGuards() }, [fetchGuards])

  const handleRemove = async (guard: Guard) => {
    if (!confirm(`Remove ${guard.name} from this store?`)) return
    try {
      await staffApi.remove(storeId!, guard.id)
      toast.success(`${guard.name} removed`)
      fetchGuards()
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message ?? 'Failed to remove guard'
      toast.error(msg)
    }
  }

  const formatTime = (iso?: string) => {
    if (!iso) return null
    return new Date(iso).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-on-surface">Guards</h2>
          <p className="text-sm text-on-surface-variant">{total} guards assigned to this store</p>
        </div>
        <button onClick={() => setAddOpen(true)} className="btn-primary text-sm py-2">
          <Plus size={14} />
          Add Guard
        </button>
      </div>

      {/* Info banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-card px-4 py-3 flex items-start gap-2">
        <Shield size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-blue-800">
          Guards verify customer receipts at store exits. They must have the QuickBill mobile app installed and register an account before you can add them here.
        </p>
      </div>

      {/* List */}
      <div className="card overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Spinner size="lg" />
          </div>
        ) : guards.length === 0 ? (
          <EmptyState
            icon={Shield}
            title="No guards yet"
            description="Add guards to verify customer receipts at the store exit"
            action={
              <button onClick={() => setAddOpen(true)} className="btn-primary text-sm">
                <Plus size={14} /> Add Guard
              </button>
            }
          />
        ) : (
          <div className="divide-y divide-outline-variant">
            {guards.map((guard) => {
              const onShift = !!guard.current_shift
              return (
                <div key={guard.id} className="flex items-center gap-4 px-5 py-4 hover:bg-surface-low transition-colors">
                  {/* Avatar */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    onShift ? 'bg-primary/10' : 'bg-surface-high'
                  }`}>
                    <span className={`font-bold text-sm ${onShift ? 'text-primary' : 'text-outline'}`}>
                      {guard.name?.[0]?.toUpperCase() ?? 'G'}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-on-surface text-sm">{guard.name}</span>
                      <Badge variant={onShift ? 'success' : 'neutral'}>
                        {onShift ? 'On Shift' : 'Off Duty'}
                      </Badge>
                    </div>
                    {guard.phone && <div className="text-xs text-outline mt-0.5">{guard.phone}</div>}
                    {onShift && guard.current_shift && (
                      <div className="flex items-center gap-1 mt-1 text-xs text-on-surface-variant">
                        <Clock size={11} />
                        <span>Since {formatTime(guard.current_shift.shift_start)}</span>
                        <span className="text-outline">·</span>
                        <span>{guard.current_shift.total_scans} scans</span>
                      </div>
                    )}
                  </div>

                  {/* Invited */}
                  <div className="hidden sm:block text-right">
                    <div className="text-xs text-outline">
                      Invited {new Date(guard.invited_at).toLocaleDateString('en-IN')}
                    </div>
                    {guard.joined_at && (
                      <div className="text-xs text-primary/70">
                        Joined {new Date(guard.joined_at).toLocaleDateString('en-IN')}
                      </div>
                    )}
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => handleRemove(guard)}
                    className="p-2 rounded-card hover:bg-error/10 text-outline hover:text-error transition-colors flex-shrink-0"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <AddGuardModal isOpen={addOpen} onClose={() => setAddOpen(false)} storeId={storeId!} onSuccess={fetchGuards} />
    </div>
  )
}

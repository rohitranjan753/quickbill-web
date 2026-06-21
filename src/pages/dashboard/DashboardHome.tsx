import { useEffect, useState } from 'react'
import { Package, AlertTriangle, Shield, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../../context/StoreContext'
import { useAuth } from '../../context/AuthContext'
import { StatsCard } from '../../components/dashboard/StatsCard'
import { CreateStoreForm } from '../../components/dashboard/CreateStoreForm'
import { productsApi } from '../../api/products.api'
import { inventoryApi } from '../../api/inventory.api'
import { staffApi } from '../../api/staff.api'

interface Stats {
  totalProducts: number
  lowStockCount: number
  guardCount: number
}

export function DashboardHome() {
  const { storeId, store } = useStore()
  const { profile } = useAuth()
  const navigate = useNavigate()
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!storeId) { setLoading(false); return }
    const fetchStats = async () => {
      try {
        const [productsRes, inventoryRes, guardsRes] = await Promise.allSettled([
          productsApi.list(storeId, { limit: 1 }),
          inventoryApi.list(storeId, { low_stock: true, limit: 1 }),
          staffApi.list(storeId, { limit: 1 }),
        ])
        setStats({
          totalProducts: productsRes.status === 'fulfilled' ? (productsRes.value.data.data as { total: number }).total ?? 0 : 0,
          lowStockCount: inventoryRes.status === 'fulfilled' ? (inventoryRes.value.data.data as { total: number }).total ?? 0 : 0,
          guardCount: guardsRes.status === 'fulfilled' ? (guardsRes.value.data.data as { total: number }).total ?? 0 : 0,
        })
      } catch {
        setStats({ totalProducts: 0, lowStockCount: 0, guardCount: 0 })
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [storeId])

  if (!storeId && profile) return <CreateStoreForm />

  return (
    <div className="flex flex-col gap-6">
      {/* Welcome */}
      <div>
        <h2 className="text-xl font-bold text-on-surface">
          Welcome back{profile?.name ? `, ${profile.name.split(' ')[0]}` : ''}
        </h2>
        {store && (
          <p className="text-on-surface-variant text-sm mt-0.5">
            {store.name} · {store.city}, {store.state}
          </p>
        )}
      </div>

      {/* Stats */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="card p-5 h-24 bg-surface-medium animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatsCard
            title="Total Products"
            value={stats?.totalProducts ?? 0}
            subtitle="in your catalog"
            icon={Package}
            iconColor="text-primary"
            iconBg="bg-primary/10"
          />
          <StatsCard
            title="Low Stock Items"
            value={stats?.lowStockCount ?? 0}
            subtitle="need restocking"
            icon={AlertTriangle}
            iconColor="text-amber-600"
            iconBg="bg-amber-50"
          />
          <StatsCard
            title="Active Guards"
            value={stats?.guardCount ?? 0}
            subtitle="assigned to store"
            icon={Shield}
            iconColor="text-secondary"
            iconBg="bg-secondary/10"
          />
        </div>
      )}

      {/* Quick actions */}
      <div className="card p-5">
        <h3 className="font-semibold text-on-surface text-sm mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { label: 'Manage Inventory', description: 'Add, edit or upload products', to: '/dashboard/inventory', color: 'text-primary' },
            { label: 'Check Stock Levels', description: 'View and restock inventory', to: '/dashboard/stocks', color: 'text-amber-600' },
            { label: 'Manage Guards', description: 'Add or remove store guards', to: '/dashboard/guards', color: 'text-secondary' },
          ].map((action) => (
            <button
              key={action.label}
              onClick={() => navigate(action.to)}
              className="flex items-center justify-between p-4 bg-surface-low rounded-card hover:bg-surface-medium transition-colors text-left group"
            >
              <div>
                <div className={`font-medium text-sm ${action.color}`}>{action.label}</div>
                <div className="text-xs text-on-surface-variant mt-0.5">{action.description}</div>
              </div>
              <ArrowRight size={15} className="text-outline group-hover:translate-x-0.5 transition-transform" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

import { NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Package, BarChart2, Shield, Zap, LogOut, ChevronRight } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useStore } from '../../context/StoreContext'

const navItems = [
  { label: 'Overview', icon: LayoutDashboard, to: '/dashboard' },
  { label: 'Inventory', icon: Package, to: '/dashboard/inventory' },
  { label: 'Stocks', icon: BarChart2, to: '/dashboard/stocks' },
  { label: 'Guards', icon: Shield, to: '/dashboard/guards' },
]

export function Sidebar() {
  const { user, profile, signOut } = useAuth()
  const { store } = useStore()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <aside className="w-60 bg-surface-card border-r border-outline-variant flex flex-col h-screen sticky top-0 flex-shrink-0">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-outline-variant">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-velocity-gradient rounded-lg flex items-center justify-center">
            <Zap size={15} className="text-white" />
          </div>
          <div>
            <div className="font-bold text-on-surface text-sm leading-tight">QuickBill</div>
            <div className="text-xs text-outline">Dashboard</div>
          </div>
        </div>
        {store && (
          <div className="mt-3 px-3 py-2 bg-surface-low rounded-card">
            <div className="text-xs text-outline mb-0.5">Active Store</div>
            <div className="text-on-surface text-sm font-medium truncate">{store.name}</div>
            <div className="text-xs text-outline truncate">{store.city}, {store.state}</div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/dashboard'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-card text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-on-surface-variant hover:bg-surface-low hover:text-on-surface'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon size={17} />
                <span className="flex-1">{item.label}</span>
                {isActive && <ChevronRight size={14} />}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User section */}
      <div className="px-3 py-4 border-t border-outline-variant">
        <div className="flex items-center gap-3 px-2 py-2 mb-2">
          {user?.user_metadata?.avatar_url ? (
            <img
              src={user.user_metadata.avatar_url}
              alt="Avatar"
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-primary text-xs font-bold">
                {profile?.name?.[0] ?? user?.email?.[0]?.toUpperCase() ?? 'U'}
              </span>
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-on-surface truncate">{profile?.name ?? 'Owner'}</div>
            <div className="text-xs text-outline truncate">{user?.email ?? ''}</div>
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-card text-sm text-outline hover:text-error hover:bg-error/5 transition-colors"
        >
          <LogOut size={15} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  )
}

import { useLocation } from 'react-router-dom'
import { Bell } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const pageTitles: Record<string, string> = {
  '/dashboard': 'Overview',
  '/dashboard/inventory': 'Inventory',
  '/dashboard/stocks': 'Stock Management',
  '/dashboard/guards': 'Guards',
}

export function Topbar() {
  const { user, profile } = useAuth()
  const location = useLocation()
  const title = pageTitles[location.pathname] ?? 'Dashboard'

  return (
    <header className="h-14 bg-surface-card border-b border-outline-variant flex items-center justify-between px-6 flex-shrink-0">
      <h1 className="font-semibold text-on-surface text-base">{title}</h1>

      <div className="flex items-center gap-3">
        <button className="p-2 rounded-card hover:bg-surface-low transition-colors relative">
          <Bell size={17} className="text-outline" />
        </button>
        <div className="flex items-center gap-2">
          {user?.user_metadata?.avatar_url ? (
            <img src={user.user_metadata.avatar_url} alt="Avatar" className="w-7 h-7 rounded-full" />
          ) : (
            <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-primary text-xs font-bold">
                {profile?.name?.[0] ?? user?.email?.[0]?.toUpperCase() ?? 'U'}
              </span>
            </div>
          )}
          <span className="text-sm font-medium text-on-surface hidden sm:block">{profile?.name ?? 'Owner'}</span>
        </div>
      </div>
    </header>
  )
}

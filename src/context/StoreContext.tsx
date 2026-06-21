import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { storesApi, type Store } from '../api/stores.api'
import { useAuth } from './AuthContext'

interface StoreContextType {
  store: Store | null
  storeId: string | null
  loading: boolean
  refreshStore: () => Promise<void>
}

const StoreContext = createContext<StoreContextType | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const { profile } = useAuth()
  const [store, setStore] = useState<Store | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchStore = async (storeId: string) => {
    setLoading(true)
    try {
      const res = await storesApi.getById(storeId)
      setStore(res.data.data)
    } catch (err: unknown) {
      // 404 means the store_id in the staff record points to a deleted store; treat as no store
      const status = (err as { response?: { status?: number } })?.response?.status
      if (status === 404) setStore(null)
      else setStore(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (profile?.store_id) {
      fetchStore(profile.store_id)
    } else {
      setStore(null)
    }
  }, [profile?.store_id])

  const refreshStore = async () => {
    if (profile?.store_id) await fetchStore(profile.store_id)
  }

  return (
    <StoreContext.Provider value={{ store, storeId: profile?.store_id ?? null, loading, refreshStore }}>
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}

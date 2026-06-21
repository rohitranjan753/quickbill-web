import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import { StoreProvider } from './context/StoreContext'
import { ProtectedRoute } from './router/ProtectedRoute'
import { LandingPage } from './pages/LandingPage'
import { AuthCallback } from './pages/AuthCallback'
import { DashboardLayout } from './components/dashboard/DashboardLayout'
import { DashboardHome } from './pages/dashboard/DashboardHome'
import { InventoryPage } from './pages/dashboard/InventoryPage'
import { StocksPage } from './pages/dashboard/StocksPage'
import { GuardsPage } from './pages/dashboard/GuardsPage'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <StoreProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '14px',
                borderRadius: '10px',
              },
              success: { iconTheme: { primary: '#006948', secondary: '#fff' } },
            }}
          />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<DashboardHome />} />
              <Route path="inventory" element={<InventoryPage />} />
              <Route path="stocks" element={<StocksPage />} />
              <Route path="guards" element={<GuardsPage />} />
            </Route>
            <Route path="*" element={<LandingPage />} />
          </Routes>
        </StoreProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App

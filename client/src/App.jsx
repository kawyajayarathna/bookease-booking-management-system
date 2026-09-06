import { BrowserRouter, useLocation } from 'react-router-dom'
import Navigation from './components/Navigation'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import Footer from './components/Footer'
import AppRoutes from './routes/AppRoutes'

function AppShell() {
  const { pathname } = useLocation()
  const isLogin = pathname === '/login' || pathname === '/register'
  return (
    <AuthProvider>
      <CartProvider>
        <div className="flex min-h-screen flex-col bg-slate-50">
          {!isLogin && <Navigation />}
          <AppRoutes />
          {!isLogin && <Footer />}
        </div>
      </CartProvider>
    </AuthProvider>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}

export default App

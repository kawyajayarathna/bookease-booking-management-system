import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ProtectedRoute = () => {
  const { user, loading } = useAuth()
  if (loading) return <div className="flex min-h-[calc(100vh-73px)] items-center justify-center text-slate-600">Loading...</div>
  return user ? <Outlet /> : <Navigate to="/login" replace />
}

export default ProtectedRoute

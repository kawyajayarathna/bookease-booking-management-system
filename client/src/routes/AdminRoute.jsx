import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const AdminRoute = () => {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="flex min-h-[calc(100vh-73px)] items-center justify-center text-slate-600">Loading...</div>
  }

  if (!user) return <Navigate to="/login" replace />
  return user.role === 'admin' ? <Outlet /> : <Navigate to="/dashboard" replace />
}

export default AdminRoute

import { Route, Routes } from 'react-router-dom'
import Bookings from '../pages/Bookings'
import Dashboard from '../pages/Dashboard'
import AdminDashboard from '../pages/AdminDashboard'
import Home from '../pages/Home'
import Login from '../pages/Login'
import NotFound from '../pages/NotFound'
import Register from '../pages/Register'
import Users from '../pages/Users'
import ProtectedRoute from './ProtectedRoute'
import AdminRoute from './AdminRoute'

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route element={<ProtectedRoute />}>
      <Route path="/dashboard" element={<Dashboard />} />
    </Route>
    <Route element={<AdminRoute />}>
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
    </Route>
    <Route element={<AdminRoute />}>
      <Route path="/users" element={<Users />} />
    </Route>
    <Route path="/bookings" element={<Bookings />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
)

export default AppRoutes

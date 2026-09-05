import { Route, Routes } from 'react-router-dom'
import Bookings from '../pages/Bookings'
import Dashboard from '../pages/Dashboard'
import Home from '../pages/Home'
import Login from '../pages/Login'
import NotFound from '../pages/NotFound'
import Register from '../pages/Register'
import Users from '../pages/Users'
import ProtectedRoute from './ProtectedRoute'

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route element={<ProtectedRoute />}>
      <Route path="/dashboard" element={<Dashboard />} />
    </Route>
    <Route path="/users" element={<Users />} />
    <Route path="/bookings" element={<Bookings />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
)

export default AppRoutes

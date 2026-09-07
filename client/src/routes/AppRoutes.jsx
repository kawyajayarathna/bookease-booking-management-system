import { Navigate, Route, Routes } from 'react-router-dom'
import Bookings from '../pages/Bookings'
import CreateBooking from '../pages/CreateBooking'
import AdminBookings from '../pages/AdminBookings'
import AdminDashboard from '../pages/AdminDashboard'
import Home from '../pages/Home'
import Login from '../pages/Login'
import NotFound from '../pages/NotFound'
import Users from '../pages/Users'
import ProtectedRoute from './ProtectedRoute'
import AdminRoute from './AdminRoute'
import Catalogue from '../pages/Catalogue'
import ServiceDetails from '../pages/ServiceDetails'
import Cart from '../pages/Cart'
import About from '../pages/About'
import Contact from '../pages/Contact'
import GoogleCallback from '../pages/GoogleCallback'

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Login />} />
    <Route path="/auth/google/callback" element={<GoogleCallback />} />
    <Route path="/catalogue" element={<Catalogue />} />
    <Route path="/catalogue/:id" element={<ServiceDetails />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/cart" element={<Cart />} />
    <Route element={<ProtectedRoute />}>
      <Route path="/dashboard" element={<Navigate to="/" replace />} />
      <Route path="/bookings" element={<Bookings />} />
      <Route path="/bookings/create" element={<CreateBooking />} />
    </Route>
    <Route element={<AdminRoute />}>
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
    </Route>
    <Route element={<AdminRoute />}>
      <Route path="/users" element={<Users />} />
      <Route path="/admin/bookings" element={<AdminBookings />} />
    </Route>
    <Route path="*" element={<NotFound />} />
  </Routes>
)

export default AppRoutes

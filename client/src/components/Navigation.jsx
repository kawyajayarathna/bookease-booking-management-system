import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const publicLinks = [
  { to: '/', label: 'Home' },
  { to: '/login', label: 'Login' },
  { to: '/register', label: 'Register' },
]

const Navigation = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const links = user ? [{ to: '/', label: 'Home' }, { to: '/dashboard', label: 'Dashboard' }] : publicLinks
  const handleLogout = () => { logout(); navigate('/login', { replace: true }) }

  return <nav className="border-b border-slate-200 bg-white">
    <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
      <NavLink to="/" className="text-xl font-bold text-blue-700">BookEase</NavLink>
      <div className="flex gap-5 text-sm font-medium">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => isActive ? 'text-blue-700' : 'text-slate-600 hover:text-blue-700'}
          >
            {link.label}
          </NavLink>
        ))}
        {user && <button type="button" onClick={handleLogout} className="text-slate-600 hover:text-blue-700">Logout</button>}
      </div>
    </div>
  </nav>
}

export default Navigation

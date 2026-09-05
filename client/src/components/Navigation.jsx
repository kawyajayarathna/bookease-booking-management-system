import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/login', label: 'Login' },
  { to: '/register', label: 'Register' },
]

const Navigation = () => (
  <nav className="border-b border-slate-200 bg-white">
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
      </div>
    </div>
  </nav>
)

export default Navigation

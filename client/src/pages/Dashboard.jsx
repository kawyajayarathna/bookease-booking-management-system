import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Dashboard = () => { const { user, logout } = useAuth(); const navigate = useNavigate(); const signOut = () => { logout(); navigate('/login', { replace: true }) }; return <main className="mx-auto w-full max-w-5xl px-6 py-12"><div className="rounded-2xl bg-white p-8 shadow-lg"><h1 className="text-3xl font-bold text-slate-900">Welcome, {user.name}</h1><div className="mt-6 grid gap-4 sm:grid-cols-3"><div><p className="text-sm text-slate-500">Name</p><p className="font-medium">{user.name}</p></div><div><p className="text-sm text-slate-500">Email</p><p className="font-medium">{user.email}</p></div><div><p className="text-sm text-slate-500">Role</p><p className="font-medium capitalize">{user.role}</p></div></div><button type="button" onClick={signOut} className="mt-8 rounded-lg bg-slate-900 px-4 py-2.5 font-semibold text-white">Logout</button></div></main> }
export default Dashboard

import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const { login } = useAuth(); const navigate = useNavigate(); const location = useLocation()
  const [form, setForm] = useState({ email: '', password: '' }); const [error, setError] = useState(''); const [loading, setLoading] = useState(false)
  const change = ({ target }) => setForm({ ...form, [target.name]: target.value })
  const submit = async (event) => {
    event.preventDefault(); setError('')
    if (!form.email || !form.password) return setError('Email and password are required.')
    setLoading(true)
    try { const { data } = await api.post('/auth/login', form); login(data.user, data.token); navigate(data.user.role === 'admin' ? '/admin/dashboard' : '/dashboard', { replace: true }) }
    catch (requestError) { setError(requestError.response?.data?.message || 'Unable to connect to the server.') }
    finally { setLoading(false) }
  }
  return <main className="flex flex-1 items-center justify-center px-6 py-12"><form onSubmit={submit} className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
    <h1 className="text-3xl font-bold text-slate-900">Welcome back</h1>
    {location.state?.message && <p className="mt-3 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700">{location.state.message}</p>}
    {error && <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
    <div className="mt-6 space-y-4"><label className="block text-sm font-medium text-slate-700">Email<input name="email" type="email" value={form.email} onChange={change} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" /></label><label className="block text-sm font-medium text-slate-700">Password<input name="password" type="password" value={form.password} onChange={change} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" /></label></div>
    <button disabled={loading} className="mt-6 w-full rounded-lg bg-blue-700 px-4 py-2.5 font-semibold text-white disabled:opacity-60">{loading ? 'Logging in...' : 'Login'}</button>
    <p className="mt-5 text-center text-sm text-slate-600">Don't have an account? <Link to="/register" className="font-semibold text-blue-700">Register</Link></p>
  </form></main>
}
export default Login

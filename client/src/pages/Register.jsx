import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/axios'

const Register = () => {
  const navigate = useNavigate(); const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' }); const [error, setError] = useState(''); const [loading, setLoading] = useState(false)
  const change = ({ target }) => setForm({ ...form, [target.name]: target.value })
  const submit = async (event) => {
    event.preventDefault(); setError('')
    if (!form.name || !form.email || !form.password || !form.confirmPassword) return setError('All fields are required.')
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return setError('Please enter a valid email address.')
    if (form.password.length < 6) return setError('Password must be at least 6 characters.')
    if (form.password !== form.confirmPassword) return setError('Passwords do not match.')
    setLoading(true)
    try { const { data } = await api.post('/auth/register', { name: form.name, email: form.email, password: form.password }); navigate(data.token ? '/dashboard' : '/login', data.token ? { replace: true } : { replace: true, state: { message: 'Registration successful. Please log in.' } }) }
    catch (requestError) { setError(requestError.response?.data?.message || 'Unable to connect to the server.') }
    finally { setLoading(false) }
  }
  const fields = [['name', 'Name', 'text'], ['email', 'Email', 'email'], ['password', 'Password', 'password'], ['confirmPassword', 'Confirm Password', 'password']]
  return <main className="flex flex-1 items-center justify-center px-6 py-12"><form onSubmit={submit} className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg"><h1 className="text-3xl font-bold text-slate-900">Create your account</h1>{error && <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}<div className="mt-6 space-y-4">{fields.map(([name, label, type]) => <label key={name} className="block text-sm font-medium text-slate-700">{label}<input name={name} type={type} value={form[name]} onChange={change} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" /></label>)}</div><button disabled={loading} className="mt-6 w-full rounded-lg bg-blue-700 px-4 py-2.5 font-semibold text-white disabled:opacity-60">{loading ? 'Creating account...' : 'Register'}</button><p className="mt-5 text-center text-sm text-slate-600">Already have an account? <Link to="/login" className="font-semibold text-blue-700">Login</Link></p></form></main>
}
export default Register

import { useEffect, useState } from 'react'
import api from '../api/axios'

const badge = (value, colors) => <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${colors}`}>{value}</span>

const Users = () => {
  const [users, setUsers] = useState([]); const [search, setSearch] = useState(''); const [loading, setLoading] = useState(true); const [error, setError] = useState(''); const [selected, setSelected] = useState(null); const [detailsLoading, setDetailsLoading] = useState(false)

  useEffect(() => {
    const timer = setTimeout(async () => {
      setLoading(true); setError('')
      try { const { data } = await api.get('/users', { params: search.trim() ? { search: search.trim() } : {} }); setUsers(data.users) }
      catch (requestError) { setError(requestError.response?.status === 401 || requestError.response?.status === 403 ? 'You are not authorized to view users.' : 'Unable to load users. Please try again.') }
      finally { setLoading(false) }
    }, 400)
    return () => clearTimeout(timer)
  }, [search])

  const viewUser = async (id) => {
    setDetailsLoading(true); setError('')
    try { const { data } = await api.get(`/users/${id}`); setSelected(data.user) }
    catch (requestError) { setError(requestError.response?.data?.message || 'Unable to load user details.') }
    finally { setDetailsLoading(false) }
  }

  return <main className="mx-auto w-full max-w-6xl px-6 py-12"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-sm font-semibold uppercase tracking-wider text-blue-700">Administration</p><h1 className="mt-2 text-3xl font-bold text-slate-900">User Management</h1><p className="mt-2 text-slate-600">Manage and monitor BookEase users.</p></div><input aria-label="Search users" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search name or email..." className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 sm:w-72" /></div>
    {error && <p className="mt-6 rounded-lg bg-red-50 p-4 text-sm text-red-700">{error}</p>}
    <div className="mt-8 overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">{loading ? <p className="p-8 text-center text-slate-600">Loading users...</p> : users.length === 0 ? <p className="p-8 text-center text-slate-600">No users found.</p> : <table className="w-full min-w-[720px] text-left text-sm"><thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="px-6 py-4">Name</th><th className="px-6 py-4">Email</th><th className="px-6 py-4">Role</th><th className="px-6 py-4">Status</th><th className="px-6 py-4">Joined</th><th className="px-6 py-4">Actions</th></tr></thead><tbody className="divide-y divide-slate-100">{users.map((user) => <tr key={user._id}><td className="px-6 py-4 font-medium text-slate-900">{user.name}</td><td className="px-6 py-4 text-slate-600">{user.email}</td><td className="px-6 py-4">{badge(user.role === 'admin' ? 'Admin' : 'User', user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-700')}</td><td className="px-6 py-4">{badge(user.isBlocked ? 'Blocked' : 'Active', user.isBlocked ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700')}</td><td className="px-6 py-4 text-slate-600">{new Date(user.createdAt).toLocaleDateString()}</td><td className="px-6 py-4"><button type="button" onClick={() => viewUser(user._id)} className="font-semibold text-blue-700 hover:text-blue-900">View</button></td></tr>)}</tbody></table>}</div>
    {selected && <div className="fixed inset-0 z-10 flex items-center justify-center bg-slate-900/40 px-6" onClick={() => setSelected(null)}><section role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()} className="w-full max-w-md rounded-2xl bg-white p-7 shadow-xl"><div className="flex items-start justify-between"><div><p className="text-sm font-semibold uppercase tracking-wider text-blue-700">User details</p><h2 className="mt-1 text-2xl font-bold text-slate-900">{selected.name}</h2></div><button type="button" onClick={() => setSelected(null)} aria-label="Close" className="text-2xl text-slate-400">×</button></div><dl className="mt-6 space-y-4 text-sm"><div><dt className="text-slate-500">Email</dt><dd className="font-medium text-slate-900">{selected.email}</dd></div><div><dt className="text-slate-500">Role</dt><dd className="font-medium capitalize text-slate-900">{selected.role}</dd></div><div><dt className="text-slate-500">Account Status</dt><dd className="font-medium text-slate-900">{selected.isBlocked ? 'Blocked' : 'Active'}</dd></div><div><dt className="text-slate-500">Joined Date</dt><dd className="font-medium text-slate-900">{new Date(selected.createdAt).toLocaleString()}</dd></div><div><dt className="text-slate-500">Last Updated</dt><dd className="font-medium text-slate-900">{new Date(selected.updatedAt).toLocaleString()}</dd></div></dl></section></div>}
    {detailsLoading && <p className="mt-4 text-center text-sm text-slate-500">Loading details...</p>}
  </main>
}

export default Users

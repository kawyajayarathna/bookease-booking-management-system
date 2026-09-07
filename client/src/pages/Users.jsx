import { useEffect, useState } from 'react'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'

const badge = (value, colors) => <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${colors}`}>{value}</span>

const Users = () => {
  const { user: currentUser } = useAuth()
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [selected, setSelected] = useState(null)
  const [confirmUser, setConfirmUser] = useState(null)
  const [processingId, setProcessingId] = useState(null)

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
    try { const { data } = await api.get(`/users/${id}`); setSelected(data.user) }
    catch (requestError) { setError(requestError.response?.data?.message || 'Unable to load user details.') }
  }

  const toggleBlock = async () => {
    setProcessingId(confirmUser._id); setError('')
    try {
      const { data } = await api.patch(`/users/${confirmUser._id}/block`)
      setUsers((current) => current.map((item) => item._id === data.user._id ? { ...item, ...data.user } : item))
      setSuccess(`${data.user.name} has been ${data.user.isBlocked ? 'blocked' : 'unblocked'} successfully.`)
      setConfirmUser(null)
    } catch (requestError) { setError(requestError.response?.data?.message || 'Unable to update user status.') }
    finally { setProcessingId(null) }
  }

  return <main className="mx-auto w-full max-w-6xl px-6 py-12"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-sm font-semibold uppercase tracking-wider text-blue-700">Administration</p><h1 className="mt-2 text-3xl font-bold text-slate-900">User Management</h1><p className="mt-2 text-slate-600">Manage and monitor BookEase users.</p></div><input aria-label="Search users" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search name or email..." className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 sm:w-72" /></div>
    {success && <p className="mt-6 rounded-lg bg-emerald-50 p-4 text-sm text-emerald-700">{success}</p>}{error && <p className="mt-6 rounded-lg bg-red-50 p-4 text-sm text-red-700">{error}</p>}
    <div className="mt-8 overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">{loading ? <p className="p-8 text-center text-slate-600">Loading users...</p> : users.length === 0 ? <p className="p-8 text-center text-slate-600">No users found.</p> : <table className="w-full min-w-[820px] text-left text-sm"><thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="px-6 py-4">Name</th><th className="px-6 py-4">Email</th><th className="px-6 py-4">Role</th><th className="px-6 py-4">Status</th><th className="px-6 py-4">Joined</th><th className="px-6 py-4">Actions</th></tr></thead><tbody className="divide-y divide-slate-100">{users.map((item) => { const canToggle = item.role !== 'admin' && item._id !== currentUser.id; return <tr key={item._id}><td className="px-6 py-4 font-medium text-slate-900">{item.name}</td><td className="px-6 py-4 text-slate-600">{item.email}</td><td className="px-6 py-4">{badge(item.role === 'admin' ? 'Admin' : 'User', item.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-700')}</td><td className="px-6 py-4">{badge(item.isBlocked ? 'Blocked' : 'Active', item.isBlocked ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700')}</td><td className="px-6 py-4 text-slate-600">{new Date(item.createdAt).toLocaleDateString()}</td><td className="space-x-3 px-6 py-4"><button type="button" onClick={() => viewUser(item._id)} className="font-semibold text-blue-700 hover:text-blue-900">View</button>{canToggle && <button type="button" onClick={() => { setConfirmUser(item); setSuccess('') }} className={`font-semibold ${item.isBlocked ? 'text-emerald-700 hover:text-emerald-900' : 'text-red-700 hover:text-red-900'}`}>{item.isBlocked ? 'Unblock' : 'Block'}</button>}</td></tr> })}</tbody></table>}</div>
    {selected && <div className="fixed inset-0 z-10 flex items-center justify-center bg-slate-900/40 px-6" onClick={() => setSelected(null)}><section role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()} className="w-full max-w-md rounded-2xl bg-white p-7 shadow-xl"><div className="flex items-start justify-between"><div><p className="text-sm font-semibold uppercase tracking-wider text-blue-700">User details</p><h2 className="mt-1 text-2xl font-bold text-slate-900">{selected.name}</h2></div><button type="button" onClick={() => setSelected(null)} aria-label="Close" className="text-2xl text-slate-400">×</button></div><dl className="mt-6 space-y-4 text-sm"><div><dt className="text-slate-500">Email</dt><dd className="font-medium">{selected.email}</dd></div><div><dt className="text-slate-500">Role</dt><dd className="font-medium capitalize">{selected.role}</dd></div><div><dt className="text-slate-500">Account Status</dt><dd className="font-medium">{selected.isBlocked ? 'Blocked' : 'Active'}</dd></div><div><dt className="text-slate-500">Joined Date</dt><dd className="font-medium">{new Date(selected.createdAt).toLocaleString()}</dd></div><div><dt className="text-slate-500">Last Updated</dt><dd className="font-medium">{new Date(selected.updatedAt).toLocaleString()}</dd></div></dl></section></div>}
    {confirmUser && <div className="fixed inset-0 z-20 flex items-center justify-center bg-slate-900/40 px-6"><section role="alertdialog" aria-modal="true" className="w-full max-w-md rounded-2xl bg-white p-7 shadow-xl"><h2 className="text-2xl font-bold text-slate-900">{confirmUser.isBlocked ? 'Unblock User?' : 'Block User?'}</h2><p className="mt-4 text-slate-700">Are you sure you want to {confirmUser.isBlocked ? 'unblock' : 'block'} {confirmUser.name}?</p>{!confirmUser.isBlocked && <p className="mt-2 text-sm text-slate-500">The user will no longer be able to log in.</p>}<div className="mt-7 flex justify-end gap-3"><button type="button" disabled={Boolean(processingId)} onClick={() => setConfirmUser(null)} className="rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 disabled:opacity-50">Cancel</button><button type="button" disabled={Boolean(processingId)} onClick={toggleBlock} className={`rounded-lg px-4 py-2 font-semibold text-white disabled:opacity-50 ${confirmUser.isBlocked ? 'bg-emerald-700' : 'bg-red-700'}`}>{processingId ? 'Updating...' : confirmUser.isBlocked ? 'Unblock User' : 'Block User'}</button></div></section></div>}
  </main>
}

export default Users

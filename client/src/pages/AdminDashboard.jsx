import { useAuth } from '../context/AuthContext'

const cards = [
  ['Total Users', '—'],
  ['Active Users', '—'],
  ['Blocked Users', '—'],
  ['Total Bookings', '—'],
]

const AdminDashboard = () => {
  const { user } = useAuth()

  return <main className="mx-auto w-full max-w-6xl px-6 py-12">
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div><p className="text-sm font-semibold uppercase tracking-wider text-blue-700">Administration</p><h1 className="mt-2 text-3xl font-bold text-slate-900">Welcome, {user.name}</h1><p className="mt-2 text-slate-600">Manage your BookEase platform from one place.</p></div>
      <span className="w-fit rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-800">Administrator</span>
    </div>
    <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{cards.map(([label, value]) => <div key={label} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"><p className="text-sm text-slate-500">{label}</p><p className="mt-3 text-3xl font-bold text-slate-900">{value}</p><p className="mt-2 text-xs text-slate-400">Coming soon</p></div>)}</div>
    <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"><h2 className="text-lg font-semibold text-slate-900">Admin account</h2><div className="mt-4 grid gap-4 sm:grid-cols-3"><div><p className="text-sm text-slate-500">Name</p><p className="font-medium text-slate-800">{user.name}</p></div><div><p className="text-sm text-slate-500">Email</p><p className="font-medium text-slate-800">{user.email}</p></div><div><p className="text-sm text-slate-500">Role</p><p className="font-medium capitalize text-slate-800">{user.role}</p></div></div></div>
  </main>
}

export default AdminDashboard

const styles = { pending: 'bg-amber-100 text-amber-800', confirmed: 'bg-emerald-100 text-emerald-800', cancelled: 'bg-red-100 text-red-800', completed: 'bg-blue-100 text-blue-800' }
const BookingStatusBadge = ({ status }) => <span className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${styles[status] || 'bg-slate-100 text-slate-700'}`}>{status || 'Unknown'}</span>
export default BookingStatusBadge

import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const GoogleCallback = () => {
  const [params] = useSearchParams(); const { login } = useAuth(); const navigate = useNavigate()
  useEffect(() => { const token = params.get('token'); const encodedUser = params.get('user'); if (!token || !encodedUser) return navigate(`/login?oauthError=${params.get('oauthError') || 'invalid_callback'}`, { replace: true }); try { const user = JSON.parse(encodedUser); login(user, token); window.location.replace(user.role === 'admin' ? '/admin/dashboard' : '/') } catch { navigate('/login?oauthError=invalid_callback', { replace: true }) } }, [login, navigate, params])
  return <main className="editorial-auth-status">Completing Google sign-in…</main>
}
export default GoogleCallback

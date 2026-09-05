import { BrowserRouter } from 'react-router-dom'
import Navigation from './components/Navigation'
import { AuthProvider } from './context/AuthContext'
import AppRoutes from './routes/AppRoutes'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen bg-slate-50">
          <Navigation />
          <AppRoutes />
        </div>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App

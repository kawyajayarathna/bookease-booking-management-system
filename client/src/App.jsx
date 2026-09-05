import { BrowserRouter } from 'react-router-dom'
import Navigation from './components/Navigation'
import AppRoutes from './routes/AppRoutes'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50">
        <Navigation />
        <AppRoutes />
      </div>
    </BrowserRouter>
  )
}

export default App

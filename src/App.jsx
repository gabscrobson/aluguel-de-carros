import { BrowserRouter } from 'react-router-dom'
import Router from './Router'
import { AuthProvider } from './contexts/authContext'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </AuthProvider>
  )
}

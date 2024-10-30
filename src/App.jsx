import { BrowserRouter } from 'react-router-dom'
import Router from './Router'
import { AuthProvider } from './contexts/authContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      <ToastContainer position="bottom-right" />
    </AuthProvider>
  )
}

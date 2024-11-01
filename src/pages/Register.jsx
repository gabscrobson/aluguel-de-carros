import React, { useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/authContext'
import { signup } from '../firebase/auth'

export function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)
  const [errorMessage] = useState('')

  const { userLoggedIn } = useAuth()

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!isRegistering) {
      setIsRegistering(true)
      await signup(email, password)
    }
  }

  return (
    <>
      {userLoggedIn && <Navigate to={'/'} replace={true} />}

      <main className="w-full h-screen flex self-center place-content-center place-items-center">
        <div className="w-96 text-gray-600 space-y-5 p-4 shadow-xl border rounded-xl">
          <div className="text-center mb-6">
            <div className="mt-2">
              <h3 className="text-gray-800 text-xl font-semibold sm:text-2xl">
                Criar uma nova conta
              </h3>
            </div>
          </div>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-gray-600 font-bold">Email</label>
              <input
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:blue-600 shadow-sm rounded-lg transition duration-300"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600 font-bold">Senha</label>
              <input
                disabled={isRegistering}
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-blue-600 shadow-sm rounded-lg transition duration-300"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600 font-bold">
                Confirmar senha
              </label>
              <input
                disabled={isRegistering}
                type="password"
                autoComplete="off"
                required
                value={confirmPassword}
                onChange={(e) => {
                  setconfirmPassword(e.target.value)
                }}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-blue-600 shadow-sm rounded-lg transition duration-300"
              />
            </div>

            {errorMessage && (
              <span className="text-red-600 font-bold">{errorMessage}</span>
            )}

            <button
              type="submit"
              disabled={isRegistering}
              className={`w-full px-4 py-2 text-white font-medium rounded-lg ${isRegistering ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-xl transition duration-300'}`}
            >
              {isRegistering ? 'Registrando...' : 'Registrar'}
            </button>
            <div className="text-sm text-center">
              Já tem uma conta? {'   '}
              <Link
                to={'/login'}
                className="text-center text-sm hover:underline font-bold"
              >
                Login
              </Link>
            </div>
          </form>
        </div>
      </main>
    </>
  )
}

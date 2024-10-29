import { useAuth } from '../contexts/authContext'
import { signout } from '../firebase/auth'

export function Header() {
  const { currentUser, isAdmin } = useAuth()

  console.log(currentUser)

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">CarRent</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/" className="hover:underline">
                Seus Aluguéis
              </a>
            </li>
            {isAdmin && (
              <li>
                <a href="/adicionar" className="hover:underline">
                  Adicionar Carro
                </a>
              </li>
            )}
            <li>
              <a href="#" onClick={signout} className="hover:underline">
                Sair
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

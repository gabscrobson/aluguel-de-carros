import { useState } from 'react'
import { Search, Calendar } from 'lucide-react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/authContext'

const cars = [
  {
    id: 1,
    nome: 'Sedan Luxo',
    cor: 'Preto',
    estado: 'Disponível',
    preco_atual: 150,
    imagens: 'https://img2.icarros.com/dbimg/imgnoticia/4/28217_1',
  },
  {
    id: 2,
    nome: 'SUV Familiar',
    cor: 'Prata',
    estado: 'Disponível',
    preco_atual: 200,
    imagens:
      'https://www.jornalcruzeiro.com.br/_midias/jpg/2021/09/08/carros_para_familias_grandes_1-759395.jpg',
  },
  {
    id: 3,
    nome: 'Compacto Econômico',
    cor: 'Branco',
    estado: 'Disponível',
    preco_atual: 100,
    imagens:
      'https://cdn.motor1.com/images/mgl/lEmjGg/s3/chevrolet-tracker-rs-2024.jpg',
  },
  {
    id: 4,
    nome: 'HB20',
    cor: 'Cinza',
    estado: 'Disponível',
    preco_atual: 120,
    imagens:
      'https://www.comprecar.com.br/storage/news/featured/4d8c862f-7f49-4960-9986-7cfb682702b5.jpeg',
  },
]

export function Home() {
  const { userLoggedIn } = useAuth()

  const [searchTerm, setSearchTerm] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const filteredCars = cars.filter((car) =>
    car.nome.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <>
      {!userLoggedIn && <Navigate to={'/login'} replace={true} />}
      <main className="container mx-auto mt-8 mb-8">
        <section className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4 text-black">
            Encontre o carro perfeito
          </h2>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <label
                htmlFor="search"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Pesquisar carro
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  id="search"
                  className="pl-10 w-full p-2 border rounded-md bg-white text-black"
                  placeholder="Ex: Sedan"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex-1 min-w-[200px]">
              <label
                htmlFor="start-date"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Data de retirada
              </label>
              <div className="relative text-gray-400">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="date"
                  id="start-date"
                  className="pl-10 w-full p-2 border rounded-md bg-white text-black"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
            </div>
            <div className="flex-1 min-w-[200px]">
              <label
                htmlFor="end-date"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Data de devolução
              </label>
              <div className="relative text-gray-400">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="date"
                  id="end-date"
                  className="pl-10 w-full p-2 border rounded-md bg-white text-black"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-black">
            Carros disponíveis
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCars.map((car) => (
              <div
                key={car.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={car.imagens}
                  alt={car.nome}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{car.nome}</h3>
                  <p className="text-gray-600 mb-2">Cor: {car.cor}</p>
                  <p className="text-gray-600 mb-2">Estado: {car.estado}</p>
                  <p className="text-lg font-bold text-blue-600">
                    R$ {car.preco_atual}/dia
                  </p>
                  <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300">
                    Reservar agora
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}

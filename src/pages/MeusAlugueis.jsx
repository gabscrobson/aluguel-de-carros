import { useEffect, useState } from 'react'
import { Calendar, Car, DollarSign, Palette } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { ref, get } from 'firebase/database'
import { database } from '../firebase/firebase'
import { useAuth } from '../contexts/authContext'

export function MeusAlugueis() {
  const navigate = useNavigate()
  const [rentals, setRentals] = useState([])
  const { currentUser } = useAuth()

  useEffect(() => {
    const fetchRentals = async () => {
      const rentalsRef = ref(database, `usuarios/${currentUser.uid}/alugueis`)
      const snapshot = await get(rentalsRef)
      if (snapshot.exists()) {
        const rentalsData = snapshot.val()
        const rentalsArray = await Promise.all(
          Object.keys(rentalsData).map(async (key) => {
            const rental = { id: key, ...rentalsData[key] }
            const carRef = ref(database, `carros/${rental.carRef}`)
            const carSnapshot = await get(carRef)
            if (carSnapshot.exists()) {
              rental.car = carSnapshot.val()
            }
            return rental
          }),
        )
        setRentals(rentalsArray)
        console.log(rentalsArray)
      } else {
        console.log('No data available')
      }
    }

    fetchRentals()
  }, [currentUser.uid])

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffTime = Math.abs(end - start)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rentals.map((rental) => (
            <div
              key={rental.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={rental.car.imagens[0]}
                alt={rental.car.nome}
                className="w-full h-48 object-cover"
              />

              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  {rental.car.nome}
                </h2>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-5 h-5" />
                    <div>
                      <p className="text-sm">Período do aluguel:</p>
                      <p className="font-medium">
                        {formatDate(rental.startDate)} até{' '}
                        {formatDate(rental.endDate)}
                      </p>
                      <p className="text-sm text-gray-500">
                        {calculateDuration(rental.startDate, rental.endDate)}{' '}
                        dias
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <DollarSign className="w-5 h-5" />
                    <div>
                      <p className="text-sm">Valor total:</p>
                      <p className="font-medium">
                        R${' '}
                        {parseFloat(rental.price).toLocaleString('pt-BR', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <Palette className="w-5 h-5" />
                    <div>
                      <p className="text-sm">Cor:</p>
                      <p className="font-medium">{rental.car.cor}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {rentals.length === 0 && (
          <div className="text-center py-12">
            <Car className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold text-gray-600">
              Você ainda não possui nenhum aluguel
            </h2>
            <p className="text-gray-500 mt-2">
              Explore nossos carros disponíveis e faça seu primeiro aluguel!
            </p>
            <button
              className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors"
              onClick={() => navigate('/')}
            >
              Explorar carros
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

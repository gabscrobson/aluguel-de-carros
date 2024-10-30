import { useEffect, useState } from 'react'
import { Search, Calendar } from 'lucide-react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/authContext'
import { CarCard } from '../components/CarCard'
import { database } from '../firebase/firebase'
import { ref, get, push } from 'firebase/database'
import { toast } from 'react-toastify'

export function Home() {
  const { currentUser, userLoggedIn } = useAuth()

  const [cars, setCars] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  useEffect(() => {
    const fetchCars = async () => {
      const carsRef = ref(database, 'carros')
      const snapshot = await get(carsRef)
      if (snapshot.exists()) {
        const carsData = snapshot.val()
        const carsArray = Object.keys(carsData).map((key) => ({
          id: key,
          ...carsData[key],
        }))
        setCars(carsArray)
        console.log(carsArray)
      } else {
        console.log('No data available')
      }
    }

    fetchCars()
  }, [])

  const filteredCars = cars.filter(
    (car) =>
      car.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.cor.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleRent = async (car) => {
    if (!startDate || !endDate) {
      alert('Please select start and end dates')
      return
    }

    const rentalRef = ref(database, `usuarios/${currentUser.uid}/alugueis`)
    console.log(car)
    const newRental = {
      startDate,
      endDate,
      carRef: car.id,
      price: car.precoAtual,
    }

    try {
      await push(rentalRef, newRental)
      toast.success('Carro reservado com sucesso!')
    } catch (error) {
      toast.error('Error reserving car:', error)
      console.error('Error reserving car:', error)
    }
  }

  return (
    <>
      {!userLoggedIn && <Navigate to={'/login'} replace={true} />}
      <main className="container mx-auto mt-8 mb-8 w-11/12">
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
              <CarCard key={car.id} {...car} onClick={handleRent} />
            ))}
          </div>
        </section>
      </main>
    </>
  )
}

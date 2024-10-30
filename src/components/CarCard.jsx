import { useState } from 'react'
import { ChevronLeft, ChevronRight, Check, X } from 'lucide-react'
import { useAuth } from '../contexts/authContext'
import { ref, update } from 'firebase/database'
import { database } from '../firebase/firebase'

export function CarCard({
  id,
  imagens,
  nome,
  cor,
  estado,
  precoAtual,
  onClick,
  disabled = false,
}) {
  const { isAdmin } = useAuth()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isDisabled, setIsDisabled] = useState(disabled)

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === imagens.length - 1 ? 0 : prevIndex + 1,
    )
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? imagens.length - 1 : prevIndex - 1,
    )
  }

  const handleDisable = async () => {
    const carRef = ref(database, `carros/${id}`)
    await update(carRef, { disabled: true })
    setIsDisabled(true)
  }

  const handleEnable = async () => {
    const carRef = ref(database, `carros/${id}`)
    await update(carRef, { disabled: false })
    setIsDisabled(false)
  }

  if (!isAdmin && isDisabled) {
    return null
  }

  return (
    <div
      key={id}
      className={`bg-white group rounded-lg shadow-md overflow-hidden ${
        isAdmin && isDisabled ? 'bg-neutral-300' : ''
      }`}
    >
      <div className="relative">
        {isAdmin && (
          <button
            onClick={isDisabled ? handleEnable : handleDisable}
            className={`absolute top-2 right-2 p-1 rounded-full ${
              isDisabled ? 'bg-green-500' : 'bg-red-500'
            } text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
          >
            {isDisabled ? (
              <Check className="w-5 h-5" />
            ) : (
              <X className="w-5 h-5" />
            )}
          </button>
        )}
        <img
          src={imagens[currentImageIndex]}
          alt={`${nome} - Imagem ${currentImageIndex + 1}`}
          className="w-full h-48 object-cover"
        />
        {currentImageIndex > 0 && (
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition duration-300"
            aria-label="Imagem anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}
        {currentImageIndex < imagens.length - 1 && (
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition duration-300"
            aria-label="Próxima imagem"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {imagens.length > 1 &&
            imagens.map((_, index) => (
              <span
                key={index}
                className={`h-2 w-2 rounded-full ${
                  index === currentImageIndex ? 'bg-white' : 'bg-gray-400'
                }`}
                aria-hidden="true"
              ></span>
            ))}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{nome}</h3>
        <p className="text-gray-600 mb-2">Cor: {cor}</p>
        <p className="text-gray-600 mb-2">Estado: {estado}</p>
        <p className="text-lg font-bold text-blue-600">R$ {precoAtual}/dia</p>
        <button
          onClick={() => onClick({ id, precoAtual })}
          className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Reservar agora
        </button>
      </div>
    </div>
  )
}

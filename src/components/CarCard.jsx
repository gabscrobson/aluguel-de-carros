import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function CarCard({
  id,
  imagens,
  nome,
  cor,
  estado,
  precoAtual,
  onClick,
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

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

  return (
    <div key={id} className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
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

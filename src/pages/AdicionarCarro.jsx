import { useState } from 'react'
import { database } from '../firebase/firebase'
import { ref, push } from 'firebase/database'
import ImageUrlManager from '../components/ImageUrlManager'
import { toast } from 'react-toastify'

export function AdicionarCarro() {
  const [carData, setCarData] = useState({
    nome: '',
    cor: '',
    estado: 'disponivel',
    precoAtual: '',
  })

  const [imageUrls, setImageUrls] = useState([])
  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCarData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!carData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório'
    }

    if (!carData.cor.trim()) {
      newErrors.cor = 'Cor é obrigatória'
    }

    if (!carData.precoAtual || carData.precoAtual <= 0) {
      newErrors.precoAtual = 'Preço deve ser maior que zero'
    }

    if (imageUrls.length === 0) {
      newErrors.images = 'Adicione pelo menos uma imagem'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (validateForm()) {
      await push(ref(database, 'carros'), {
        ...carData,
        imagens: imageUrls,
      })

      toast.success('Carro adicionado com sucesso')

      setCarData({
        nome: '',
        cor: '',
        estado: 'disponivel',
        precoAtual: '',
      })
      setImageUrls([])

      console.log('Dados do carro:', carData)
    }
  }

  return (
    <div className="bg-gray-100 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
              Adicionar Novo Carro
            </h1>

            <form className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="nome"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Nome do Carro
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      value={carData.nome}
                      onChange={handleInputChange}
                      className={`w-full px-3 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.nome ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Ex: Sedan Luxo 2023"
                      autoComplete="off"
                    />
                  </div>
                  {errors.nome && (
                    <p className="mt-1 text-sm text-red-500">{errors.nome}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="cor"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Cor
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="cor"
                      name="cor"
                      value={carData.cor}
                      onChange={handleInputChange}
                      className={`w-full px-3 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.cor ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Ex: Preto Metálico"
                    />
                  </div>
                  {errors.cor && (
                    <p className="mt-1 text-sm text-red-500">{errors.cor}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="estado"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Estado
                  </label>
                  <div className="relative">
                    <select
                      id="estado"
                      name="estado"
                      value={carData.estado}
                      onChange={handleInputChange}
                      className="w-full px-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                    >
                      <option value="disponivel">Disponível</option>
                      <option value="alugado">Alugado</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="precoAtual"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Preço por Dia (R$)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="precoAtual"
                      name="precoAtual"
                      value={carData.precoAtual}
                      onChange={handleInputChange}
                      className={`w-full px-3 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.precoAtual ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  {errors.precoAtual && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.precoAtual}
                    </p>
                  )}
                </div>

                <div>
                  <span className="block text-sm font-medium text-gray-700 mb-1">
                    Fotos do Carro
                  </span>
                  <ImageUrlManager
                    imageUrls={imageUrls}
                    setImageUrls={setImageUrls}
                  />
                  {errors.images && (
                    <p className="mt-1 text-sm text-red-500">{errors.images}</p>
                  )}
                </div>
              </div>

              <button
                onClick={handleSubmit}
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center justify-center gap-2"
              >
                Adicionar Carro
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { Upload, X, Plus } from 'lucide-react'

export function AdicionarCarro() {
  const [carData, setCarData] = useState({
    nome: '',
    cor: '',
    estado: 'disponivel',
    preco_atual: '',
  })

  const [images, setImages] = useState([])
  const [previewUrls, setPreviewUrls] = useState([])
  const [isDragging, setIsDragging] = useState(false)
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

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    handleFiles(files)
  }

  const handleFiles = (files) => {
    const newImages = [...images]
    const newPreviewUrls = [...previewUrls]

    files.forEach((file) => {
      if (file.type.startsWith('image/')) {
        newImages.push(file)
        newPreviewUrls.push(URL.createObjectURL(file))
      }
    })

    setImages(newImages)
    setPreviewUrls(newPreviewUrls)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const files = Array.from(e.dataTransfer.files)
    handleFiles(files)
  }

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index)
    const newPreviewUrls = previewUrls.filter((_, i) => i !== index)

    URL.revokeObjectURL(previewUrls[index])
    setImages(newImages)
    setPreviewUrls(newPreviewUrls)
  }

  const validateForm = () => {
    const newErrors = {}

    if (!carData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório'
    }

    if (!carData.cor.trim()) {
      newErrors.cor = 'Cor é obrigatória'
    }

    if (!carData.preco_atual || carData.preco_atual <= 0) {
      newErrors.preco_atual = 'Preço deve ser maior que zero'
    }

    if (images.length === 0) {
      newErrors.images = 'Adicione pelo menos uma imagem'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      // Aqui você implementaria a lógica para enviar os dados para o servidor
      console.log('Dados do carro:', carData)
      console.log('Imagens:', images)
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

            <form onSubmit={handleSubmit} className="space-y-6">
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
                    htmlFor="preco_atual"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Preço por Dia (R$)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="preco_atual"
                      name="preco_atual"
                      value={carData.preco_atual}
                      onChange={handleInputChange}
                      className={`w-full px-3 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.preco_atual
                          ? 'border-red-500'
                          : 'border-gray-300'
                      }`}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  {errors.preco_atual && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.preco_atual}
                    </p>
                  )}
                </div>

                <div>
                  <span className="block text-sm font-medium text-gray-700 mb-1">
                    Fotos do Carro
                  </span>
                  <div
                    className={`mt-2 border-2 border-dashed rounded-lg p-6 text-center ${
                      isDragging
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <input
                      type="file"
                      id="images"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                    <label htmlFor="images" className="cursor-pointer">
                      <div className="flex flex-col items-center gap-2">
                        <Upload className="w-8 h-8 text-gray-400" />
                        <span className="text-sm text-gray-500">
                          Arraste e solte as imagens aqui ou clique para
                          selecionar
                        </span>
                      </div>
                    </label>
                  </div>
                  {errors.images && (
                    <p className="mt-1 text-sm text-red-500">{errors.images}</p>
                  )}

                  {previewUrls.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                      {previewUrls.map((url, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={url}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      <label
                        htmlFor="images"
                        className="w-full h-32 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50"
                      >
                        <div className="flex flex-col items-center gap-2">
                          <Plus className="w-6 h-6 text-gray-400" />
                          <span className="text-sm text-gray-500">
                            Adicionar mais
                          </span>
                        </div>
                      </label>
                    </div>
                  )}
                </div>
              </div>

              <button
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

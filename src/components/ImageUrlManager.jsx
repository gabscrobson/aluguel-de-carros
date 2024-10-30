import React, { useState } from 'react'
import { X } from 'lucide-react'

export default function ImageUrlManager({ imageUrls, setImageUrls }) {
  const [newUrl, setNewUrl] = useState('')

  const addImageUrl = (e) => {
    e.preventDefault()
    if (newUrl.trim() !== '') {
      setImageUrls([...imageUrls, newUrl.trim()])
      setNewUrl('')
    }
  }

  const removeImageUrl = (index) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index))
  }

  return (
    <div>
      <div className="mb-4">
        <div className="flex">
          <input
            type="url"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            placeholder="Enter image URL"
            className="flex-grow p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button
            onClick={addImageUrl}
            className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Add
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {imageUrls.map((url, index) => (
          <div key={index} className="relative group">
            <img
              src={url}
              alt={`Image ${index + 1}`}
              className="w-full h-40 object-cover rounded"
              onError={(e) => {
                e.target.src =
                  'https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg'
              }}
            />
            <button
              onClick={() => removeImageUrl(index)}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-red-300"
              aria-label={`Remove image ${index + 1}`}
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>

      {imageUrls.length === 0 && (
        <p className="text-gray-500 text-center mt-2">
          Nenhuma imagem adicionada
        </p>
      )}
    </div>
  )
}

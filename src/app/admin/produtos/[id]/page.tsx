'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useAdminData } from '@/context/AdminDataContext'
import Toast from '@/components/admin/Toast'
import ConfirmModal from '@/components/admin/ConfirmModal'

export default function EditarProduto() {
  const router = useRouter()
  const params = useParams()
  const { getProductById, updateProduct, deleteProduct } = useAdminData()
  const [toast, setToast] = useState<{
    message: string
    type: 'success' | 'error'
  } | null>(null)
  const [showDelete, setShowDelete] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    category: 'Café',
    price: '',
    description: '',
    detailedDescription: '',
    stock: '',
    image: '',
    rating: '0',
    origin: '',
    weight: '',
  })
  const [imagePreview, setImagePreview] = useState('')

  const categories = [
    'Café',
    'Sementes',
    'Ração',
    'Adubos',
    'Ferramentas',
    'Defensivos',
  ]

  useEffect(() => {
    const product = getProductById(parseInt(params.id as string))
    if (product) {
      setFormData({
        name: product.name || '',
        category: product.category || 'Café',
        price: String(product.price || ''),
        description: product.description || '',
        detailedDescription: product.detailedDescription || '',
        stock: String(product.stock || ''),
        image: product.image || '',
        rating: String(product.rating || '0'),
        origin: product.origin || '',
        weight: product.weight || '',
      })
      setImagePreview(product.image || '')
    } else {
      setToast({ message: 'Produto não encontrado', type: 'error' })
      setTimeout(() => router.push('/admin/produtos'), 1500)
    }
  }, [params.id, getProductById, router])

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageURL = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value
    setFormData((prev) => ({ ...prev, image: url }))
    setImagePreview(url)
  }

  const handleImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setToast({ message: 'Imagem deve ter no máximo 5MB', type: 'error' })
        return
      }
      const reader = new FileReader()
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string
        setImagePreview(imageUrl)
        setFormData((prev) => ({ ...prev, image: imageUrl }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.price) {
      setToast({
        message: 'Preencha os campos obrigatórios',
        type: 'error',
      })
      return
    }

    updateProduct(parseInt(params.id as string), {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock) || 0,
      rating: parseFloat(formData.rating) || 0,
    })

    setToast({ message: 'Produto atualizado com sucesso!', type: 'success' })
    setTimeout(() => router.push('/admin/produtos'), 1000)
  }

  const handleDelete = () => {
    deleteProduct(parseInt(params.id as string))
    setShowDelete(false)
    setToast({ message: 'Produto deletado!', type: 'success' })
    setTimeout(() => router.push('/admin/produtos'), 1000)
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <button
          onClick={() => router.push('/admin/produtos')}
          className="mb-2 text-sm font-bold text-gray-500 hover:text-gray-700"
        >
          ← Voltar para Produtos
        </button>
        <h1 className="text-3xl font-bold text-gray-800">✏️ Editar Produto</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-xl bg-white p-6 shadow-sm md:p-8"
      >
        {/* Nome */}
        <div>
          <label className="mb-2 block text-sm font-bold text-gray-700">
            Nome *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Categoria + Preço */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Categoria
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Preço (R$) *
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              step="0.01"
              min="0"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Estoque + Rating */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Estoque
            </label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              min="0"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Rating (0-5)
            </label>
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              step="0.1"
              min="0"
              max="5"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Origem + Peso */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Origem
            </label>
            <input
              type="text"
              name="origin"
              value={formData.origin}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Peso/Quantidade
            </label>
            <input
              type="text"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Descrição Curta */}
        <div>
          <label className="mb-2 block text-sm font-bold text-gray-700">
            Descrição Curta
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Descrição Detalhada */}
        <div>
          <label className="mb-2 block text-sm font-bold text-gray-700">
            Descrição Detalhada
          </label>
          <textarea
            name="detailedDescription"
            value={formData.detailedDescription}
            onChange={handleChange}
            rows={5}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Imagem */}
        <div>
          <label className="mb-2 block text-sm font-bold text-gray-700">
            Imagem
          </label>
          <input
            type="text"
            value={formData.image.startsWith('data:') ? '' : formData.image}
            onChange={handleImageURL}
            placeholder="URL da imagem"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <div className="my-2 text-center text-sm text-gray-400">ou</div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageFile}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm"
          />
          {imagePreview && (
            <div className="mt-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imagePreview}
                alt="Preview"
                className="max-h-48 rounded-lg border object-cover"
              />
            </div>
          )}
        </div>

        {/* Botões */}
        <div className="flex gap-4 border-t pt-6">
          <button
            type="submit"
            className="flex-1 rounded-lg bg-primary py-3 font-bold text-white transition-colors hover:bg-secondary"
          >
            💾 Salvar Alterações
          </button>
          <button
            type="button"
            onClick={() => setShowDelete(true)}
            className="rounded-lg bg-red-100 px-6 py-3 font-bold text-red-600 transition-colors hover:bg-red-200"
          >
            🗑️ Deletar
          </button>
        </div>
      </form>

      {showDelete && (
        <ConfirmModal
          title="Deletar Produto"
          message="Tem certeza? Esta ação não pode ser desfeita."
          confirmLabel="Deletar"
          onConfirm={handleDelete}
          onCancel={() => setShowDelete(false)}
          variant="danger"
        />
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  )
}

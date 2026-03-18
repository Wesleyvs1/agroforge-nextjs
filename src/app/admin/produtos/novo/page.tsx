'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAdminData } from '@/context/AdminDataContext'
import Toast from '@/components/admin/Toast'
import MediaPicker from '@/components/admin/MediaPicker'
import { ArrowLeft, Save, Upload, ImageIcon } from 'lucide-react'

export default function NovoProduto() {
  const router = useRouter()
  const { addProduct } = useAdminData()
  const [toast, setToast] = useState<{
    message: string
    type: 'success' | 'error'
  } | null>(null)
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
  const [showMediaPicker, setShowMediaPicker] = useState(false)

  const categories = [
    'Café',
    'Sementes',
    'Ração',
    'Adubos',
    'Ferramentas',
    'Defensivos',
  ]

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
        message: 'Preencha os campos obrigatórios (Nome e Preço)',
        type: 'error',
      })
      return
    }

    if (!formData.image) {
      setToast({
        message: 'Adicione uma imagem ao produto',
        type: 'error',
      })
      return
    }

    addProduct({
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock) || 0,
      rating: parseFloat(formData.rating) || 0,
    })

    setToast({ message: 'Produto criado com sucesso!', type: 'success' })
    setTimeout(() => router.push('/admin/produtos'), 1000)
  }

  const inputClass =
    'w-full rounded-lg border border-stone-200/60 bg-stone-50/50 px-4 py-2.5 text-[13px] text-stone-700 placeholder:text-stone-400 focus:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/10'

  return (
    <div className="max-w-2xl space-y-6">
      {/* Header */}
      <div>
        <button
          onClick={() => router.push('/admin/produtos')}
          className="mb-3 flex items-center gap-1.5 text-[12px] font-semibold text-stone-400 transition-colors hover:text-stone-600"
        >
          <ArrowLeft size={14} />
          Voltar para Produtos
        </button>
        <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-stone-400">
          Catálogo
        </p>
        <h1 className="mt-1 font-heading text-3xl font-bold tracking-tight text-stone-900">
          Novo Produto
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-xl border border-stone-200/60 bg-white p-6 md:p-8"
      >
        {/* Name */}
        <div>
          <label className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-stone-400">
            Nome *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nome do produto"
            required
            className={inputClass}
          />
        </div>

        {/* Category + Price */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-stone-400">
              Categoria *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={inputClass}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-stone-400">
              Preço (R$) *
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="99.99"
              step="0.01"
              min="0"
              required
              className={inputClass}
            />
          </div>
        </div>

        {/* Stock + Rating */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-stone-400">
              Estoque
            </label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="0"
              min="0"
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-stone-400">
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
              className={inputClass}
            />
          </div>
        </div>

        {/* Origin + Weight */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-stone-400">
              Origem
            </label>
            <input
              type="text"
              name="origin"
              value={formData.origin}
              onChange={handleChange}
              placeholder="Ex: Minas Gerais"
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-stone-400">
              Peso/Quantidade
            </label>
            <input
              type="text"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              placeholder="Ex: 25kg"
              className={inputClass}
            />
          </div>
        </div>

        {/* Short Description */}
        <div>
          <label className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-stone-400">
            Descrição Curta
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Descrição breve do produto"
            rows={3}
            className={inputClass}
          />
        </div>

        {/* Detailed Description */}
        <div>
          <label className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-stone-400">
            Descrição Detalhada
          </label>
          <textarea
            name="detailedDescription"
            value={formData.detailedDescription}
            onChange={handleChange}
            placeholder="Descrição completa do produto"
            rows={5}
            className={inputClass}
          />
        </div>

        {/* Image */}
        <div>
          <label className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-stone-400">
            Imagem *
          </label>
          <div className="space-y-3">
            {/* Media Library button */}
            <button
              type="button"
              onClick={() => setShowMediaPicker(true)}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-[12px] font-semibold text-primary transition-colors hover:bg-primary/10"
            >
              <ImageIcon size={16} />
              Escolher da Biblioteca
            </button>
            <div className="text-center text-[11px] font-semibold uppercase tracking-wider text-stone-300">
              ou cole uma URL
            </div>
            <input
              type="text"
              value={formData.image.startsWith('data:') ? '' : formData.image}
              onChange={handleImageURL}
              placeholder="URL da imagem (Unsplash, etc)"
              className={inputClass}
            />
            <div className="text-center text-[11px] font-semibold uppercase tracking-wider text-stone-300">
              ou faça upload
            </div>
            <div
              className="cursor-pointer rounded-lg border-2 border-dashed border-stone-200 px-4 py-3 text-center transition-colors hover:border-stone-300"
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              <Upload size={16} className="mx-auto mb-1 text-stone-400" />
              <p className="text-[12px] text-stone-400">
                Clique para fazer upload
              </p>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleImageFile}
                className="hidden"
              />
            </div>
          </div>
          {imagePreview && (
            <div className="mt-4">
              <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-stone-400">
                Preview
              </p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imagePreview}
                alt="Preview"
                className="max-h-48 rounded-xl border border-stone-200/60 object-cover"
              />
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 border-t border-stone-100 pt-6">
          <button
            type="submit"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary py-3 text-[13px] font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            <Save size={16} />
            Salvar Produto
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin/produtos')}
            className="flex-1 rounded-xl border border-stone-200/60 py-3 text-[13px] font-semibold text-stone-600 transition-colors hover:bg-stone-50"
          >
            Cancelar
          </button>
        </div>
      </form>

      <MediaPicker
        isOpen={showMediaPicker}
        onClose={() => setShowMediaPicker(false)}
        onSelect={(url) => {
          setFormData((prev) => ({ ...prev, image: url }))
          setImagePreview(url)
          setShowMediaPicker(false)
        }}
      />

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

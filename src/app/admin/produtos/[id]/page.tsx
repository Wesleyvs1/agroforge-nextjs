'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useAdminData } from '@/context/AdminDataContext'
import Toast from '@/components/admin/Toast'
import ConfirmModal from '@/components/admin/ConfirmModal'
import MediaPicker from '@/components/admin/MediaPicker'
import { uploadImageToStorage } from '@/lib/uploadImage'
import { ArrowLeft, Save, Trash2, Upload, ImageIcon, Loader2 } from 'lucide-react'

export default function EditarProduto() {
  const router = useRouter()
  const params = useParams()
  const { getProductById, updateProduct, deleteProduct } = useAdminData()
  const [toast, setToast] = useState<{
    message: string
    type: 'success' | 'error'
  } | null>(null)
  const [showDelete, setShowDelete] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
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
  const dataLoaded = useRef(false)

  const categories = [
    'Café',
    'Sementes',
    'Ração',
    'Adubos',
    'Ferramentas',
    'Defensivos',
  ]

  useEffect(() => {
    // Only load data once to avoid overwriting user edits when context re-renders
    if (dataLoaded.current) return

    const product = getProductById(parseInt(params.id as string))
    if (product) {
      dataLoaded.current = true
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
    }
    // Products might still be loading; don't show error until products have loaded
  }, [params.id, getProductById])

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

  const handleImageFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      setToast({ message: 'Imagem deve ter no máximo 5MB', type: 'error' })
      return
    }

    // Show preview immediately with local URL
    const localPreview = URL.createObjectURL(file)
    setImagePreview(localPreview)

    // Upload to Supabase Storage
    setIsSaving(true)
    const publicUrl = await uploadImageToStorage(file, 'produtos')
    setIsSaving(false)

    setFormData((prev) => ({ ...prev, image: publicUrl }))
    setImagePreview(publicUrl)
    URL.revokeObjectURL(localPreview)

    if (!publicUrl.startsWith('data:') && !publicUrl.startsWith('blob:')) {
      setToast({ message: 'Imagem enviada para o servidor!', type: 'success' })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.price) {
      setToast({
        message: 'Preencha os campos obrigatórios',
        type: 'error',
      })
      return
    }

    setIsSaving(true)

    try {
      // If image is still a data:URL, upload first
      let finalImage = formData.image
      if (finalImage.startsWith('data:')) {
        finalImage = await uploadImageToStorage(finalImage, 'produtos')
      }

      const result = await updateProduct(parseInt(params.id as string), {
        ...formData,
        image: finalImage,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock) || 0,
        rating: parseFloat(formData.rating) || 0,
      })

      if (result === false) {
        setIsSaving(false)
        setToast({ message: 'Erro ao salvar no banco de dados. Verifique o console.', type: 'error' })
        return
      }

      setIsSaving(false)
      setToast({ message: 'Produto atualizado com sucesso!', type: 'success' })
      setTimeout(() => router.push('/admin/produtos'), 1000)
    } catch (err) {
      console.error('Erro ao salvar produto:', err)
      setIsSaving(false)
      setToast({ message: 'Erro inesperado ao salvar.', type: 'error' })
    }
  }

  const handleDelete = () => {
    deleteProduct(parseInt(params.id as string))
    setShowDelete(false)
    setToast({ message: 'Produto deletado!', type: 'success' })
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
          Editar Produto
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
            required
            className={inputClass}
          />
        </div>

        {/* Category + Price */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-stone-400">
              Categoria
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
            rows={5}
            className={inputClass}
          />
        </div>

        {/* Image */}
        <div>
          <label className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-stone-400">
            Imagem
          </label>
          {/* Media Library button */}
          <button
            type="button"
            onClick={() => setShowMediaPicker(true)}
            className="mb-3 flex w-full items-center justify-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-[12px] font-semibold text-primary transition-colors hover:bg-primary/10"
          >
            <ImageIcon size={16} />
            Escolher da Biblioteca
          </button>
          <input
            type="text"
            value={formData.image.startsWith('data:') ? '' : formData.image}
            onChange={handleImageURL}
            placeholder="URL da imagem"
            className={inputClass}
          />
          <div className="my-2 text-center text-[11px] font-semibold uppercase tracking-wider text-stone-300">
            ou
          </div>
          <div
            className="cursor-pointer rounded-lg border-2 border-dashed border-stone-200 px-4 py-3 text-center transition-colors hover:border-stone-300"
            onClick={() => document.getElementById('file-upload-edit')?.click()}
          >
            <Upload size={16} className="mx-auto mb-1 text-stone-400" />
            <p className="text-[12px] text-stone-400">
              Clique para fazer upload
            </p>
            <p className="text-[10px] text-stone-300">
              A imagem será salva no servidor automaticamente
            </p>
            <input
              id="file-upload-edit"
              type="file"
              accept="image/*"
              onChange={handleImageFile}
              className="hidden"
            />
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
              {formData.image.startsWith('data:') && (
                <p className="mt-1 text-[10px] text-amber-500">
                  ⚠ Imagem temporária (base64). Será enviada ao servidor ao salvar.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 border-t border-stone-100 pt-6">
          <button
            type="submit"
            disabled={isSaving}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary py-3 text-[13px] font-semibold text-white transition-colors hover:bg-primary-dark disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <Save size={16} />
                Salvar Alterações
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => setShowDelete(true)}
            className="flex items-center gap-2 rounded-xl border border-red-200/60 px-5 py-3 text-[13px] font-semibold text-red-500 transition-colors hover:bg-red-50"
          >
            <Trash2 size={16} />
            Deletar
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

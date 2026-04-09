'use client'

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'
import { supabase } from '@/lib/supabase'

/* eslint-disable @typescript-eslint/no-explicit-any */

interface AdminDataContextType {
  products: any[]
  blogPosts: any[]
  suppliers: any[]
  loading: boolean
  addProduct: (product: any) => Promise<any>
  updateProduct: (id: number, product: any) => Promise<boolean>
  deleteProduct: (id: number) => Promise<void>
  getProductById: (id: number) => any
  addBlogPost: (post: any) => Promise<any>
  updateBlogPost: (id: number, post: any) => Promise<void>
  deleteBlogPost: (id: number) => Promise<void>
  addSupplier: (supplier: any) => Promise<any>
  updateSupplier: (id: number, supplier: any) => Promise<void>
  deleteSupplier: (id: number) => Promise<void>
}

const AdminDataContext = createContext<AdminDataContextType | undefined>(
  undefined,
)

export function AdminDataProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<any[]>([])
  const [blogPosts, setBlogPosts] = useState<any[]>([])
  const [suppliers, setSuppliers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Memoizar funções para evitar re-renders
  const getProductById = useCallback((id: number) => {
    return products.find((p: any) => p.id === id) || null
  }, [products])

  // Carregar dados iniciais do Supabase
  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      
      const { data: prodData } = await supabase.from('produtos').select('*').order('id', { ascending: false })
      const { data: blogData } = await supabase.from('blog_posts').select('*').order('id', { ascending: false })
      const { data: supData } = await supabase.from('fornecedores').select('*').order('id', { ascending: false })

      if (prodData) {
        // Corrige o camelCase que o Postgres perde se criado sem aspas
        const mappedProd = prodData.map((p) => ({
          ...p,
          mainCategory: p.maincategory || p.mainCategory,
          detailedDescription: p.detaileddescription || p.detailedDescription,
          image: p.image || 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=500&h=500&fit=crop'
        }))
        setProducts(mappedProd)
      }
      if (blogData) {
        const mappedBlog = blogData.map((b) => ({
          ...b,
          image: b.image_url || 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&h=400&fit=crop',
          date: b.created_at || new Date().toISOString(),
          excerpt: b.abstract || b.excerpt || ''
        }))
        setBlogPosts(mappedBlog)
      }
      if (supData) setSuppliers(supData)
      
      setLoading(false)
    }

    fetchData()
  }, [])

  // --- PRODUTOS ---
  const addProduct = async (product: any) => {
    // Build payload with only known DB columns
    const dbPayload: Record<string, any> = {}
    
    if (product.name !== undefined) dbPayload.name = product.name
    if (product.category !== undefined) dbPayload.category = product.category
    if (product.price !== undefined) dbPayload.price = product.price
    if (product.image !== undefined) dbPayload.image = product.image
    if (product.description !== undefined) dbPayload.description = product.description
    if (product.stock !== undefined) dbPayload.stock = product.stock
    if (product.rating !== undefined) dbPayload.rating = String(product.rating)
    if (product.origin !== undefined) dbPayload.origin = product.origin
    if (product.weight !== undefined) dbPayload.weight = product.weight
    if (product.reviews !== undefined) dbPayload.reviews = product.reviews
    
    // camelCase → lowercase for Postgres
    if (product.mainCategory !== undefined) dbPayload.maincategory = product.mainCategory
    if (product.detailedDescription !== undefined) dbPayload.detaileddescription = product.detailedDescription

    console.log('[addProduct] Inserting:', dbPayload)

    const { data, error } = await supabase.from('produtos').insert([dbPayload]).select().single()
    if (error) {
      console.error('[addProduct] Supabase error:', error.message, error.details, error.hint)
      return null
    }
    const finalData = { ...data, mainCategory: data.maincategory, detailedDescription: data.detaileddescription }
    setProducts((prev) => [finalData, ...prev])
    return finalData
  }

  const updateProduct = async (id: number, updatedProduct: any): Promise<boolean> => {
    // Build payload with only known DB columns (Postgres lowercases all unquoted identifiers)
    const dbPayload: Record<string, any> = {}
    
    if (updatedProduct.name !== undefined) dbPayload.name = updatedProduct.name
    if (updatedProduct.category !== undefined) dbPayload.category = updatedProduct.category
    if (updatedProduct.price !== undefined) dbPayload.price = updatedProduct.price
    if (updatedProduct.image !== undefined) dbPayload.image = updatedProduct.image
    if (updatedProduct.description !== undefined) dbPayload.description = updatedProduct.description
    if (updatedProduct.stock !== undefined) dbPayload.stock = updatedProduct.stock
    if (updatedProduct.rating !== undefined) dbPayload.rating = String(updatedProduct.rating)
    if (updatedProduct.origin !== undefined) dbPayload.origin = updatedProduct.origin
    if (updatedProduct.weight !== undefined) dbPayload.weight = updatedProduct.weight
    if (updatedProduct.reviews !== undefined) dbPayload.reviews = updatedProduct.reviews
    
    // camelCase → lowercase for Postgres
    if (updatedProduct.mainCategory !== undefined) dbPayload.maincategory = updatedProduct.mainCategory
    if (updatedProduct.detailedDescription !== undefined) dbPayload.detaileddescription = updatedProduct.detailedDescription

    console.log('[updateProduct] Saving to DB, id:', id, 'payload:', dbPayload)

    const { error } = await supabase.from('produtos').update(dbPayload).eq('id', id)
    if (error) {
      console.error('[updateProduct] Supabase error:', error.message, error.details, error.hint)
      return false
    }
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updatedProduct } : p)))
    return true
  }

  const deleteProduct = async (id: number) => {
    const { error } = await supabase.from('produtos').delete().eq('id', id)
    if (error) {
      console.error('Erro ao deletar:', error)
      return
    }
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }

  // --- BLOG POSTS ---
  const addBlogPost = async (post: any) => {
    const payload = { ...post };
    if (payload.image !== undefined) { payload.image_url = payload.image; delete payload.image; }
    if (payload.excerpt !== undefined) { payload.abstract = payload.excerpt; delete payload.excerpt; }
    if (payload.date !== undefined) { delete payload.date; } // date it's mapped to created_at generally on DB insert

    const { data, error } = await supabase.from('blog_posts').insert([payload]).select().single()
    if (error) {
      console.error('Erro ao adicionar:', error)
      return null
    }
    const finalData = { ...data, image: data.image_url, excerpt: data.abstract, date: data.created_at }
    setBlogPosts((prev) => [finalData, ...prev])
    return finalData
  }

  const updateBlogPost = async (id: number, updatedPost: any) => {
    const payload = { ...updatedPost };
    if (payload.image !== undefined) { payload.image_url = payload.image; delete payload.image; }
    if (payload.excerpt !== undefined) { payload.abstract = payload.excerpt; delete payload.excerpt; }
    if (payload.date !== undefined) { delete payload.date; }

    const { error } = await supabase.from('blog_posts').update(payload).eq('id', id)
    if (error) {
      console.error('Erro ao editar:', error)
      return
    }
    setBlogPosts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updatedPost, image: payload.image_url || p.image, excerpt: payload.abstract || p.excerpt } : p)))
  }

  const deleteBlogPost = async (id: number) => {
    const { error } = await supabase.from('blog_posts').delete().eq('id', id)
    if (error) {
      console.error('Erro ao deletar:', error)
      return
    }
    setBlogPosts((prev) => prev.filter((p) => p.id !== id))
  }

  // --- FORNECEDORES ---
  const addSupplier = async (supplier: any) => {
    const { data, error } = await supabase.from('fornecedores').insert([supplier]).select().single()
    if (error) {
      console.error('Erro ao adicionar:', error)
      return null
    }
    setSuppliers((prev) => [data, ...prev])
    return data
  }

  const updateSupplier = async (id: number, updatedSupplier: any) => {
    const { error } = await supabase.from('fornecedores').update(updatedSupplier).eq('id', id)
    if (error) {
      console.error('Erro ao editar:', error)
      return
    }
    setSuppliers((prev) => prev.map((p) => (p.id === id ? { ...p, ...updatedSupplier } : p)))
  }

  const deleteSupplier = async (id: number) => {
    const { error } = await supabase.from('fornecedores').delete().eq('id', id)
    if (error) {
      console.error('Erro ao deletar:', error)
      return
    }
    setSuppliers((prev) => prev.filter((p) => p.id !== id))
  }

  // Memoizar o valor do contexto para evitar re-renders desnecessários
  const contextValue = useMemo(() => ({
    products,
    blogPosts,
    suppliers,
    loading,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    addBlogPost,
    updateBlogPost,
    deleteBlogPost,
    addSupplier,
    updateSupplier,
    deleteSupplier,
  }), [products, blogPosts, suppliers, loading, getProductById, addProduct, updateProduct, deleteProduct, addBlogPost, updateBlogPost, deleteBlogPost, addSupplier, updateSupplier, deleteSupplier])

  return (
    <AdminDataContext.Provider value={contextValue}>
      {children}
    </AdminDataContext.Provider>
  )
}

export function useAdminData() {
  const context = useContext(AdminDataContext)
  if (!context) {
    throw new Error('useAdminData deve ser usado dentro de AdminDataProvider')
  }
  return context
}

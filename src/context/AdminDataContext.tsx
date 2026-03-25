'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import {
  products as initialProducts,
  blogPosts as initialBlogPosts,
  suppliers as initialSuppliers,
} from '@/data/products'

/* eslint-disable @typescript-eslint/no-explicit-any */

interface AdminDataContextType {
  products: any[]
  blogPosts: any[]
  suppliers: any[]
  addProduct: (product: any) => any
  updateProduct: (id: number, product: any) => void
  deleteProduct: (id: number) => void
  getProductById: (id: number) => any
  addBlogPost: (post: any) => any
  updateBlogPost: (id: number, post: any) => void
  deleteBlogPost: (id: number) => void
  addSupplier: (supplier: any) => any
  updateSupplier: (id: number, supplier: any) => void
  deleteSupplier: (id: number) => void
}

const AdminDataContext = createContext<AdminDataContextType | undefined>(
  undefined,
)

export function AdminDataProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState(initialProducts)
  const [blogPosts, setBlogPosts] = useState(initialBlogPosts)
  const [suppliers, setSuppliers] = useState(initialSuppliers)

  // Versão dos dados padrão - incrementar quando os dados iniciais mudarem
  const DATA_VERSION = '3'

  // Carregar dados do localStorage
  useEffect(() => {
    const savedVersion = localStorage.getItem('agroforge_data_version')

    // Se a versão mudou, descartar dados antigos e usar os novos padrões
    if (savedVersion !== DATA_VERSION) {
      localStorage.removeItem('agroforge_products')
      localStorage.removeItem('agroforge_blogposts')
      localStorage.removeItem('agroforge_suppliers')
      localStorage.setItem('agroforge_data_version', DATA_VERSION)
      return
    }

    const savedProducts = localStorage.getItem('agroforge_products')
    const savedBlogPosts = localStorage.getItem('agroforge_blogposts')
    const savedSuppliers = localStorage.getItem('agroforge_suppliers')

    if (savedProducts) {
      try {
        setProducts(JSON.parse(savedProducts))
      } catch (e) {
        console.error('Erro ao carregar produtos:', e)
      }
    }
    if (savedBlogPosts) {
      try {
        setBlogPosts(JSON.parse(savedBlogPosts))
      } catch (e) {
        console.error('Erro ao carregar blog posts:', e)
      }
    }
    if (savedSuppliers) {
      try {
        setSuppliers(JSON.parse(savedSuppliers))
      } catch (e) {
        console.error('Erro ao carregar fornecedores:', e)
      }
    }
  }, [])

  // Salvar no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('agroforge_products', JSON.stringify(products))
  }, [products])

  useEffect(() => {
    localStorage.setItem('agroforge_blogposts', JSON.stringify(blogPosts))
  }, [blogPosts])

  useEffect(() => {
    localStorage.setItem('agroforge_suppliers', JSON.stringify(suppliers))
  }, [suppliers])

  // --- PRODUTOS ---
  const addProduct = (product: any) => {
    const newProduct = {
      ...product,
      id: Math.max(...products.map((p: any) => p.id), 0) + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setProducts([...products, newProduct])
    return newProduct
  }

  const updateProduct = (id: number, updatedProduct: any) => {
    setProducts(
      products.map((p: any) =>
        p.id === id
          ? { ...p, ...updatedProduct, updatedAt: new Date().toISOString() }
          : p,
      ),
    )
  }

  const deleteProduct = (id: number) => {
    setProducts(products.filter((p: any) => p.id !== id))
  }

  const getProductById = (id: number) => {
    return products.find((p: any) => p.id === id)
  }

  // --- BLOG POSTS ---
  const addBlogPost = (post: any) => {
    const newPost = {
      ...post,
      id: Math.max(...blogPosts.map((p: any) => p.id), 0) + 1,
      createdAt: new Date().toISOString(),
    }
    setBlogPosts([...blogPosts, newPost])
    return newPost
  }

  const updateBlogPost = (id: number, updatedPost: any) => {
    setBlogPosts(
      blogPosts.map((p: any) => (p.id === id ? { ...p, ...updatedPost } : p)),
    )
  }

  const deleteBlogPost = (id: number) => {
    setBlogPosts(blogPosts.filter((p: any) => p.id !== id))
  }

  // --- FORNECEDORES ---
  const addSupplier = (supplier: any) => {
    const newSupplier = {
      ...supplier,
      id: Math.max(...suppliers.map((s: any) => s.id), 0) + 1,
      createdAt: new Date().toISOString(),
    }
    setSuppliers([...suppliers, newSupplier])
    return newSupplier
  }

  const updateSupplier = (id: number, updatedSupplier: any) => {
    setSuppliers(
      suppliers.map((s: any) =>
        s.id === id ? { ...s, ...updatedSupplier } : s,
      ),
    )
  }

  const deleteSupplier = (id: number) => {
    setSuppliers(suppliers.filter((s: any) => s.id !== id))
  }

  return (
    <AdminDataContext.Provider
      value={{
        products,
        blogPosts,
        suppliers,
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
      }}
    >
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

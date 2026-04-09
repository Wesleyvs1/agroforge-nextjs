'use client'

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])

  // Carregar carrinho do localStorage (apenas uma vez no mount)
  useEffect(() => {
    const savedCart = localStorage.getItem('agroforge-cart')
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (e) {
        console.error('Erro ao carregar carrinho:', e)
      }
    }
  }, [])

  // Salvar carrinho no localStorage (debounce para evitar writes excessivos)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem('agroforge-cart', JSON.stringify(cart))
    }, 300)
    return () => clearTimeout(timeoutId)
  }, [cart])

  const addToCart = useCallback((product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id)

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        )
      }

      return [...prevCart, { ...product, quantity }]
    })
  }, [])

  const removeFromCart = useCallback((productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId))
  }, [])

  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity <= 0) {
      setCart((prevCart) => prevCart.filter((item) => item.id !== productId))
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === productId ? { ...item, quantity } : item,
        ),
      )
    }
  }, [])

  const clearCart = useCallback(() => {
    setCart([])
  }, [])

  const getTotalPrice = useCallback(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }, [cart])

  const getTotalItems = useCallback(() => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }, [cart])

  // Memoizar o valor do contexto
  const contextValue = useMemo(() => ({
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
  }), [cart, addToCart, removeFromCart, updateQuantity, clearCart, getTotalPrice, getTotalItems])

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart deve ser usado dentro de CartProvider')
  }
  return context
}

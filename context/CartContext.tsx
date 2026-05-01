"use client"

import * as React from "react"
import { Product } from "@/types/product"
import { toast } from "sonner"

interface CartItem extends Product {
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addItem: (product: Product) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, delta: number) => void
  total: number
  itemCount: number
  isRegulatedInCart: boolean
}

const CartContext = React.createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<CartItem[]>([])

  const addItem = (product: Product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id)
      if (existing) {
        return prev.map((i) => (i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i))
      }
      return [...prev, { ...product, quantity: 1 }]
    })

    window.dispatchEvent(new CustomEvent("cart:open"))
    toast.success("Dodano u košaricu", {
      description: product.name,
    })
  }

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((i) => {
        if (i.id === id) {
          const newQty = Math.max(1, i.quantity + delta)
          return { ...i, quantity: newQty }
        }
        return i
      })
    )
  }

  const total = items.reduce((acc, item) => acc + (item.salePrice || item.price) * item.quantity, 0)
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0)
  const isRegulatedInCart = items.some((item) => item.isRegulated)

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, total, itemCount, isRegulatedInCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = React.useContext(CartContext)
  if (!context) throw new Error("useCart must be used within a CartProvider")
  return context
}

import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)
const CART_KEY = 'bookease_cart'

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => { try { return JSON.parse(localStorage.getItem(CART_KEY)) || [] } catch { return [] } })
  useEffect(() => localStorage.setItem(CART_KEY, JSON.stringify(cartItems)), [cartItems])
  const addToCart = (service, quantity = 1) => setCartItems((items) => items.some((item) => item.id === service.id) ? items : [...items, { ...service, quantity }])
  const updateQuantity = (id, quantity) => setCartItems((items) => items.map((item) => item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item))
  const removeFromCart = (id) => setCartItems((items) => items.filter((item) => item.id !== id))
  const clearCart = () => setCartItems([])
  const value = useMemo(() => ({ cartItems, addToCart, updateQuantity, removeFromCart, clearCart, itemCount: cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0) }), [cartItems])
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
export const useCart = () => { const context = useContext(CartContext); if (!context) throw new Error('useCart must be used within a CartProvider'); return context }

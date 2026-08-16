import { createContext, useContext, useMemo, useState, useCallback } from 'react'

const StoreContext = createContext(null)

export function StoreProvider({ children }) {
  const [cart, setCart] = useState([]) // [{ product, qty }]
  const [wishlist, setWishlist] = useState([]) // [productId]
  const [cartOpen, setCartOpen] = useState(false)
  const [toast, setToast] = useState(null)

  const showToast = useCallback((msg) => {
    setToast(msg)
    window.clearTimeout(showToast._t)
    showToast._t = window.setTimeout(() => setToast(null), 2200)
  }, [])

  const addToCart = useCallback(
    (product) => {
      setCart((prev) => {
        const existing = prev.find((row) => row.product.id === product.id)
        if (existing) {
          return prev.map((row) =>
            row.product.id === product.id ? { ...row, qty: row.qty + 1 } : row
          )
        }
        return [...prev, { product, qty: 1 }]
      })
      showToast(`Added "${product.name}" to cart`)
    },
    [showToast]
  )

  const updateQty = useCallback((productId, delta) => {
    setCart((prev) =>
      prev
        .map((row) =>
          row.product.id === productId ? { ...row, qty: row.qty + delta } : row
        )
        .filter((row) => row.qty > 0)
    )
  }, [])

  const removeFromCart = useCallback((productId) => {
    setCart((prev) => prev.filter((row) => row.product.id !== productId))
  }, [])

  const toggleWishlist = useCallback(
    (product) => {
      setWishlist((prev) => {
        const has = prev.includes(product.id)
        showToast(has ? 'Removed from wishlist' : 'Added to wishlist')
        return has ? prev.filter((id) => id !== product.id) : [...prev, product.id]
      })
    },
    [showToast]
  )

  const cartCount = useMemo(() => cart.reduce((sum, row) => sum + row.qty, 0), [cart])
  const cartTotal = useMemo(
    () => cart.reduce((sum, row) => sum + row.qty * row.product.price, 0),
    [cart]
  )

  const value = {
    cart, cartCount, cartTotal, cartOpen, setCartOpen,
    addToCart, updateQty, removeFromCart,
    wishlist, toggleWishlist,
    toast,
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used inside <StoreProvider>')
  return ctx
}

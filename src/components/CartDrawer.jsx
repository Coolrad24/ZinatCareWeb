import { useStore } from '../context/StoreContext.jsx'
import { imageProps } from '../data/products.js'

const fmt = (n) => `$ ${n.toFixed(2)}`

export default function CartDrawer() {
  const { cart, cartOpen, setCartOpen, updateQty, removeFromCart, cartTotal } = useStore()

  if (!cartOpen) return null

  return (
    <>
      <div className="drawer-backdrop" onClick={() => setCartOpen(false)} />
      <aside className="cart-drawer" role="dialog" aria-label="Shopping cart">
        <div className="drawer-head">
          <h3>Your cart</h3>
          <button className="drawer-close" onClick={() => setCartOpen(false)} aria-label="Close cart">
            ×
          </button>
        </div>

        <div className="drawer-items">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty.</p>
              <p>Add a product from the shop to begin your ritual.</p>
            </div>
          ) : (
            cart.map(({ product, qty }) => (
              <div className="cart-row" key={product.id}>
                <img {...imageProps(product, product.name)} />
                <div>
                  <h4>{product.name}</h4>
                  <div className="qty-controls">
                    <button onClick={() => updateQty(product.id, -1)} aria-label="Decrease quantity">−</button>
                    <span>{qty}</span>
                    <button onClick={() => updateQty(product.id, +1)} aria-label="Increase quantity">+</button>
                  </div>
                  <button className="remove-link" onClick={() => removeFromCart(product.id)}>
                    Remove
                  </button>
                </div>
                <span className="line-price">{fmt(product.price * qty)}</span>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="drawer-foot">
            <div className="subtotal-row">
              <span>Subtotal</span>
              <strong>{fmt(cartTotal)}</strong>
            </div>
            <button
              className="btn btn-primary checkout-btn"
              onClick={() => alert('Demo build — connect this button to your payment provider (Stripe, PayPal, etc).')}
            >
              Checkout
            </button>
          </div>
        )}
      </aside>
    </>
  )
}

import { useState } from 'react'
import { useStore } from '../context/StoreContext.jsx'
import { imageProps } from '../data/products.js'

const fmt = (n) => `$ ${n.toFixed(2)}`

export default function ProductCard({ product }) {
  const { addToCart, wishlist, toggleWishlist } = useStore()
  const [justAdded, setJustAdded] = useState(false)
  const wished = wishlist.includes(product.id)

  const handleAdd = () => {
    addToCart(product)
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1200)
  }

  return (
    <article className="product-card">
      <div className="product-image">
        <img {...imageProps(product, product.name)} loading="lazy" />
        <button
          className={`wishlist-btn ${wished ? 'active' : ''}`}
          onClick={() => toggleWishlist(product)}
          aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          {wished ? '♥' : '♡'}
        </button>
      </div>
      <div className="product-body">
        <h3>{product.name}</h3>
        <p className="desc">{product.description}</p>
        <div className="product-footer">
          <span className="price">{fmt(product.price)}</span>
          <button className={`add-btn ${justAdded ? 'added' : ''}`} onClick={handleAdd}>
            {justAdded ? 'Added ✓' : 'Add to cart'}
          </button>
        </div>
      </div>
    </article>
  )
}

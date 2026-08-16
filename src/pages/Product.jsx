import { useState, useEffect } from 'react'
import { Link } from '../router.jsx'
import {
  products,
  imageProps,
  getProductBySlug,
  categoryLabel,
} from '../data/products.js'
import ProductCard from '../components/ProductCard.jsx'
import { useStore } from '../context/StoreContext.jsx'

const fmt = (n) => `$ ${n.toFixed(2)}`

// Ritual guidance per category — mirrors the 4-step ritual on the home page.
const howToUse = {
  face: [
    'Cleanse the face and pat dry before applying.',
    'Warm a small amount between the fingertips.',
    'Massage gently over face and neck, avoiding the eye contour.',
  ],
  body: [
    'Apply to clean, slightly damp skin.',
    'Massage in circular motions until fully absorbed.',
    'Use morning or evening — ideally after the shower.',
  ],
}

export default function Product({ slug }) {
  const product = getProductBySlug(slug)
  const { addToCart, wishlist, toggleWishlist } = useStore()
  const [qty, setQty] = useState(1)

  // reset the quantity when navigating between product pages
  useEffect(() => setQty(1), [slug])

  if (!product) {
    return (
      <section className="section">
        <div className="container empty-cart">
          <p>We couldn't find that product.</p>
          <Link to="/shop" className="btn btn-primary">Back to the shop</Link>
        </div>
      </section>
    )
  }

  const wished = wishlist.includes(product.id)
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return (
    <>
      <section className="product-detail">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link to="/shop">Shop</Link>
            <span aria-hidden="true">/</span>
            <Link to={`/shop?cat=${product.category}`}>
              {categoryLabel(product.category)}
            </Link>
            <span aria-hidden="true">/</span>
            <span className="current">{product.name}</span>
          </nav>

          <div className="detail-grid">
            <div className="detail-media">
              <img {...imageProps(product, product.name)} />
            </div>

            <div className="detail-copy">
              <p className="eyebrow">{categoryLabel(product.category)} care</p>
              <h1>{product.name}</h1>
              <p className="detail-price">{fmt(product.price)}</p>
              <p className="detail-desc">{product.description}</p>

              <div className="detail-actions">
                <div className="qty-stepper" aria-label="Quantity">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    disabled={qty === 1}
                  >
                    −
                  </button>
                  <span aria-live="polite">{qty}</span>
                  <button onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity">
                    +
                  </button>
                </div>

                <button
                  className="btn btn-primary"
                  onClick={() => addToCart(product, qty)}
                >
                  Add to cart — {fmt(product.price * qty)}
                </button>

                <button
                  className={`wishlist-inline ${wished ? 'active' : ''}`}
                  onClick={() => toggleWishlist(product)}
                >
                  {wished ? '♥ Saved' : '♡ Save for later'}
                </button>
              </div>

              <ul className="detail-facts">
                <li><strong>Category</strong><span>{categoryLabel(product.category)}</span></li>
                <li><strong>Base</strong><span>Argan oil</span></li>
                <li><strong>Origin</strong><span>Marrakech, Morocco</span></li>
                <li><strong>Formula</strong><span>All natural, plant based</span></li>
              </ul>

              <div className="detail-howto">
                <h2>How to use</h2>
                <ol>
                  {(howToUse[product.category] || howToUse.face).map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section section-alt">
          <div className="container">
            <div className="section-header">
              <div>
                <p className="eyebrow">Complete the ritual</p>
                <h2>You may also like</h2>
              </div>
              <Link to={`/shop?cat=${product.category}`} className="btn btn-outline">
                View all {categoryLabel(product.category).toLowerCase()}
              </Link>
            </div>
            <div className="product-grid">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

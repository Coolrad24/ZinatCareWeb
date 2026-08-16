import { useMemo, useState, useEffect } from 'react'
import { products, categories } from '../data/products.js'
import ProductCard from '../components/ProductCard.jsx'
import { useStore } from '../context/StoreContext.jsx'
import { navigate } from '../router.jsx'

const sortOptions = [
  { key: 'featured', label: 'Featured' },
  { key: 'name', label: 'Name (A–Z)' },
  { key: 'price-asc', label: 'Price — low to high' },
  { key: 'price-desc', label: 'Price — high to low' },
]

export default function Shop({ params }) {
  const { wishlist } = useStore()
  const initialCat = params.get('cat') || 'all'
  const wishlistOnly = params.get('wishlist') === '1'

  const [cat, setCat] = useState(initialCat)
  const [sort, setSort] = useState('featured')

  // keep filter in sync if user navigates via category tiles / wishlist icon
  useEffect(() => setCat(initialCat), [initialCat])

  const visible = useMemo(() => {
    let list = [...products]
    if (wishlistOnly) list = list.filter((p) => wishlist.includes(p.id))
    if (cat !== 'all') list = list.filter((p) => p.category === cat)
    switch (sort) {
      case 'name':
        list.sort((a, b) => a.name.localeCompare(b.name)); break
      case 'price-asc':
        list.sort((a, b) => a.price - b.price); break
      case 'price-desc':
        list.sort((a, b) => b.price - a.price); break
      default:
        break
    }
    return list
  }, [cat, sort, wishlistOnly, wishlist])

  const setCategory = (key) => {
    setCat(key)
    navigate(key === 'all' ? '/shop' : `/shop?cat=${key}`)
  }

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <div>
            <p className="eyebrow">{wishlistOnly ? 'Saved for later' : 'The collection'}</p>
            <h2>{wishlistOnly ? 'Your wishlist' : 'All products'}</h2>
          </div>
        </div>

        {!wishlistOnly && (
          <div className="shop-controls">
            <div className="filter-pills" role="group" aria-label="Filter by category">
              <button
                className={`pill ${cat === 'all' ? 'active' : ''}`}
                onClick={() => setCategory('all')}
              >
                All
              </button>
              {categories.map((c) => (
                <button
                  key={c.key}
                  className={`pill ${cat === c.key ? 'active' : ''}`}
                  onClick={() => setCategory(c.key)}
                >
                  {c.label}
                </button>
              ))}
            </div>
            <select
              className="sort-select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              aria-label="Sort products"
            >
              {sortOptions.map((o) => (
                <option key={o.key} value={o.key}>{o.label}</option>
              ))}
            </select>
          </div>
        )}

        {visible.length === 0 ? (
          <div className="empty-cart">
            <p>{wishlistOnly ? 'Your wishlist is empty — tap the ♡ on any product to save it.' : 'No products match this filter.'}</p>
          </div>
        ) : (
          <div className="product-grid">
            {visible.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

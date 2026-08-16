import { useState } from 'react'
import { Link, useRoute } from '../router.jsx'
import { useStore } from '../context/StoreContext.jsx'

export default function Header() {
  const { path } = useRoute()
  const { cartCount, wishlist, setCartOpen } = useStore()
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About us' },
    { to: '/shop', label: 'Shop' },
  ]

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="logo" aria-label="ZinatCare home">
          Zinat<span>Care</span>
        </Link>

        <nav className={`nav ${menuOpen ? 'open' : ''}`} aria-label="Main navigation">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={path === l.to ? 'active' : ''}
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <Link to="/shop?wishlist=1" className="icon-btn" aria-label={`Wishlist, ${wishlist.length} items`}>
            ♡
            {wishlist.length > 0 && <span className="badge">{wishlist.length}</span>}
          </Link>
          <button className="icon-btn" onClick={() => setCartOpen(true)} aria-label={`Cart, ${cartCount} items`}>
            🛍
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </button>
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            ☰
          </button>
        </div>
      </div>
    </header>
  )
}

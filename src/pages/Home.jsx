import { Link } from '../router.jsx'
import { products, imageProps } from '../data/products.js'
import ProductCard from '../components/ProductCard.jsx'

const heroProduct = products.find((p) => p.id === 16)
const faceProduct = products.find((p) => p.id === 20)
const bodyProduct = products.find((p) => p.id === 25)

const ritual = [
  { step: 'I', title: 'Cleanse', copy: 'Cleanse at night to wash away the day and prepare the skin.' },
  { step: 'II', title: 'Nourish', copy: 'Nourish twice — day cream in the morning, night cream in the evening.' },
  { step: 'III', title: 'Scrub', copy: 'Gently exfoliate 2–3 times a week to renew the complexion.' },
  { step: 'IV', title: 'Mask', copy: 'Apply a purifying or radiance mask 2–3 times a week.' },
]

export default function Home() {
  const featured = products.slice(0, 8)

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <p className="eyebrow">The Land of The Argan</p>
            <h1>
              All natural <em>argan oil</em> based skincare from Morocco
            </h1>
            <p className="lede">
              A simple four-step ritual built on plant-based ingredients,
              sourced from the ancestral lands surrounding Marrakech.
            </p>
            <div className="hero-cta">
              <Link to="/shop" className="btn btn-primary">Shop the collection</Link>
              <Link to="/about" className="btn btn-outline">Our story</Link>
            </div>
          </div>
          <div className="hero-visual">
            <img {...imageProps(heroProduct, 'Radiance Day Cream by ZinatCare')} />
          </div>
        </div>
      </section>

      {/* Ritual */}
      <section className="ritual">
        <div className="container">
          <div className="ritual-header">
            <p className="eyebrow">Your daily practice</p>
            <h2>The simple 4-step ritual</h2>
          </div>
          <div className="ritual-grid">
            {ritual.map((r) => (
              <div className="ritual-card" key={r.step}>
                <div className="ritual-step">{r.step}</div>
                <h3>{r.title}</h3>
                <p>{r.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <div>
              <p className="eyebrow">Unveiling our products</p>
              <h2>All natural, plant based, with argan oil</h2>
            </div>
            <Link to="/shop" className="btn btn-outline">View all</Link>
          </div>
          <div className="product-grid">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <p className="eyebrow">Explore our collection</p>
              <h2>Curated by category</h2>
            </div>
            <p>
              Each item is grouped by category to make browsing effortless.
              Dive into the different worlds we've curated for you.
            </p>
          </div>
          <div className="category-grid">
            <Link to="/shop?cat=face" className="category-tile">
              <img {...imageProps(faceProduct, 'Face care collection')} />
              <div className="overlay">
                <h3>Face</h3>
                <span>Shop →</span>
              </div>
            </Link>
            <Link to="/shop?cat=body" className="category-tile">
              <img {...imageProps(bodyProduct, 'Body care collection')} />
              <div className="overlay">
                <h3>Body</h3>
                <span>Shop →</span>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

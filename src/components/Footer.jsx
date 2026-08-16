import { Link } from '../router.jsx'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <h4>ZinatCare</h4>
            <p>
              All natural, argan oil based skincare from Morocco. Unveiling the
              rich, time-honored scents and beauty traditions of North Africa.
            </p>
          </div>
          <div>
            <h4>Explore</h4>
            <Link to="/">Home</Link>
            <Link to="/about">About us</Link>
            <Link to="/shop">Shop</Link>
          </div>
          <div>
            <h4>Contact</h4>
            <a href="mailto:Support@zinatcare.com">Support@zinatcare.com</a>
          </div>
        </div>
        <div className="footer-bottom">
          Copyright © Zinat LLC · Rebuilt in React
        </div>
      </div>
    </footer>
  )
}

# ZinatCare — React rebuild

A from-scratch React rebuild of [zinatcare.com](https://www.zinatcare.com) (originally Odoo).
All 13 products, prices, and copy are pulled from the live site.

## Run locally

```bash
npm install
npm run download-images   # one-time: saves all 16 images into public/images
npm run dev
```

Opens at http://localhost:3000

(You can also do both setup steps at once with `npm run setup`.)

## Images

Images are served locally from `public/images/`. The `download-images` script
(zero dependencies, Node 18+) fetches every product and about-page image from
the live site once, and after that the app is fully self-contained — no
hotlinking. If you skip the script, each image gracefully falls back to the
remote URL so nothing breaks.

## What's included

- **Home** — hero, 4-step ritual, featured products, Face/Body category tiles
- **About us** — the three brand story sections from the original site
- **Shop** — all 13 products with category filter (Face/Body), sorting, add-to-cart, wishlist
- **Cart drawer** — quantity controls, remove, live subtotal
- **Wishlist** — toggle ♡ on any product, view via the header icon
- Responsive down to mobile, reduced-motion respected

## Notes

- Cart/wishlist state is in-memory (resets on refresh). Swap in localStorage or a
  backend when you're ready.
- The Checkout button is a placeholder — wire it to Stripe/PayPal/your backend.
- Routing is a tiny built-in hash router (`src/router.jsx`) with zero dependencies.
  Replace with `react-router-dom` if you prefer real URLs.

## Structure

```
public/images/          local images (filled by download script)
scripts/
  download-images.mjs   one-time image fetcher
src/
  main.jsx              entry
  App.jsx               shell + routes
  router.jsx            minimal hash router
  index.css             full design system
  data/products.js      catalog + image fallback helper
  context/StoreContext.jsx   cart + wishlist state
  components/           Header, Footer, ProductCard, CartDrawer
  pages/                Home, About, Shop
```

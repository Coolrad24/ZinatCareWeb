// Product catalog — content sourced from zinatcare.com
//
// Images are served locally from /public/images (run `npm run download-images`
// once to fetch them). Until then, each image falls back to the live site URL
// via the onError handler wired up in <SmartImage> / imageProps().

const REMOTE = (id, name) =>
  `https://www.zinatcare.com/web/image/product.product/${id}/image_1024/${encodeURIComponent(name)}`

const LOCAL = (slug) => `/images/${slug}.webp`

const p = (id, slug, name, category, price, description) => ({
  id, slug, name, category, price, description,
  image: LOCAL(slug),
  imageFallback: REMOTE(id, name),
})

export const products = [
  p(17, 'gentle-night-cream-prickly-pear-seed-oil',
    'Gentle Night Cream Prickly Pear Seed Oil', 'face', 59.99,
    'This nourishing cream activates the natural night time rejuvenation and moisturizing process. Your skin is revitalized and smoothed.'),
  p(16, 'radiance-day-cream',
    'Radiance Day Cream', 'face', 59.99,
    'Enriched with argan oil and saffron extract, the day cream envelops your skin in a veil of softness to protect it from drying out while guaranteeing softness and clarity.'),
  p(25, 'sugar-body-scrub-argan-oil-honey-orange',
    'Sugar Body Scrub Argan Oil - Honey Orange Essential Oil', 'body', 35.0,
    'Try our gentle and effective sugar scrub with a divine scent.'),
  p(20, 'purifying-mask-green-clay-aloe-vera',
    'Purifying Mask Green Clay - Aloe Vera', 'face', 25.0,
    'This mask clarifies and tightens the pores of the skin. Rich in green clay, argan oil and aloe vera oil, it eliminates excess sebum and regulates shiny areas.'),
  p(18, 'gentle-facial-scrub-prickly-pear-seed-oil',
    'Gentle Facial Scrub Prickly Pear Seed Oil', 'face', 59.99,
    'Discover the secret to a clean complexion with our facial scrub. Experience the magic of prickly pear oil, as it gets absorbed after the wash.'),
  p(21, 'purifying-mask-red-clay-hibiscus-extract',
    'Purifying Mask Red Clay & Hibiscus Extract', 'face', 25.0,
    'A gentle and effective facial treatment that deeply cleanses the skin. Rich in argan oil, red clay and hibiscus extract, this mask cleanses, tightens pores and brightens your skin.'),
  p(19, 'radiance-mask-honey-saffron-extract',
    'Radiance Mask Honey - Saffron Extract', 'face', 25.0,
    'The minerals, vitamins & amino acids from honey and saffron make this a restorative therapeutic mask. Ideal for all skin types — a true radiance booster for the skin.'),
  p(22, 'regenerative-hand-cream-argan-oil-neroli',
    'Regenerative Hand Cream with Argan Oil Neroli', 'body', 10.0,
    'Enriched with argan oil, grape seed oil, and shea butter. Nourishing and protective, combined with a floral perfume oil — ideal for daily hand care, providing a soft and silky touch.'),
  p(26, 'hydrating-body-milk-argan-oil-neroli',
    'Hydrating Body Milk Argan Oil Neroli', 'body', 10.0,
    'This milk moisturizes the upper layers of the epidermis and provides softness and comfort to the skin. Apply in the morning or evening, preferably after shower.'),
  p(27, 'hydrating-body-milk-argan-oil-orange-blossom',
    'Hydrating Body Milk Argan Oil Orange Blossom', 'body', 10.0,
    'This milk moisturizes the upper layers of the epidermis and provides softness and comfort to the skin. It acts gently, giving smoothness and vitality.'),
  p(23, 'regenerative-hand-cream-argan-oil-tea-rose',
    'Regenerative Hand Cream Argan Oil & Tea Rose', 'body', 10.0,
    'Enriched with argan oil, grape seed oil, and shea butter, combined with a floral perfume oil — ideal for daily hand care, providing a soft and silky touch.'),
  p(24, 'restorative-feet-cream-argan-oil-mint',
    'Restorative Feet Cream Argan Oil Mint', 'body', 10.0,
    'Rich in argan oil, shea butter and mint essential oil, this regenerating foot cream gives dry heels and feet the softness they need — moisturizing without leaving a greasy feel.'),
  p(15, 'facial-cleansing-gel-argan-oil-saffron-extract',
    'Facial Cleansing Gel Argan Oil & Saffron Extract', 'face', 17.99,
    'An essential part of your daily skincare ritual. The moisturizing and protective properties of argan oil are combined with saffron for a fabulous burst of radiance.'),
]

// About-page images (local first, remote fallback)
export const aboutImages = {
  greenClay: {
    image: LOCAL('about-green-clay'),
    imageFallback: 'https://www.zinatcare.com/web/image/1496-68370785/green%20clay%20texture.webp',
  },
  beigeClay: {
    image: LOCAL('about-beige-clay'),
    imageFallback: 'https://www.zinatcare.com/web/image/1497-c1ab3676/ARGILLES%20BEIGE.webp',
  },
  science: {
    image: '/images/about-science.jpg',
    imageFallback: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1200&q=80',
  },
}

export const categories = [
  { key: 'face', label: 'Face' },
  { key: 'body', label: 'Body' },
]

export const getProductBySlug = (slug) => products.find((p) => p.slug === slug)

export const categoryLabel = (key) =>
  categories.find((c) => c.key === key)?.label || key

// Spread onto an <img>: tries the local file first; if it's missing
// (images not downloaded yet), swaps to the remote URL automatically.
export function imageProps(item, alt) {
  return {
    src: item.image,
    alt,
    onError: (e) => {
      if (item.imageFallback && e.currentTarget.src !== item.imageFallback) {
        e.currentTarget.src = item.imageFallback
      }
    },
  }
}

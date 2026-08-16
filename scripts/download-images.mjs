// Downloads all product + about-page images from zinatcare.com
// into public/images/. Zero dependencies — needs Node 18+.
//
// Run once:  npm run download-images

import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const OUT_DIR = path.resolve('public/images')

const IMAGES = [
  // slug (local filename without extension) : remote URL
  ['gentle-night-cream-prickly-pear-seed-oil', 'https://www.zinatcare.com/web/image/product.product/17/image_1024/Gentle%20Night%20Cream%20Prickly%20Pear%20Seed%20Oil'],
  ['radiance-day-cream', 'https://www.zinatcare.com/web/image/product.product/16/image_1024/Radiance%20Day%20Cream'],
  ['sugar-body-scrub-argan-oil-honey-orange', 'https://www.zinatcare.com/web/image/product.product/25/image_1024/Sugar%20Body%20Scrub%20Argan%20Oil%20-%20Honey%20Orange%20Essential%20Oil'],
  ['purifying-mask-green-clay-aloe-vera', 'https://www.zinatcare.com/web/image/product.product/20/image_1024/Purifying%20Mask%20Green%20Clay%20-%20Aloe%20Vera'],
  ['gentle-facial-scrub-prickly-pear-seed-oil', 'https://www.zinatcare.com/web/image/product.product/18/image_1024/Gentle%20Facial%20Scrub%20Prickly%20Pear%20Seed%20Oil'],
  ['purifying-mask-red-clay-hibiscus-extract', 'https://www.zinatcare.com/web/image/product.product/21/image_1024/Purifying%20Mask%20Red%20Clay%20%26%20Hibiscus%20Extract'],
  ['radiance-mask-honey-saffron-extract', 'https://www.zinatcare.com/web/image/product.product/19/image_1024/Radiance%20Mask%20Honey%20-%20Saffron%20Extract'],
  ['regenerative-hand-cream-argan-oil-neroli', 'https://www.zinatcare.com/web/image/product.product/22/image_1024/Regenerative%20Hand%20Cream%20with%20Argan%20Oil%20Neroli'],
  ['hydrating-body-milk-argan-oil-neroli', 'https://www.zinatcare.com/web/image/product.product/26/image_1024/Hydrating%20Body%20Milk%20Argan%20Oil%20Neroli'],
  ['hydrating-body-milk-argan-oil-orange-blossom', 'https://www.zinatcare.com/web/image/product.product/27/image_1024/Hydrating%20Body%20Milk%20Argan%20Oil%20Orange%20Blossom'],
  ['regenerative-hand-cream-argan-oil-tea-rose', 'https://www.zinatcare.com/web/image/product.product/23/image_1024/Regenerative%20Hand%20Cream%20Argan%20Oil%20%26%20Tea%20Rose'],
  ['restorative-feet-cream-argan-oil-mint', 'https://www.zinatcare.com/web/image/product.product/24/image_1024/Restorative%20Feet%20Cream%20Argan%20Oil%20Mint'],
  ['facial-cleansing-gel-argan-oil-saffron-extract', 'https://www.zinatcare.com/web/image/product.product/15/image_1024/Facial%20Cleansing%20Gel%20Argan%20Oil%20%26%20Saffron%20Extract'],
  // About page
  ['about-green-clay', 'https://www.zinatcare.com/web/image/1496-68370785/green%20clay%20texture.webp'],
  ['about-beige-clay', 'https://www.zinatcare.com/web/image/1497-c1ab3676/ARGILLES%20BEIGE.webp'],
  ['about-science', 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1200&q=80'],
]

function extFromContentType(ct) {
  if (!ct) return 'jpg'
  if (ct.includes('webp')) return 'webp'
  if (ct.includes('png')) return 'png'
  if (ct.includes('gif')) return 'gif'
  return 'jpg'
}

async function download([slug, url]) {
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } })
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} — ${url}`)
  const ext = extFromContentType(res.headers.get('content-type'))
  const buf = Buffer.from(await res.arrayBuffer())
  const file = path.join(OUT_DIR, `${slug}.${ext}`)
  await writeFile(file, buf)
  return { slug, ext, size: buf.length }
}

await mkdir(OUT_DIR, { recursive: true })
console.log(`Downloading ${IMAGES.length} images into ${OUT_DIR}\n`)

let failed = 0
for (const entry of IMAGES) {
  try {
    const { slug, ext, size } = await download(entry)
    console.log(`  ✓ ${slug}.${ext}  (${(size / 1024).toFixed(0)} KB)`)
  } catch (err) {
    failed++
    console.error(`  ✗ ${entry[0]} — ${err.message}`)
  }
}

console.log(failed === 0
  ? '\nDone. All images saved locally — the app now works fully offline.'
  : `\nDone with ${failed} failure(s). Re-run "npm run download-images" to retry.`)

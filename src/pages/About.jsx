import { aboutImages, imageProps } from '../data/products.js'

export default function About() {
  return (
    <>
      <section className="about-hero">
        <div className="container">
          <p className="eyebrow">About us</p>
          <h1>Heritage, elegance & modern self-care</h1>
          <p>
            Zinat Care is a brand devoted to unveiling the rich, time-honored
            scents and beauty traditions of North Africa to the world. With a
            thoughtfully curated selection of creams, shampoos, and cleansers,
            Zinat Care invites you to replenish and restore your skin through
            the gentle power of Mediterranean oils and fragrances.
          </p>
        </div>
      </section>

      <div className="container">
        <section className="about-block">
          <div className="about-media">
            <img {...imageProps(aboutImages.greenClay, 'Green clay texture')} />
          </div>
          <div className="about-copy">
            <h2>Sourced from ancestral lands</h2>
            <p>
              Our journey begins in the sun-drenched gardens surrounding
              Marrakech, where generations of cultivators have nurtured
              botanicals of exceptional purity. These ancient groves produce
              the finest argan oil, rose water, and essential oils that form
              the heart of our formulations.
            </p>
            <p>
              Every ingredient is hand-selected to honor the traditional
              practices that have sustained these communities for centuries,
              ensuring both quality and ethical sourcing.
            </p>
          </div>
        </section>

        <section className="about-block reverse">
          <div className="about-media">
            <img {...imageProps(aboutImages.beigeClay, 'Beige clay powder')} />
          </div>
          <div className="about-copy">
            <h2>Crafted with heritage & care</h2>
            <p>
              Our artisans blend time-honored techniques with modern skincare
              science to create products that truly transform. Each formula is
              carefully developed to preserve the integrity of natural
              ingredients while delivering visible results.
            </p>
            <p>
              From harvest to bottle, every step reflects our commitment to
              authenticity, sustainability, and the beauty rituals passed down
              through generations.
            </p>
          </div>
        </section>

        <section className="about-block">
          <div className="about-media">
            <img {...imageProps(aboutImages.science, 'Laboratory flasks — science meets tradition')} />
          </div>
          <div className="about-copy">
            <h2>Science meets tradition</h2>
            <p>
              While we honor ancient beauty wisdom, we also embrace modern
              innovation. Our team works to extract and concentrate the most
              beneficial compounds from each botanical, creating potent yet
              gentle formulations.
            </p>
            <p>
              The result is a collection that delivers the proven efficacy of
              Mediterranean creams and oils in luxurious, contemporary textures
              that fit seamlessly into your daily routine.
            </p>
          </div>
        </section>
      </div>
    </>
  )
}

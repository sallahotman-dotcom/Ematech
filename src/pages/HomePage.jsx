import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  Headphones,
  Sparkles
} from 'lucide-react';
import { categories, getFeaturedProducts } from '../data/products';
import ProductCard from '../components/ProductCard';
import ReviewsCarousel from '../components/ReviewsCarousel';

const HomePage = () => {
  const featured = getFeaturedProducts();

  return (
    <div className="bg-neutral-950">
      {/* ============== HERO SECTION (custom banner) ============== */}
      <section className="relative overflow-hidden bg-black">
        {/* Custom uploaded banner */}
        <img
          src="/Hero-banner.png"
          alt="Ematech - Premium technology curated for Morocco"
          className="absolute inset-0 h-full w-full object-cover object-center"
          loading="eager"
          fetchpriority="high"
        />

        {/* Dark gradient overlays for legibility (left-to-right + bottom vignette) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/40 sm:via-black/75 lg:via-black/65 lg:to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

        {/* Ambient gold glows preserved for theme continuity */}
        <div className="pointer-events-none absolute -top-40 -left-40 h-[28rem] w-[28rem] rounded-full bg-amber-500/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 right-0 h-[28rem] w-[28rem] rounded-full bg-amber-300/10 blur-3xl" />

        {/* Subtle gold hairline at the bottom for that luxury cut */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />

        {/* Content - responsive padding tuned for Moroccan mobile devices */}
        <div className="relative mx-auto flex min-h-[500px] max-w-7xl flex-col justify-center px-5 py-14 sm:min-h-[600px] sm:px-8 sm:py-20 lg:min-h-[680px] lg:px-12 lg:py-28">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-black/50 px-4 py-1.5 text-xs font-medium text-amber-300 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5" />
              Premium Tech, Curated for Morocco
            </div>

            <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] sm:text-5xl lg:text-6xl">
              Elevate your everyday with{' '}
              <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600 bg-clip-text text-transparent">
                next-generation
              </span>{' '}
              technology.
            </h1>

            <p className="mt-6 max-w-xl text-base text-neutral-200 drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)] sm:text-lg">
              Smartphones, smartwatches, premium audio and home appliances. 100%
              authentic, fully warrantied, delivered to your door across Morocco.
            </p>

            <p
              className="mt-3 text-sm text-neutral-300 drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)]"
              dir="rtl"
            >
              تكنولوجيا فاخرة، منتجات أصلية، توصيل سريع لجميع مدن المملكة.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/category/smartphones"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 px-7 py-3.5 text-sm font-semibold text-black shadow-lg shadow-amber-500/30 transition-all hover:shadow-amber-400/50"
              >
                Shop Now
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-black/50 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-amber-400 hover:text-amber-400"
              >
                Discover Ematech
              </Link>
            </div>

            {/* Inline trust strip */}
            <div className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-amber-500/20 pt-6 text-xs text-neutral-200">
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-amber-400" />
                <span>24-72h delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-amber-400" />
                <span>100% authentic</span>
              </div>
              <div className="flex items-center gap-2">
                <Headphones className="h-4 w-4 text-amber-400" />
                <span>7/7 support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============== CATEGORIES GRID ============== */}
      <section className="bg-neutral-950 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">
                Shop by Category
              </p>
              <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
                Curated collections
              </h2>
              <p className="mt-2 text-sm text-neutral-400">
                Explore our 4 hand-picked universes of premium technology.
              </p>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center gap-1 text-sm font-medium text-amber-400 transition-colors hover:text-amber-300"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/category/${cat.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 transition-all hover:border-amber-500/60 hover:shadow-lg hover:shadow-amber-500/10"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </div>

                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-xs text-amber-300" dir="rtl">
                    {cat.nameAr}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-white">{cat.name}</h3>
                  <div className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-amber-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    Discover
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============== FEATURED PRODUCTS ============== */}
      <section className="bg-black py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">
                Featured Products
              </p>
              <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
                Trending right now
              </h2>
              <p className="mt-2 text-sm text-neutral-400">
                Editor&apos;s selection of the most loved products at Ematech.
              </p>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center gap-1 text-sm font-medium text-amber-400 transition-colors hover:text-amber-300"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ============== REVIEWS CAROUSEL ============== */}
      <ReviewsCarousel />

      {/* ============== CTA BANNER ============== */}
      <section className="bg-neutral-950 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="relative overflow-hidden rounded-3xl border border-amber-500/20 bg-gradient-to-br from-neutral-900 via-black to-neutral-900 p-10 sm:p-14">
            <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-amber-500/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-amber-300/10 blur-3xl" />

            <div className="relative grid gap-8 sm:grid-cols-2 sm:items-center">
              <div>
                <h3 className="text-2xl font-bold text-white sm:text-3xl">
                  Join the Ematech experience
                </h3>
                <p className="mt-3 text-sm text-neutral-400">
                  Subscribe to receive exclusive launches, early-bird discounts and
                  tech insights handpicked for you.
                </p>
              </div>

              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex w-full overflow-hidden rounded-full border border-neutral-700 bg-neutral-900/60 focus-within:border-amber-400"
              >
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="flex-1 bg-transparent px-5 py-4 text-sm text-white placeholder-neutral-500 outline-none"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-amber-400 to-amber-600 px-6 text-sm font-semibold text-black transition-opacity hover:opacity-90"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

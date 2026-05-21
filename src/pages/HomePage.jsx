import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  Headphones,
  Star,
  ShoppingBag,
  Sparkles
} from 'lucide-react';
import { categories, getFeaturedProducts } from '../data/products';
import { useCart } from '../context/CartContext';
import ReviewsCarousel from '../components/ReviewsCarousel';

const HomePage = () => {
  const { addToCart, formatPrice } = useCart();
  const featured = getFeaturedProducts();

  return (
    <div className="bg-neutral-950">
      {/* ============== HERO SECTION ============== */}
      <section className="relative overflow-hidden bg-black">
        {/* Ambient gold glows */}
        <div className="pointer-events-none absolute -top-40 -left-40 h-[28rem] w-[28rem] rounded-full bg-amber-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 right-0 h-[28rem] w-[28rem] rounded-full bg-amber-300/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-28">
          {/* Copy */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-medium text-amber-300">
              <Sparkles className="h-3.5 w-3.5" />
              Premium Tech, Curated for Morocco
            </div>

            <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Elevate your everyday with{' '}
              <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600 bg-clip-text text-transparent">
                next-generation
              </span>{' '}
              technology.
            </h1>

            <p className="mt-6 max-w-xl text-base text-neutral-400 sm:text-lg">
              Smartphones, smartwatches, premium audio and home appliances. 100%
              authentic, fully warrantied, delivered to your door across Morocco.
            </p>

            <p className="mt-3 text-sm text-neutral-500" dir="rtl">
              تكنولوجيا فاخرة، منتجات أصلية، توصيل سريع لجميع مدن المملكة.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/category/smartphones"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 px-7 py-3.5 text-sm font-semibold text-black shadow-lg shadow-amber-500/20 transition-all hover:shadow-amber-400/40"
              >
                Shop Now
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-900/50 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:border-amber-400 hover:text-amber-400"
              >
                Discover Ematech
              </Link>
            </div>

            {/* Inline trust strip */}
            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-neutral-800 pt-8 text-xs text-neutral-400">
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

          {/* Visual */}
          <div className="relative">
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-amber-400/30 via-amber-600/10 to-transparent blur-2xl" />
            <div className="relative aspect-[5/6] overflow-hidden rounded-[2rem] border border-amber-500/20 bg-gradient-to-br from-neutral-900 to-black p-2 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=1200&q=85&auto=format&fit=crop"
                alt="iPhone 15 Pro Max - Featured drop"
                className="h-full w-full rounded-[1.7rem] object-cover"
                loading="eager"
              />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between rounded-2xl border border-white/10 bg-black/60 px-4 py-3 backdrop-blur-md">
                <div>
                  <p className="text-xs text-neutral-400">Featured Drop</p>
                  <p className="text-sm font-semibold text-white">iPhone 15 Pro Max</p>
                </div>
                <span className="rounded-full bg-gradient-to-r from-amber-400 to-amber-600 px-3 py-1 text-xs font-bold text-black">
                  -9%
                </span>
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
            {featured.map((product) => {
              const discount = product.oldPrice
                ? Math.round(
                    ((product.oldPrice - product.price) / product.oldPrice) * 100
                  )
                : 0;

              return (
                <article
                  key={product.id}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 transition-all hover:border-amber-500/60 hover:shadow-lg hover:shadow-amber-500/10"
                >
                  <Link
                    to={`/product/${product.id}`}
                    className="relative block aspect-square overflow-hidden bg-neutral-950"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    {product.isNew && (
                      <span className="absolute left-3 top-3 rounded-full bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-black">
                        New
                      </span>
                    )}
                    {discount > 0 && (
                      <span className="absolute right-3 top-3 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 px-2.5 py-1 text-[10px] font-bold text-black">
                        -{discount}%
                      </span>
                    )}
                  </Link>

                  <div className="flex flex-1 flex-col p-4">
                    <p className="text-[11px] uppercase tracking-wider text-neutral-500">
                      {product.brand}
                    </p>
                    <Link
                      to={`/product/${product.id}`}
                      className="mt-1 line-clamp-2 text-sm font-semibold text-white transition-colors hover:text-amber-400"
                    >
                      {product.name}
                    </Link>

                    <div className="mt-2 flex items-center gap-1 text-xs">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-medium text-white">{product.rating}</span>
                      <span className="text-neutral-500">
                        ({product.reviewsCount})
                      </span>
                    </div>

                    <div className="mt-auto flex items-end justify-between pt-4">
                      <div>
                        <p className="text-base font-bold text-amber-400">
                          {formatPrice(product.price)}
                        </p>
                        {product.oldPrice && (
                          <p className="text-xs text-neutral-500 line-through">
                            {formatPrice(product.oldPrice)}
                          </p>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => addToCart(product, 1)}
                        aria-label={`Add ${product.name} to cart`}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-black shadow-md transition-transform hover:scale-110 active:scale-95"
                      >
                        <ShoppingBag className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
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

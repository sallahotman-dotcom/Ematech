import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ChevronRight,
  Home as HomeIcon,
  Star,
  Truck,
  ShieldCheck,
  Headphones,
  ShoppingBag,
  Check,
  Minus,
  Plus,
  PackageX
} from 'lucide-react';
import {
  getProductById,
  getCategoryBySlug,
  getProductsByCategory
} from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

// Moroccan WhatsApp number in E.164 (without the leading +).
// Update this once you publish the official Ematech WhatsApp line.
const WHATSAPP_PHONE = '212522000000';

// Lightweight HD upgrade for the hero image (Unsplash supports `w=` query)
const upgradeImage = (url, width = 1600) => {
  if (typeof url !== 'string') return url;
  return url.replace(/w=\d+/, `w=${width}`);
};

// Inline brand-accurate WhatsApp glyph (lucide doesn't ship a brand mark)
const WhatsAppIcon = ({ className = 'h-4 w-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
  </svg>
);

const ProductPage = () => {
  const { id } = useParams();
  const product = getProductById(id);
  const { addToCart, formatPrice } = useCart();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  // Reset local state whenever the product changes
  useEffect(() => {
    setActiveImageIndex(0);
    setQuantity(1);
    setJustAdded(false);
  }, [id]);

  // Related products (same category, excluding current)
  const related = useMemo(() => {
    if (!product) return [];
    return getProductsByCategory(product.category)
      .filter((p) => p.id !== product.id)
      .slice(0, 4);
  }, [product]);

  // ---------- Product not found ----------
  if (!product) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center bg-black px-6 py-24 text-center">
        <div className="max-w-md">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/10">
            <PackageX className="h-8 w-8 text-amber-400" />
          </div>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">
            Product not found
          </p>
          <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl">
            We couldn&apos;t find that item
          </h1>
          <p className="mt-3 text-sm text-neutral-400">
            The product reference &quot;{id}&quot; doesn&apos;t exist or has been
            retired from our catalog.
          </p>
          <p className="mt-2 text-xs text-neutral-500" dir="rtl">
            المنتج المطلوب غير متوفر حالياً.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 px-7 py-3 text-sm font-semibold text-black shadow-lg shadow-amber-500/20 transition-all hover:shadow-amber-400/40"
            >
              Back to Home
            </Link>
            <Link
              to="/category/smartphones"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-900/60 px-7 py-3 text-sm font-semibold text-white transition-all hover:border-amber-400 hover:text-amber-400"
            >
              Browse Smartphones
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // ---------- Derived ----------
  const category = getCategoryBySlug(product.category);
  const gallery =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images
      : [product.image];
  const activeImage = gallery[activeImageIndex] || product.image;
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;
  const isOutOfStock = product.inStock === false;

  // ---------- Handlers ----------
  const handleAdd = () => {
    if (isOutOfStock) return;
    addToCart(product, quantity);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1500);
  };

  const decrementQty = () => setQuantity((q) => Math.max(1, q - 1));
  const incrementQty = () => setQuantity((q) => Math.min(99, q + 1));

  const buildWhatsAppLink = () => {
    const productUrl =
      typeof window !== 'undefined' ? window.location.href : '';
    const lines = [
      'السلام عليكم،',
      'أرغب في طلب المنتج التالي من Ematech:',
      '',
      `📦 ${product.name}`,
      `💰 ${formatPrice(product.price)}`,
      `🔢 الكمية: ${quantity}`,
      productUrl ? `🔗 ${productUrl}` : null,
      '',
      'شكراً لكم.'
    ].filter(Boolean);
    return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
      lines.join('\n')
    )}`;
  };

  // ---------- Render ----------
  return (
    <div className="bg-neutral-950">
      {/* Breadcrumb */}
      <section className="border-b border-neutral-800 bg-black">
        <div className="mx-auto max-w-7xl px-6 py-5">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-xs text-neutral-500"
          >
            <Link
              to="/"
              className="flex items-center gap-1 transition-colors hover:text-amber-400"
            >
              <HomeIcon className="h-3.5 w-3.5" />
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            {category && (
              <>
                <Link
                  to={`/category/${category.slug}`}
                  className="transition-colors hover:text-amber-400"
                >
                  {category.name}
                </Link>
                <ChevronRight className="h-3 w-3" />
              </>
            )}
            <span className="line-clamp-1 max-w-[280px] text-neutral-300">
              {product.name}
            </span>
          </nav>
        </div>
      </section>

      {/* Main grid */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:py-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          {/* ============== GALLERY ============== */}
          <div>
            <div className="relative aspect-square overflow-hidden rounded-3xl border border-neutral-800 bg-gradient-to-br from-neutral-900 via-black to-neutral-900 shadow-xl shadow-black/40">
              <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl" />

              <img
                key={activeImage}
                src={upgradeImage(activeImage, 1600)}
                alt={product.name}
                className="relative h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-[1.04]"
                loading="eager"
              />

              {/* Top-left badge */}
              {product.isNew && !isOutOfStock && (
                <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-black shadow-md">
                  New
                </span>
              )}

              {/* Top-right discount */}
              {discount > 0 && !isOutOfStock && (
                <span className="absolute right-4 top-4 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 px-3 py-1 text-xs font-bold text-black shadow-md">
                  -{discount}%
                </span>
              )}

              {/* Out-of-stock overlay */}
              {isOutOfStock && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/65 backdrop-blur-[2px]">
                  <span className="rounded-full border border-white/20 bg-black/70 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-white">
                    Out of stock
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {gallery.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-5">
                {gallery.map((img, i) => (
                  <button
                    key={`${img}-${i}`}
                    type="button"
                    onClick={() => setActiveImageIndex(i)}
                    aria-label={`View image ${i + 1}`}
                    aria-current={i === activeImageIndex}
                    className={`relative aspect-square overflow-hidden rounded-xl border transition-all ${
                      i === activeImageIndex
                        ? 'border-amber-400 ring-2 ring-amber-400/30'
                        : 'border-neutral-800 hover:border-neutral-600'
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ============== INFO ============== */}
          <div className="flex flex-col">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">
              {product.brand}
            </p>
            <h1 className="mt-2 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.round(product.rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-neutral-700'
                    }`}
                  />
                ))}
              </div>
              <span className="font-semibold text-white">
                {Number(product.rating).toFixed(1)}
              </span>
              <span className="text-neutral-500">
                ({product.reviewsCount} reviews)
              </span>
            </div>

            {/* Price card */}
            <div className="mt-6 rounded-2xl border border-amber-500/20 bg-gradient-to-br from-neutral-900 to-black p-5">
              <div className="flex flex-wrap items-baseline gap-3">
                <p className="text-4xl font-bold text-amber-400">
                  {formatPrice(product.price)}
                </p>
                {product.oldPrice && (
                  <>
                    <p className="text-lg text-neutral-500 line-through">
                      {formatPrice(product.oldPrice)}
                    </p>
                    <span className="rounded-full bg-amber-500/15 px-2.5 py-1 text-xs font-semibold text-amber-300">
                      Save {formatPrice(product.oldPrice - product.price)}
                    </span>
                  </>
                )}
              </div>
              <p className="mt-2 text-xs text-neutral-500">
                VAT included. Free delivery on orders above 1,000 MAD.
              </p>
            </div>

            {/* Description */}
            <p className="mt-6 text-sm leading-relaxed text-neutral-400">
              {product.description}
            </p>

            {/* Stock indicator */}
            <div className="mt-5 flex items-center gap-2 text-sm">
              <span
                className={`inline-flex h-2.5 w-2.5 rounded-full ${
                  isOutOfStock ? 'bg-red-400' : 'bg-emerald-400 animate-pulse'
                }`}
              />
              <span className="font-medium text-white">
                {isOutOfStock ? 'Out of stock' : 'In stock'}
              </span>
              {!isOutOfStock && (
                <span className="text-neutral-500">— ready to ship</span>
              )}
            </div>

            {/* Quantity + Add to cart */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-stretch">
              <div className="inline-flex items-center rounded-full border border-neutral-700 bg-neutral-900">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={decrementQty}
                  disabled={quantity <= 1 || isOutOfStock}
                  className="flex h-12 w-12 items-center justify-center rounded-l-full text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span
                  className="w-12 text-center text-base font-semibold text-white"
                  aria-live="polite"
                >
                  {quantity}
                </span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={incrementQty}
                  disabled={quantity >= 99 || isOutOfStock}
                  className="flex h-12 w-12 items-center justify-center rounded-r-full text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                disabled={isOutOfStock}
                className={`flex flex-1 items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-black shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 ${
                  justAdded
                    ? 'bg-emerald-400 shadow-emerald-500/30'
                    : 'bg-gradient-to-r from-amber-400 to-amber-600 shadow-amber-500/20 hover:shadow-amber-400/40'
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="h-4 w-4" strokeWidth={3} />
                    Added to cart
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-4 w-4" />
                    Add to Cart
                  </>
                )}
              </button>
            </div>

            {/* WhatsApp button */}
            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-emerald-500 via-emerald-500 to-emerald-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition-all hover:scale-[1.01] hover:shadow-emerald-400/50 active:scale-[0.99]"
            >
              <WhatsAppIcon className="h-5 w-5" />
              <span>Order via WhatsApp</span>
              <span className="text-xs font-normal text-emerald-100/90">
                — اطلب عبر واتساب
              </span>
            </a>

            {/* Trust badges */}
            <div className="mt-7 grid grid-cols-3 gap-3 border-t border-neutral-800 pt-6 text-xs">
              <div className="flex flex-col items-center gap-1.5 text-center">
                <Truck className="h-5 w-5 text-amber-400" />
                <span className="font-semibold text-white">24-72h</span>
                <span className="text-neutral-500">Delivery</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 text-center">
                <ShieldCheck className="h-5 w-5 text-amber-400" />
                <span className="font-semibold text-white">100%</span>
                <span className="text-neutral-500">Authentic</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 text-center">
                <Headphones className="h-5 w-5 text-amber-400" />
                <span className="font-semibold text-white">7/7</span>
                <span className="text-neutral-500">Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* ============== SPECIFICATIONS ============== */}
        {product.specs && Object.keys(product.specs).length > 0 && (
          <section className="mt-16">
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">
                Specifications
              </p>
              <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                Technical details
              </h2>
            </div>
            <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/40">
              <table className="w-full text-sm">
                <tbody>
                  {Object.entries(product.specs).map(([key, value], idx) => (
                    <tr
                      key={key}
                      className={
                        idx % 2 === 0
                          ? 'bg-neutral-900/60'
                          : 'bg-transparent'
                      }
                    >
                      <th
                        scope="row"
                        className="w-1/3 px-5 py-4 text-left font-medium text-neutral-400"
                      >
                        {key}
                      </th>
                      <td className="px-5 py-4 text-white">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </section>

      {/* ============== RELATED PRODUCTS ============== */}
      {related.length > 0 && (
        <section className="border-t border-neutral-900 bg-black py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-8 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">
                  You may also like
                </p>
                <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                  More from {category ? category.name : 'this collection'}
                </h2>
              </div>
              {category && (
                <Link
                  to={`/category/${category.slug}`}
                  className="inline-flex items-center gap-1 text-sm font-medium text-amber-400 transition-colors hover:text-amber-300"
                >
                  View all <ChevronRight className="h-4 w-4" />
                </Link>
              )}
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductPage;

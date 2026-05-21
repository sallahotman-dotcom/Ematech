import { Link } from 'react-router-dom';
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Truck,
  PackageOpen,
  Sparkles,
  Tag,
  CheckCircle2
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { getProductById } from '../data/products';

const CartPage = () => {
  const {
    items,
    itemsCount,
    subtotal,
    shipping,
    total,
    freeShippingThreshold,
    formatPrice,
    incrementItem,
    decrementItem,
    removeFromCart,
    clearCart
  } = useCart();

  // ============== EMPTY STATE ==============
  if (items.length === 0) {
    return (
      <section className="bg-neutral-950">
        <div className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-6 py-20 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/10">
            <PackageOpen className="h-10 w-10 text-amber-400" />
          </div>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">
            Shopping Cart
          </p>
          <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
            Your cart is empty
          </h1>
          <p className="mt-3 max-w-md text-sm text-neutral-400">
            Discover our curated collection of premium technology and add your
            favourites to the cart.
          </p>
          <p className="mt-2 text-xs text-neutral-500" dir="rtl">
            سلتك فارغة. اكتشف مجموعتنا من المنتجات التقنية الفاخرة.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 px-7 py-3 text-sm font-semibold text-black shadow-lg shadow-amber-500/20 transition-all hover:shadow-amber-400/40"
            >
              <Sparkles className="h-4 w-4" />
              Continue Shopping
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

  // ============== DERIVED VALUES ==============
  // Original subtotal computed from product.oldPrice when available
  // (cart items only persist the active price, so we look up the
  // product to display the strike-through "was" price).
  const originalSubtotal = items.reduce((sum, item) => {
    const product = getProductById(item.id);
    const basePrice =
      product && product.oldPrice ? product.oldPrice : item.price;
    return sum + basePrice * item.quantity;
  }, 0);
  const totalSavings = Math.max(0, originalSubtotal - subtotal);

  const hasFreeShipping = subtotal >= freeShippingThreshold;
  const remainingForFree = Math.max(0, freeShippingThreshold - subtotal);
  const progressPct = Math.min(
    100,
    Math.round((subtotal / freeShippingThreshold) * 100)
  );

  return (
    <div className="bg-neutral-950">
      {/* Header */}
      <section className="border-b border-neutral-800 bg-black">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:py-12">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">
            Shopping Cart
          </p>
          <h1 className="mt-2 text-4xl font-bold text-white sm:text-5xl">
            Your cart
          </h1>
          <p className="mt-2 text-sm text-neutral-400">
            {itemsCount} item{itemsCount !== 1 ? 's' : ''} ready for checkout
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        {/* ============== FREE SHIPPING PROGRESS BAR ============== */}
        <div
          className={`mb-8 rounded-2xl border p-5 transition-colors ${
            hasFreeShipping
              ? 'border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent'
              : 'border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent'
          }`}
        >
          <div className="flex items-start gap-4">
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
                hasFreeShipping
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'bg-amber-500/20 text-amber-400'
              }`}
            >
              {hasFreeShipping ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : (
                <Truck className="h-5 w-5" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              {hasFreeShipping ? (
                <>
                  <p className="text-sm font-semibold text-white sm:text-base">
                    You unlocked FREE delivery! 🎉
                  </p>
                  <p className="mt-0.5 text-xs text-emerald-300/80">
                    Enjoy complimentary shipping anywhere in Morocco.
                  </p>
                  <p className="mt-0.5 text-xs text-neutral-500" dir="rtl">
                    تم تفعيل التوصيل المجاني لطلبك.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-sm font-semibold text-white sm:text-base">
                    Add{' '}
                    <span className="text-amber-400">
                      {formatPrice(remainingForFree)}
                    </span>{' '}
                    more to unlock FREE delivery
                  </p>
                  <p className="mt-0.5 text-xs text-neutral-400">
                    Free shipping on orders over{' '}
                    {formatPrice(freeShippingThreshold)}.
                  </p>
                </>
              )}

              {/* Progress bar */}
              <div className="mt-3 flex items-center gap-3">
                <div
                  className="h-2 w-full overflow-hidden rounded-full bg-neutral-800"
                  role="progressbar"
                  aria-valuenow={progressPct}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      hasFreeShipping
                        ? 'bg-gradient-to-r from-emerald-400 to-emerald-600'
                        : 'bg-gradient-to-r from-amber-400 to-amber-600'
                    }`}
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
                <span className="shrink-0 text-xs font-semibold text-white">
                  {progressPct}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ============== ITEMS + SUMMARY ============== */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">
          {/* Items column */}
          <div>
            <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/40">
              {items.map((item, idx) => {
                const product = getProductById(item.id);
                const oldPrice =
                  product && product.oldPrice ? product.oldPrice : null;
                const lineTotal = item.price * item.quantity;
                const lineOriginal =
                  (oldPrice || item.price) * item.quantity;
                const lineSavings = Math.max(0, lineOriginal - lineTotal);

                return (
                  <article
                    key={item.id}
                    className={`flex flex-col gap-4 p-5 sm:flex-row ${
                      idx > 0 ? 'border-t border-neutral-800' : ''
                    }`}
                  >
                    {/* Image */}
                    <Link
                      to={`/product/${item.id}`}
                      className="relative block aspect-square w-full shrink-0 overflow-hidden rounded-xl bg-neutral-950 sm:w-32 lg:w-36"
                      aria-label={item.name}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                        loading="lazy"
                      />
                    </Link>

                    {/* Body */}
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-[11px] font-medium uppercase tracking-wider text-neutral-500">
                            {item.brand}
                          </p>
                          <Link
                            to={`/product/${item.id}`}
                            className="mt-0.5 line-clamp-2 text-sm font-semibold text-white transition-colors hover:text-amber-400 sm:text-base"
                          >
                            {item.name}
                          </Link>
                          <div className="mt-2 flex flex-wrap items-baseline gap-2 text-sm">
                            <span className="font-bold text-amber-400">
                              {formatPrice(item.price)}
                            </span>
                            {oldPrice && oldPrice > item.price && (
                              <>
                                <span className="text-xs text-neutral-500 line-through">
                                  {formatPrice(oldPrice)}
                                </span>
                                <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
                                  Save{' '}
                                  {formatPrice(oldPrice - item.price)}
                                </span>
                              </>
                            )}
                          </div>
                        </div>

                        <button
                          type="button"
                          aria-label={`Remove ${item.name}`}
                          onClick={() => removeFromCart(item.id)}
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-red-500/10 hover:text-red-400"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-4">
                        {/* Quantity stepper with bounds */}
                        <div className="inline-flex items-center rounded-full border border-neutral-700 bg-neutral-900">
                          <button
                            type="button"
                            aria-label="Decrease quantity"
                            onClick={() => decrementItem(item.id)}
                            disabled={item.quantity <= 1}
                            className="flex h-10 w-10 items-center justify-center rounded-l-full text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span
                            className="w-10 text-center text-sm font-semibold text-white"
                            aria-live="polite"
                          >
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            aria-label="Increase quantity"
                            onClick={() => incrementItem(item.id)}
                            disabled={item.quantity >= 99}
                            className="flex h-10 w-10 items-center justify-center rounded-r-full text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        {/* Line total */}
                        <div className="text-right">
                          <p className="text-base font-bold text-white">
                            {formatPrice(lineTotal)}
                          </p>
                          {lineSavings > 0 && (
                            <p className="text-xs text-emerald-400">
                              − {formatPrice(lineSavings)}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Cart actions */}
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm font-medium text-neutral-300 transition-colors hover:text-amber-400"
              >
                <ArrowLeft className="h-4 w-4" />
                Continue shopping
              </Link>
              <button
                type="button"
                onClick={() => {
                  if (
                    typeof window !== 'undefined' &&
                    window.confirm('Remove all items from your cart?')
                  ) {
                    clearCart();
                  }
                }}
                className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition-colors hover:text-red-400"
              >
                <Trash2 className="h-4 w-4" />
                Clear cart
              </button>
            </div>
          </div>

          {/* ============== SUMMARY SIDEBAR ============== */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-neutral-800 bg-gradient-to-br from-neutral-900 via-black to-neutral-900 p-6">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-white">
                Order Summary
              </h2>

              <dl className="mt-5 space-y-3 text-sm">
                <div className="flex items-baseline justify-between gap-3">
                  <dt className="text-neutral-400">
                    Subtotal{' '}
                    <span className="text-xs text-neutral-600">
                      ({itemsCount} item{itemsCount !== 1 ? 's' : ''})
                    </span>
                  </dt>
                  <dd className="text-right">
                    <span className="font-semibold text-white">
                      {formatPrice(subtotal)}
                    </span>
                    {totalSavings > 0 && (
                      <span className="ml-2 text-xs text-neutral-500 line-through">
                        {formatPrice(originalSubtotal)}
                      </span>
                    )}
                  </dd>
                </div>

                {totalSavings > 0 && (
                  <div className="flex items-baseline justify-between gap-3">
                    <dt className="flex items-center gap-1.5 text-emerald-400">
                      <Tag className="h-3.5 w-3.5" />
                      Total savings
                    </dt>
                    <dd className="font-semibold text-emerald-400">
                      − {formatPrice(totalSavings)}
                    </dd>
                  </div>
                )}

                <div className="flex items-baseline justify-between gap-3">
                  <dt className="text-neutral-400">Shipping</dt>
                  <dd
                    className={`font-semibold ${
                      shipping === 0 ? 'text-emerald-400' : 'text-white'
                    }`}
                  >
                    {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                  </dd>
                </div>
              </dl>

              <div className="my-5 h-px bg-neutral-800" />

              <div className="flex items-baseline justify-between">
                <p className="text-sm font-semibold text-white">Total</p>
                <p className="text-2xl font-bold text-amber-400">
                  {formatPrice(total)}
                </p>
              </div>
              <p className="mt-1 text-right text-xs text-neutral-500">
                VAT included
              </p>

              <Link
                to="/checkout"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 px-6 py-4 text-sm font-semibold text-black shadow-lg shadow-amber-500/20 transition-all hover:shadow-amber-400/40"
              >
                Proceed to Checkout
                <ArrowRight className="h-4 w-4" />
              </Link>

              {/* Trust strip */}
              <div className="mt-6 grid grid-cols-2 gap-3 border-t border-neutral-800 pt-5 text-xs">
                <div className="flex items-center gap-2 text-neutral-400">
                  <ShieldCheck className="h-4 w-4 text-amber-400" />
                  100% Authentic
                </div>
                <div className="flex items-center gap-2 text-neutral-400">
                  <Truck className="h-4 w-4 text-amber-400" />
                  24-72h delivery
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};

export default CartPage;

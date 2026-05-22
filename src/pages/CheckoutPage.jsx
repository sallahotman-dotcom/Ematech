import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  User,
  Phone,
  MapPin,
  FileText,
  Banknote,
  Truck,
  ShieldCheck,
  PackageOpen,
  Sparkles,
  Loader2,
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import TrustBadges from '../components/TrustBadges';

// Make.com webhook for COD order automation
const MAKE_WEBHOOK_URL =
  'https://hook.eu1.make.com/c8kqtbpb7kvytk4fj89mcnk4ftpe52jm';
const WEBHOOK_TIMEOUT_MS = 15000;
const ORDER_STORAGE_KEY = 'ematech_last_order';

// Major Moroccan cities, ordered by population/relevance.
const MOROCCAN_CITIES = [
  'Casablanca',
  'Rabat',
  'Marrakech',
  'Fès',
  'Tanger',
  'Agadir',
  'Meknès',
  'Oujda',
  'Kénitra',
  'Tétouan',
  'Salé',
  'Mohammedia',
  'El Jadida',
  'Béni Mellal',
  'Nador',
  'Settat',
  'Khouribga',
  'Larache',
  'Khémisset',
  'Taza',
  'Safi',
  'Berkane',
  'Errachidia',
  'Ouarzazate',
  'Essaouira',
  'Other'
];

const generateOrderId = () => {
  const ts = Date.now().toString().slice(-7);
  return `EM-${ts}`;
};

const CheckoutPage = () => {
  const {
    items,
    itemsCount,
    subtotal,
    shipping,
    total,
    freeShippingThreshold,
    formatPrice,
    clearCart
  } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    city: '',
    address: '',
    notes: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // ============== EMPTY CART STATE ==============
  if (items.length === 0) {
    return (
      <section className="bg-neutral-950">
        <div className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-6 py-20 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/10">
            <PackageOpen className="h-10 w-10 text-amber-400" />
          </div>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">
            Secure Checkout
          </p>
          <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
            Nothing to checkout
          </h1>
          <p className="mt-3 max-w-md text-sm text-neutral-400">
            Your cart is empty. Add a few products before proceeding to
            checkout.
          </p>
          <p className="mt-2 text-xs text-neutral-500" dir="rtl">
            سلتك فارغة. أضف بعض المنتجات قبل إتمام الطلب.
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
              to="/cart"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-900/60 px-7 py-3 text-sm font-semibold text-white transition-all hover:border-amber-400 hover:text-amber-400"
            >
              View Cart
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // ============== FORM HANDLERS ==============
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
    if (submitError) setSubmitError(null);
  };

  const validate = () => {
    const errs = {};
    if (!form.fullName.trim() || form.fullName.trim().length < 3) {
      errs.fullName = 'Please enter your full name (min 3 characters).';
    }
    const phoneClean = form.phone.replace(/[\s-]/g, '');
    if (!phoneClean) {
      errs.phone = 'Phone number is required.';
    } else if (!/^(?:\+212|212|0)\d{9}$/.test(phoneClean)) {
      errs.phone = 'Enter a valid Moroccan phone (e.g. 06XXXXXXXX).';
    }
    if (!form.city) {
      errs.city = 'Please select your city.';
    }
    if (!form.address.trim() || form.address.trim().length < 5) {
      errs.address = 'Please enter your delivery address.';
    }
    return errs;
  };

  // Build the strict Make.com payload as specified by the user:
  // Customer details (Name, Phone, City) + Cart details
  // (Product_ID, Product_Name, Quantity, Price_MAD, Total_Amount).
  // Order metadata is included as a separate section so the
  // automation can fulfill the delivery (address, grand total, etc.)
  // without polluting the strict Customer/Cart shape.
  const buildWebhookPayload = (orderId, placedAt) => ({
    Customer: {
      Name: form.fullName.trim(),
      Phone: form.phone.trim(),
      City: form.city
    },
    Cart: items.map((item) => ({
      Product_ID: item.id,
      Product_Name: item.name,
      Quantity: item.quantity,
      Price_MAD: item.price,
      Total_Amount: item.price * item.quantity
    })),
    Order: {
      Order_ID: orderId,
      Subtotal_MAD: subtotal,
      Shipping_MAD: shipping,
      Total_MAD: total,
      Currency: 'MAD',
      Address: form.address.trim(),
      Notes: form.notes.trim(),
      Payment_Method: 'Cash on Delivery',
      Placed_At: placedAt,
      Source: 'ematech.web'
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);

    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      const firstField = Object.keys(errs)[0];
      const el =
        typeof document !== 'undefined'
          ? document.querySelector(`[name="${firstField}"]`)
          : null;
      if (el && typeof el.scrollIntoView === 'function') {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        if (typeof el.focus === 'function') el.focus({ preventScroll: true });
      }
      return;
    }

    setIsSubmitting(true);

    const orderId = generateOrderId();
    const placedAt = new Date().toISOString();

    const orderSnapshot = {
      id: orderId,
      customer: {
        fullName: form.fullName.trim(),
        phone: form.phone.trim(),
        city: form.city,
        address: form.address.trim(),
        notes: form.notes.trim()
      },
      items: items.map((it) => ({ ...it })),
      itemsCount,
      subtotal,
      shipping,
      total,
      placedAt
    };

    const payload = buildWebhookPayload(orderId, placedAt);

    // Fire the webhook with a generous timeout so the UI isn't
    // stuck if Make.com is slow or unreachable.
    const controller = new AbortController();
    const timeoutId =
      typeof window !== 'undefined'
        ? window.setTimeout(() => controller.abort(), WEBHOOK_TIMEOUT_MS)
        : null;

    try {
      const res = await fetch(MAKE_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      if (timeoutId !== null) window.clearTimeout(timeoutId);

      if (!res.ok) {
        throw new Error(`Webhook responded with status ${res.status}`);
      }

      // Persist the snapshot for refresh-resilient Thank-You rendering
      try {
        if (typeof window !== 'undefined' && window.sessionStorage) {
          window.sessionStorage.setItem(
            ORDER_STORAGE_KEY,
            JSON.stringify(orderSnapshot)
          );
        }
      } catch (_) {
        // Ignore quota / privacy-mode failures
      }

      // Empty the cart and redirect to the success screen
      clearCart();
      navigate('/thank-you', { state: orderSnapshot, replace: true });
    } catch (err) {
      if (timeoutId !== null) window.clearTimeout(timeoutId);
      // eslint-disable-next-line no-console
      console.error('Ematech checkout: webhook submission failed.', err);
      setSubmitError(
        err && err.name === 'AbortError'
          ? 'The order took too long to process. Please check your connection and try again.'
          : 'We could not submit your order right now. Please try again or contact us via WhatsApp.'
      );
      setIsSubmitting(false);
    }
  };

  const remainingForFree = Math.max(0, freeShippingThreshold - subtotal);
  const hasFreeShipping = subtotal >= freeShippingThreshold;

  // ============== FORM RENDER ==============
  return (
    <div className="bg-neutral-950">
      {/* Header */}
      <section className="border-b border-neutral-800 bg-black">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <Link
            to="/cart"
            className="inline-flex items-center gap-1 text-xs text-neutral-500 transition-colors hover:text-amber-400"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            Back to cart
          </Link>
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">
            Secure Checkout
          </p>
          <h1 className="mt-2 text-4xl font-bold text-white sm:text-5xl">
            Complete your order
          </h1>
          <p className="mt-2 text-sm text-neutral-400">
            Cash on delivery — pay when you receive your package across Morocco.
          </p>
        </div>
      </section>

      <form onSubmit={handleSubmit} noValidate>
        <section className="mx-auto max-w-7xl px-6 py-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_400px]">
            {/* ============== LEFT COLUMN: FORM ============== */}
            <div className="space-y-6">
              {/* Contact info card */}
              <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-amber-400" />
                  <h2 className="text-base font-semibold text-white">
                    Contact information
                  </h2>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-4">
                  {/* Full name */}
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-xs font-medium uppercase tracking-wider text-neutral-400"
                    >
                      Full name <span className="text-amber-400">*</span>
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      autoComplete="name"
                      placeholder="e.g. Mohamed El Amrani"
                      value={form.fullName}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.fullName)}
                      className={`mt-2 w-full rounded-lg border bg-neutral-900 px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none transition-colors focus:border-amber-400 ${
                        errors.fullName
                          ? 'border-red-500/60'
                          : 'border-neutral-700'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="mt-1.5 text-xs text-red-400">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs font-medium uppercase tracking-wider text-neutral-400"
                    >
                      Phone number <span className="text-amber-400">*</span>
                    </label>
                    <div className="relative mt-2">
                      <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder="06 12 34 56 78"
                        value={form.phone}
                        onChange={handleChange}
                        aria-invalid={Boolean(errors.phone)}
                        className={`w-full rounded-lg border bg-neutral-900 py-3 pl-10 pr-4 text-sm text-white placeholder-neutral-500 outline-none transition-colors focus:border-amber-400 ${
                          errors.phone
                            ? 'border-red-500/60'
                            : 'border-neutral-700'
                        }`}
                      />
                    </div>
                    {errors.phone ? (
                      <p className="mt-1.5 text-xs text-red-400">
                        {errors.phone}
                      </p>
                    ) : (
                      <p className="mt-1.5 text-xs text-neutral-500">
                        We&apos;ll call you on this number to confirm delivery.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Delivery info card */}
              <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-amber-400" />
                  <h2 className="text-base font-semibold text-white">
                    Delivery address
                  </h2>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {/* City dropdown */}
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-xs font-medium uppercase tracking-wider text-neutral-400"
                    >
                      City <span className="text-amber-400">*</span>
                    </label>
                    <div className="relative mt-2">
                      <select
                        id="city"
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        aria-invalid={Boolean(errors.city)}
                        className={`w-full appearance-none rounded-lg border bg-neutral-900 px-4 py-3 pr-10 text-sm outline-none transition-colors focus:border-amber-400 ${
                          errors.city
                            ? 'border-red-500/60'
                            : 'border-neutral-700'
                        } ${form.city ? 'text-white' : 'text-neutral-500'}`}
                      >
                        <option value="" disabled className="bg-neutral-900">
                          Select your city
                        </option>
                        {MOROCCAN_CITIES.map((c) => (
                          <option
                            key={c}
                            value={c}
                            className="bg-neutral-900 text-white"
                          >
                            {c}
                          </option>
                        ))}
                      </select>
                      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-neutral-500">
                        ▾
                      </span>
                    </div>
                    {errors.city && (
                      <p className="mt-1.5 text-xs text-red-400">
                        {errors.city}
                      </p>
                    )}
                  </div>

                  {/* Address */}
                  <div>
                    <label
                      htmlFor="address"
                      className="block text-xs font-medium uppercase tracking-wider text-neutral-400"
                    >
                      Street address <span className="text-amber-400">*</span>
                    </label>
                    <input
                      id="address"
                      name="address"
                      type="text"
                      autoComplete="street-address"
                      placeholder="Building, street, district"
                      value={form.address}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.address)}
                      className={`mt-2 w-full rounded-lg border bg-neutral-900 px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none transition-colors focus:border-amber-400 ${
                        errors.address
                          ? 'border-red-500/60'
                          : 'border-neutral-700'
                      }`}
                    />
                    {errors.address && (
                      <p className="mt-1.5 text-xs text-red-400">
                        {errors.address}
                      </p>
                    )}
                  </div>

                  {/* Notes */}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="notes"
                      className="block text-xs font-medium uppercase tracking-wider text-neutral-400"
                    >
                      Delivery notes (optional)
                    </label>
                    <div className="relative mt-2">
                      <FileText className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-neutral-500" />
                      <textarea
                        id="notes"
                        name="notes"
                        rows={3}
                        placeholder="Floor, doorbell, landmark, preferred delivery time..."
                        value={form.notes}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-neutral-700 bg-neutral-900 py-3 pl-10 pr-4 text-sm text-white placeholder-neutral-500 outline-none transition-colors focus:border-amber-400"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment method card */}
              <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6">
                <div className="flex items-center gap-2">
                  <Banknote className="h-5 w-5 text-amber-400" />
                  <h2 className="text-base font-semibold text-white">
                    Payment method
                  </h2>
                </div>

                <div className="mt-5 rounded-xl border-2 border-amber-500/60 bg-gradient-to-br from-amber-500/10 to-transparent p-5">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-amber-400 bg-amber-400">
                      <div className="h-2 w-2 rounded-full bg-black" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-semibold text-white">
                          Cash on Delivery
                        </p>
                        <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-semibold text-emerald-300">
                          Recommended
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-neutral-400">
                        Pay in cash when our courier delivers your order. No
                        commitment until you have your package in hand.
                      </p>
                      <p className="mt-1 text-xs text-neutral-500" dir="rtl">
                        ادفع نقداً عند استلام الطلب.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ============== RIGHT COLUMN: ORDER SUMMARY ============== */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-gradient-to-br from-neutral-900 via-black to-neutral-900">
                <div className="border-b border-neutral-800 px-6 py-4">
                  <h2 className="text-sm font-semibold uppercase tracking-widest text-white">
                    Your order
                  </h2>
                  <p className="mt-1 text-xs text-neutral-500">
                    {itemsCount} item{itemsCount !== 1 ? 's' : ''}
                  </p>
                </div>

                {/* Items list (compact) */}
                <ul className="max-h-72 divide-y divide-neutral-800 overflow-y-auto px-6 py-2">
                  {items.map((item) => (
                    <li key={item.id} className="flex items-center gap-3 py-3">
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-neutral-800 bg-neutral-950">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-[11px] font-bold text-black ring-2 ring-neutral-950">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-1 text-xs font-medium text-white">
                          {item.name}
                        </p>
                        <p className="text-[11px] text-neutral-500">
                          {item.brand}
                        </p>
                      </div>
                      <p className="shrink-0 text-xs font-semibold text-white">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </li>
                  ))}
                </ul>

                {/* Free shipping nudge */}
                {!hasFreeShipping && remainingForFree > 0 && (
                  <div className="mx-6 mb-4 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-200">
                    Add {formatPrice(remainingForFree)} more to unlock free
                    shipping.
                  </div>
                )}

                {/* Totals */}
                <dl className="space-y-3 px-6 py-4 text-sm">
                  <div className="flex items-baseline justify-between gap-3">
                    <dt className="text-neutral-400">Subtotal</dt>
                    <dd className="font-semibold text-white">
                      {formatPrice(subtotal)}
                    </dd>
                  </div>
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

                <div className="mx-6 h-px bg-neutral-800" />

                <div className="flex items-baseline justify-between px-6 py-4">
                  <p className="text-sm font-semibold text-white">Total</p>
                  <p className="text-2xl font-bold text-amber-400">
                    {formatPrice(total)}
                  </p>
                </div>

                <div className="border-t border-neutral-800 bg-neutral-950/40 px-6 py-5">
                  {/* Submit error banner */}
                  {submitError && (
                    <div
                      role="alert"
                      className="mb-4 flex items-start gap-2 rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-xs text-red-300"
                    >
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 px-6 py-4 text-sm font-semibold text-black shadow-lg shadow-amber-500/20 transition-all hover:shadow-amber-400/40 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Placing order...
                      </>
                    ) : (
                      <>
                        Place Order
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                  <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[11px] text-neutral-500">
                    <ShieldCheck className="h-3.5 w-3.5 text-amber-400" />
                    Your information is private and never shared.
                  </p>
                  <p className="mt-1 flex items-center justify-center gap-1.5 text-center text-[11px] text-neutral-500">
                    <Truck className="h-3.5 w-3.5 text-amber-400" />
                    Cash on delivery anywhere in Morocco.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </form>

      {/* Trust badges shown directly under the form */}
      <TrustBadges />
    </div>
  );
};

export default CheckoutPage;

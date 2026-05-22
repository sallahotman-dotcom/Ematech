import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  CheckCircle2,
  Sparkles,
  Truck,
  ShieldCheck,
  Headphones,
  ArrowRight,
  MessageCircle,
  PackageCheck
} from 'lucide-react';
import { useCart } from '../context/CartContext';

const ORDER_STORAGE_KEY = 'ematech_last_order';
const WHATSAPP_PHONE = '212522000000';

const ThankYouPage = () => {
  const location = useLocation();
  const { formatPrice } = useCart();
  const [order, setOrder] = useState(null);

  // Hydrate from navigation state, falling back to sessionStorage so
  // the success screen survives a manual refresh.
  useEffect(() => {
    const fromState = location && location.state;
    if (fromState && fromState.id && fromState.customer) {
      setOrder(fromState);
      try {
        if (typeof window !== 'undefined' && window.sessionStorage) {
          window.sessionStorage.setItem(
            ORDER_STORAGE_KEY,
            JSON.stringify(fromState)
          );
        }
      } catch (_) {
        // ignore storage write failures (private mode, quota, etc.)
      }
      return;
    }

    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        const raw = window.sessionStorage.getItem(ORDER_STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed && parsed.id && parsed.customer) {
            setOrder(parsed);
          }
        }
      }
    } catch (_) {
      // ignore parse / read failures
    }
  }, [location]);

  // ============== GENERIC CONFIRMATION (no order context) ==============
  if (!order) {
    return (
      <div className="bg-neutral-950">
        <section className="relative overflow-hidden bg-black">
          <div className="pointer-events-none absolute -top-40 -left-40 h-[28rem] w-[28rem] rounded-full bg-amber-500/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-40 right-0 h-[28rem] w-[28rem] rounded-full bg-emerald-500/10 blur-3xl" />

          <div className="relative mx-auto max-w-3xl px-6 py-20 text-center sm:py-24">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-xl shadow-emerald-500/40">
              <PackageCheck
                className="h-12 w-12 text-white"
                strokeWidth={2.5}
              />
            </div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-400">
              Thank you
            </p>
            <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl">
              Your order is being processed
            </h1>
            <p className="mt-3 text-base text-neutral-400">
              Our team will reach out shortly to confirm the delivery details.
              In the meantime, feel free to keep exploring the Ematech
              collection.
            </p>
            <p className="mt-2 text-sm text-neutral-500" dir="rtl">
              شكراً لك. سنتواصل معك قريباً لتأكيد طلبك.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 px-7 py-3 text-sm font-semibold text-black shadow-lg shadow-amber-500/20 transition-all hover:shadow-amber-400/40"
              >
                <Sparkles className="h-4 w-4" />
                Back to Home
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-900/60 px-7 py-3 text-sm font-semibold text-white transition-all hover:border-amber-400 hover:text-amber-400"
              >
                Contact support
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // ============== FULL SUCCESS SCREEN ==============
  const firstName = order.customer.fullName.split(' ')[0] || 'friend';

  const whatsAppLink = (() => {
    const lines = [
      'السلام عليكم،',
      `أود تأكيد طلبي رقم: ${order.id}`,
      `الاسم: ${order.customer.fullName}`,
      `المدينة: ${order.customer.city}`,
      `المجموع: ${formatPrice(order.total)}`,
      '',
      'شكراً لكم.'
    ];
    return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
      lines.join('\n')
    )}`;
  })();

  return (
    <div className="bg-neutral-950">
      <section className="relative overflow-hidden bg-black">
        <div className="pointer-events-none absolute -top-40 -right-40 h-[28rem] w-[28rem] rounded-full bg-emerald-500/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-40 h-[28rem] w-[28rem] rounded-full bg-amber-500/15 blur-3xl" />

        <div className="relative mx-auto max-w-3xl px-6 py-16 text-center sm:py-24">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-xl shadow-emerald-500/40">
            <CheckCircle2 className="h-12 w-12 text-white" strokeWidth={2.5} />
          </div>

          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-400">
            Order Confirmed
          </p>
          <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl">
            Thank you, {firstName}!
          </h1>
          <p className="mt-3 text-base text-neutral-400">
            Your order has been received. Our team will contact you shortly to
            confirm the delivery.
          </p>
          <p className="mt-2 text-sm text-neutral-500" dir="rtl">
            شكراً لك على ثقتك في Ematech. سنتواصل معك قريباً لتأكيد الطلب.
          </p>

          {/* Order number badge */}
          <div className="mt-10 inline-flex flex-col items-center rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-transparent px-8 py-6">
            <p className="text-xs uppercase tracking-widest text-amber-300">
              Order Number
            </p>
            <p className="mt-2 text-3xl font-bold text-white sm:text-4xl">
              {order.id}
            </p>
            <p className="mt-3 text-xs text-neutral-400">
              Save this reference for any future inquiries.
            </p>
          </div>

          {/* Order details */}
          <div className="mx-auto mt-10 max-w-md rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 text-left text-sm">
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-amber-400">
              Order Summary
            </h2>
            <dl className="space-y-2.5">
              <div className="flex items-baseline justify-between gap-3">
                <dt className="text-neutral-400">Items</dt>
                <dd className="text-white">{order.itemsCount}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-3">
                <dt className="text-neutral-400">Delivery to</dt>
                <dd className="text-right text-white">
                  {order.customer.city}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-3">
                <dt className="text-neutral-400">Phone</dt>
                <dd className="text-white">{order.customer.phone}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-3">
                <dt className="text-neutral-400">Payment</dt>
                <dd className="text-white">Cash on Delivery</dd>
              </div>
              <div className="flex items-baseline justify-between gap-3">
                <dt className="text-neutral-400">Shipping</dt>
                <dd
                  className={
                    order.shipping === 0 ? 'text-emerald-400' : 'text-white'
                  }
                >
                  {order.shipping === 0 ? 'FREE' : formatPrice(order.shipping)}
                </dd>
              </div>
              <div className="my-2 h-px bg-neutral-800" />
              <div className="flex items-baseline justify-between gap-3">
                <dt className="font-semibold text-white">Total</dt>
                <dd className="text-xl font-bold text-amber-400">
                  {formatPrice(order.total)}
                </dd>
              </div>
            </dl>
          </div>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 px-7 py-3 text-sm font-semibold text-black shadow-lg shadow-amber-500/20 transition-all hover:shadow-amber-400/40"
            >
              <Sparkles className="h-4 w-4" />
              Back to Home
            </Link>
            <a
              href={whatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all hover:shadow-emerald-400/40"
            >
              <MessageCircle className="h-4 w-4" />
              Confirm on WhatsApp
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* Trust strip */}
          <div className="mx-auto mt-12 grid max-w-md grid-cols-3 gap-4 border-t border-neutral-800 pt-8 text-xs text-neutral-400">
            <div className="flex flex-col items-center gap-1.5">
              <Truck className="h-5 w-5 text-amber-400" />
              <span>24-72h</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <ShieldCheck className="h-5 w-5 text-amber-400" />
              <span>Authentic</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <Headphones className="h-5 w-5 text-amber-400" />
              <span>7/7 support</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ThankYouPage;

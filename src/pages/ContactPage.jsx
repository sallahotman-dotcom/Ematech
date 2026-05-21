import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  Home as HomeIcon,
  Mail,
  Phone,
  MapPin,
  Clock,
  Plus,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Truck,
  Headphones
} from 'lucide-react';

// Public store contact details (set by the store owner).
const SUPPORT_EMAIL = 'Sallahotman@gmail.com';
const SUPPORT_PHONE_DISPLAY = '06 06 01 87 03 1';
const SUPPORT_PHONE_RAW = '06060187031';

const FAQS = [
  {
    q: 'How long does delivery take?',
    a: 'We deliver across all of Morocco within 24 to 72 hours, depending on your city. Orders placed before 14:00 are usually shipped the same day from Casablanca.'
  },
  {
    q: 'Do you ship to all Moroccan cities?',
    a: 'Yes — from Casablanca and Rabat to Dakhla, Errachidia and Al Hoceïma, our courier partners cover 50+ cities and rural delivery points across the Kingdom.'
  },
  {
    q: 'What payment methods do you accept?',
    a: 'Cash on Delivery (COD) is always available — you only pay when the package is in your hands. Bank transfer and card payment options are coming soon.'
  },
  {
    q: 'Are your products 100% authentic?',
    a: 'Absolutely. Every Ematech product is sourced from the brand or its authorised distributors. Original boxes, original seals, and full international warranty.'
  },
  {
    q: 'What is your return policy?',
    a: 'You have a 7-day return window from the moment you receive your order. Items must be unused, in original packaging, and accompanied by all accessories.'
  },
  {
    q: 'How can I track my order?',
    a: 'Once your order ships, our team contacts you on WhatsApp with the tracking reference and the courier\'s phone number, so you can follow the delivery in real time.'
  },
  {
    q: 'Do products come with a warranty?',
    a: 'Yes. All products carry the manufacturer warranty (typically 12 to 24 months). Ematech also offers a courtesy after-sales service to handle any warranty claim on your behalf.'
  },
  {
    q: 'Can I order via WhatsApp?',
    a: 'Yes. On any product page, tap the green "Order via WhatsApp" button — it pre-fills a confirmation message in Arabic so we can validate and ship your order in minutes.'
  }
];

const FaqItem = ({ question, answer, isOpen, onToggle }) => (
  <div
    className={`overflow-hidden rounded-2xl border transition-colors ${
      isOpen
        ? 'border-amber-500/40 bg-gradient-to-br from-neutral-900 to-black'
        : 'border-neutral-800 bg-neutral-900/40 hover:border-neutral-700'
    }`}
  >
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isOpen}
      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
    >
      <span
        className={`text-sm font-semibold transition-colors sm:text-base ${
          isOpen ? 'text-amber-400' : 'text-white'
        }`}
      >
        {question}
      </span>
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
          isOpen
            ? 'rotate-45 border-amber-400 bg-amber-400/10 text-amber-400'
            : 'border-neutral-700 bg-neutral-900 text-neutral-400'
        }`}
        aria-hidden="true"
      >
        <Plus className="h-4 w-4" />
      </span>
    </button>

    {/* Smooth grid-rows accordion (no JS height calculations) */}
    <div
      className={`grid transition-all duration-300 ease-out ${
        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
      }`}
    >
      <div className="min-h-0 overflow-hidden">
        <p className="px-5 pb-5 text-sm leading-relaxed text-neutral-400">
          {answer}
        </p>
      </div>
    </div>
  </div>
);

const ContactPage = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const handleToggle = (idx) => {
    setOpenIndex((prev) => (prev === idx ? -1 : idx));
  };

  return (
    <div className="bg-neutral-950">
      {/* ============== HERO HEADER ============== */}
      <section className="relative overflow-hidden border-b border-neutral-800 bg-black">
        <div className="pointer-events-none absolute -top-40 -left-40 h-[28rem] w-[28rem] rounded-full bg-amber-500/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 right-0 h-[28rem] w-[28rem] rounded-full bg-amber-300/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-16 lg:py-20">
          <nav
            aria-label="Breadcrumb"
            className="mb-5 flex items-center gap-2 text-xs text-neutral-500"
          >
            <Link
              to="/"
              className="flex items-center gap-1 transition-colors hover:text-amber-400"
            >
              <HomeIcon className="h-3.5 w-3.5" />
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-neutral-300">Contact</span>
          </nav>

          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">
            Customer Care
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Get in{' '}
            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600 bg-clip-text text-transparent">
              touch
            </span>
            {' '}with us.
          </h1>
          <p className="mt-5 max-w-2xl text-base text-neutral-400 sm:text-lg">
            Real humans, 7 days a week. Whether you need help choosing a
            product, tracking an order, or claiming a warranty — we are one
            email or one phone call away.
          </p>
          <p className="mt-3 max-w-2xl text-sm text-neutral-500" dir="rtl">
            فريقنا متوفر 7 أيام في الأسبوع للإجابة على جميع أسئلتك ومرافقتك
            في تجربة التسوق.
          </p>
        </div>
      </section>

      {/* ============== CONTACT CARDS ============== */}
      <section className="bg-neutral-950 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Email card */}
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="group relative overflow-hidden rounded-2xl border border-neutral-800 bg-gradient-to-br from-neutral-900 to-black p-8 transition-all hover:-translate-y-0.5 hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-500/10"
            >
              <div className="pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full bg-amber-500/10 blur-3xl transition-opacity group-hover:bg-amber-500/20" />

              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 text-black shadow-lg shadow-amber-500/30">
                  <Mail className="h-7 w-7" />
                </div>

                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">
                  Email us
                </p>
                <h2 className="mt-2 text-xl font-bold text-white sm:text-2xl">
                  We reply within hours
                </h2>
                <p className="mt-2 text-sm text-neutral-400">
                  For order help, partnerships and after-sales requests, drop
                  us a line and our team will get back to you the same day.
                </p>

                <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm font-semibold text-amber-300">
                  <Mail className="h-4 w-4" />
                  {SUPPORT_EMAIL}
                </div>

                <div className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-amber-400 transition-transform group-hover:translate-x-1">
                  Send an email
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </a>

            {/* Phone card */}
            <a
              href={`tel:${SUPPORT_PHONE_RAW}`}
              className="group relative overflow-hidden rounded-2xl border border-neutral-800 bg-gradient-to-br from-neutral-900 to-black p-8 transition-all hover:-translate-y-0.5 hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-500/10"
            >
              <div className="pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full bg-amber-500/10 blur-3xl transition-opacity group-hover:bg-amber-500/20" />

              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 text-black shadow-lg shadow-amber-500/30">
                  <Phone className="h-7 w-7" />
                </div>

                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">
                  Call us
                </p>
                <h2 className="mt-2 text-xl font-bold text-white sm:text-2xl">
                  Talk to a human
                </h2>
                <p className="mt-2 text-sm text-neutral-400">
                  Our customer care team picks up in Darija, Arabic, French and
                  English. Available every day from 9:00 to 21:00 (GMT+1).
                </p>

                <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm font-semibold text-amber-300">
                  <Phone className="h-4 w-4" />
                  {SUPPORT_PHONE_DISPLAY}
                </div>

                <div className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-amber-400 transition-transform group-hover:translate-x-1">
                  Call now
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </a>
          </div>

          {/* Hours + Location strip */}
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex items-start gap-4 rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-white">
                  Support Hours
                </p>
                <p className="mt-1 text-sm text-neutral-400">
                  Mon - Sun, 9:00 - 21:00 (GMT+1)
                </p>
                <p className="mt-1 text-xs text-neutral-500" dir="rtl">
                  متوفرون كل أيام الأسبوع.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-white">
                  Headquarters
                </p>
                <p className="mt-1 text-sm text-neutral-400">
                  Boulevard Mohammed V, Casablanca, Morocco
                </p>
                <p className="mt-1 text-xs text-neutral-500">
                  Serving 50+ cities nationwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============== FAQ ============== */}
      <section className="border-t border-neutral-900 bg-black py-20">
        <div className="mx-auto max-w-3xl px-6">
          <div className="mb-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">
              Frequently asked
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              Answers in seconds
            </h2>
            <p className="mt-3 text-sm text-neutral-400">
              Quick answers to the questions our Moroccan customers ask the most.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <FaqItem
                key={faq.q}
                question={faq.q}
                answer={faq.a}
                isOpen={openIndex === idx}
                onToggle={() => handleToggle(idx)}
              />
            ))}
          </div>

          {/* Still have questions? */}
          <div className="mt-10 rounded-2xl border border-amber-500/20 bg-gradient-to-br from-neutral-900 via-black to-neutral-900 p-6 text-center">
            <p className="text-sm font-semibold text-white">
              Still have a question?
            </p>
            <p className="mt-1 text-xs text-neutral-400">
              Our care team typically responds within a few hours.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 px-6 py-2.5 text-sm font-semibold text-black shadow-lg shadow-amber-500/20 transition-all hover:shadow-amber-400/40"
              >
                <Mail className="h-4 w-4" />
                Email Ematech
              </a>
              <a
                href={`tel:${SUPPORT_PHONE_RAW}`}
                className="inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-900/60 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:border-amber-400 hover:text-amber-400"
              >
                <Phone className="h-4 w-4" />
                {SUPPORT_PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============== TRUST CTA ============== */}
      <section className="bg-neutral-950 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-3 rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5">
              <Truck className="h-5 w-5 text-amber-400" />
              <div>
                <p className="text-sm font-semibold text-white">
                  24-72h delivery
                </p>
                <p className="text-xs text-neutral-500">
                  Across all Moroccan cities
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5">
              <ShieldCheck className="h-5 w-5 text-amber-400" />
              <div>
                <p className="text-sm font-semibold text-white">
                  100% Authentic
                </p>
                <p className="text-xs text-neutral-500">
                  Original products, full warranty
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5">
              <Headphones className="h-5 w-5 text-amber-400" />
              <div>
                <p className="text-sm font-semibold text-white">7/7 support</p>
                <p className="text-xs text-neutral-500">
                  Customer care that listens
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 px-7 py-3 text-sm font-semibold text-black shadow-lg shadow-amber-500/20 transition-all hover:shadow-amber-400/40"
            >
              <Sparkles className="h-4 w-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;

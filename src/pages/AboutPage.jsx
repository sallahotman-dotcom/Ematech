import { Link } from 'react-router-dom';
import {
  ChevronRight,
  Home as HomeIcon,
  ShieldCheck,
  Truck,
  Award,
  Heart,
  Sparkles,
  ArrowRight,
  MapPin,
  Star,
  Headphones
} from 'lucide-react';

const PILLARS = [
  {
    icon: ShieldCheck,
    title: '100% Authentic',
    titleAr: 'منتجات أصلية',
    description:
      'Every Ematech product is sourced directly from the brand or its authorised distributors. No grey-market imports, no refurbished tricks. Original boxes, original seals, full international warranty.'
  },
  {
    icon: Truck,
    title: 'Fast Nationwide Delivery',
    titleAr: 'توصيل سريع',
    description:
      'From Casablanca to Dakhla, we deliver in 24 to 72 hours. Free shipping unlocks at 1,000 MAD, with real-time updates and a courier you can actually call.'
  },
  {
    icon: Award,
    title: 'Curated Selection',
    titleAr: 'اختيار راقي',
    description:
      'We don\'t list everything — we list what is worth your money. Hand-picked flagships across smartphones, smartwatches, premium audio and home appliances.'
  },
  {
    icon: Heart,
    title: 'Premium Service',
    titleAr: 'خدمة فاخرة',
    description:
      'Real humans, 7 days a week, in Darija, Arabic, French and English. We help you choose, set up and care for your new tech long after the order ships.'
  }
];

const STATS = [
  { value: '5,000+', label: 'Happy customers' },
  { value: '50+', label: 'Cities served' },
  { value: '4.8★', label: 'Average rating' },
  { value: '24-72h', label: 'Delivery time' }
];

const VALUES = [
  {
    title: 'Transparency',
    body: 'No hidden fees, no fake discounts. The price you see includes VAT, and our reviews are 100% genuine.'
  },
  {
    title: 'Trust',
    body: 'Cash on delivery is always available — you only pay when the package is in your hands.'
  },
  {
    title: 'Excellence',
    body: 'Every detail, from packaging to follow-up, is engineered to feel as premium as the products we sell.'
  }
];

const AboutPage = () => {
  return (
    <div className="bg-neutral-950">
      {/* ============== HERO HEADER ============== */}
      <section className="relative overflow-hidden border-b border-neutral-800 bg-black">
        <div className="pointer-events-none absolute -top-40 -left-40 h-[28rem] w-[28rem] rounded-full bg-amber-500/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 right-0 h-[28rem] w-[28rem] rounded-full bg-amber-300/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-16 lg:py-20">
          {/* Breadcrumb */}
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
            <span className="text-neutral-300">About</span>
          </nav>

          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">
            Our Story
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Premium tech for Morocco,{' '}
            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600 bg-clip-text text-transparent">
              the way it should be.
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-base text-neutral-400 sm:text-lg">
            Ematech is Morocco&apos;s premium destination for the smartphones,
            smartwatches, audio gear and home appliances that define the modern
            home — sourced authentically, delivered fast, and served with the
            care this technology deserves.
          </p>
          <p className="mt-3 max-w-2xl text-sm text-neutral-500" dir="rtl">
            Ematech هي وجهتك المغربية الأولى للتكنولوجيا الفاخرة. منتجات أصلية،
            توصيل سريع، وخدمة في مستوى علامتك المفضلة.
          </p>
        </div>
      </section>

      {/* ============== BRAND STORY ============== */}
      <section className="bg-neutral-950 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">
              The Why
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              Built for Morocco&apos;s tech enthusiasts
            </h2>
          </div>

          <div className="mx-auto mt-10 max-w-3xl space-y-6 text-base leading-relaxed text-neutral-400">
            <p>
              Ematech was born out of a simple frustration: buying premium
              technology in Morocco shouldn&apos;t mean compromising on
              authenticity, waiting weeks for delivery, or settling for service
              that disappears the moment your order ships.
            </p>
            <p>
              We started with a clear mission — bring the world&apos;s best tech
              brands to every Moroccan city, with the certainty of original
              products, the speed of next-day delivery, and the level of care
              you would expect from the brands themselves.
            </p>
            <p>
              Every smartphone, every smartwatch, every speaker and every
              appliance on Ematech is hand-picked by our team. We test them, we
              use them, and we only list what we would proudly recommend to our
              own families.
            </p>
            <p>
              Today, thousands of customers from Tangier to Dakhla trust Ematech
              for their tech upgrades. We are still small enough to know your
              name, and ambitious enough to keep raising the standard of premium
              tech retail in Morocco.
            </p>
          </div>
        </div>
      </section>

      {/* ============== PILLARS GRID ============== */}
      <section className="border-t border-neutral-900 bg-black py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">
              Our Promise
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              Why choose Ematech
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-neutral-400">
              Four commitments that guide every decision we make, from the
              brands we choose to the way your order arrives at your door.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <article
                  key={pillar.title}
                  className="group relative overflow-hidden rounded-2xl border border-neutral-800 bg-gradient-to-br from-neutral-900 to-black p-6 transition-all hover:-translate-y-0.5 hover:border-amber-500/40 hover:shadow-lg hover:shadow-amber-500/10"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 text-black shadow-md">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-white">
                    {pillar.title}
                  </h3>
                  <p className="mt-1 text-xs text-amber-300" dir="rtl">
                    {pillar.titleAr}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-400">
                    {pillar.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============== STATS ============== */}
      <section className="bg-neutral-950 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">
              The numbers
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              Trusted across the Kingdom
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="group rounded-2xl border border-neutral-800 bg-gradient-to-br from-neutral-900 to-black p-6 text-center transition-colors hover:border-amber-500/40"
              >
                <p className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-xs uppercase tracking-wider text-neutral-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============== VALUES STRIP ============== */}
      <section className="border-t border-neutral-900 bg-black py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">
              Our values
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              How we operate
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {VALUES.map((v, idx) => (
              <div
                key={v.title}
                className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6"
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-amber-400">
                  0{idx + 1}
                </p>
                <h3 className="mt-3 text-lg font-semibold text-white">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============== LOCATION + CTA ============== */}
      <section className="bg-neutral-950 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="relative overflow-hidden rounded-3xl border border-amber-500/20 bg-gradient-to-br from-neutral-900 via-black to-neutral-900 p-10 sm:p-14">
            <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-amber-500/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-amber-300/10 blur-3xl" />

            <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-4 py-1.5 text-xs font-medium text-amber-300">
                  <Sparkles className="h-3.5 w-3.5" />
                  Ready to upgrade?
                </div>
                <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
                  Discover the Ematech collection
                </h2>
                <p className="mt-3 max-w-xl text-sm text-neutral-400">
                  Explore our curated selection of premium technology, with the
                  fastest delivery and the most authentic products in Morocco.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 px-7 py-3 text-sm font-semibold text-black shadow-lg shadow-amber-500/20 transition-all hover:shadow-amber-400/40"
                  >
                    Shop Ematech
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-900/60 px-7 py-3 text-sm font-semibold text-white transition-all hover:border-amber-400 hover:text-amber-400"
                  >
                    Talk to us
                  </Link>
                </div>
              </div>

              <div className="rounded-2xl border border-neutral-800 bg-black/40 p-6">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-semibold uppercase tracking-widest text-white">
                    Headquarters
                  </p>
                </div>
                <p className="mt-3 text-sm text-neutral-300">
                  Boulevard Mohammed V
                  <br />
                  Casablanca, Morocco
                </p>
                <div className="mt-5 flex items-center gap-2 text-xs text-neutral-400">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <span>Serving 50+ Moroccan cities</span>
                </div>
                <div className="mt-2 flex items-center gap-2 text-xs text-neutral-400">
                  <Headphones className="h-3.5 w-3.5 text-amber-400" />
                  <span>7-days-a-week customer care</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;

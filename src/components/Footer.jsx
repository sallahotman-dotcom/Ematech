import { Link } from 'react-router-dom';
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Truck,
  ShieldCheck,
  Headphones
} from 'lucide-react';
import { categories } from '../data/products';

const Footer = () => {
  const year = new Date().getFullYear();

  const trustBadges = [
    {
      id: 'shipping',
      icon: Truck,
      title: 'Fast Delivery',
      subtitle: 'Across all Morocco in 24-72h'
    },
    {
      id: 'authentic',
      icon: ShieldCheck,
      title: '100% Authentic',
      subtitle: 'Original products, full warranty'
    },
    {
      id: 'payment',
      icon: CreditCard,
      title: 'Secure Payment',
      subtitle: 'Card, COD & bank transfer'
    },
    {
      id: 'support',
      icon: Headphones,
      title: '7/7 Support',
      subtitle: 'Customer care that listens'
    }
  ];

  return (
    <footer className="bg-neutral-950 text-neutral-300">
      {/* Trust badges strip */}
      <div className="border-b border-neutral-800">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {trustBadges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div
                key={badge.id}
                className="flex items-start gap-4 rounded-xl border border-neutral-800/70 bg-neutral-900/40 p-4 transition-colors hover:border-amber-500/40"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 text-black shadow-md">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">{badge.title}</h4>
                  <p className="mt-1 text-xs text-neutral-400">{badge.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main footer grid */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-14 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <Link to="/" className="flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-md bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 shadow-md ring-1 ring-amber-300/40">
              <span className="text-base font-black text-black">E</span>
            </span>
            <span className="text-2xl font-bold tracking-wider">
              <span className="text-white">Ema</span>
              <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                tech
              </span>
            </span>
          </Link>

          <p className="mt-5 text-sm leading-relaxed text-neutral-400">
            Ematech is Morocco&apos;s premium destination for the latest smartphones,
            smartwatches, audio gear, and home appliances. Curated brands, authentic
            products, and a service experience that lives up to the technology we sell.
          </p>

          <div className="mt-6 flex items-center gap-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-800 text-neutral-300 transition-all hover:border-amber-400 hover:text-amber-400"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-800 text-neutral-300 transition-all hover:border-amber-400 hover:text-amber-400"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-800 text-neutral-300 transition-all hover:border-amber-400 hover:text-amber-400"
            >
              <Twitter className="h-4 w-4" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-800 text-neutral-300 transition-all hover:border-amber-400 hover:text-amber-400"
            >
              <Youtube className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Shop categories */}
        <div>
          <h3 className="mb-5 text-sm font-semibold uppercase tracking-widest text-white">
            Shop
          </h3>
          <ul className="space-y-3 text-sm">
            {categories.map((cat) => (
              <li key={cat.id}>
                <Link
                  to={`/category/${cat.slug}`}
                  className="flex items-center justify-between text-neutral-400 transition-colors hover:text-amber-400"
                >
                  <span>{cat.name}</span>
                  <span className="text-xs text-neutral-600" dir="rtl">
                    {cat.nameAr}
                  </span>
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/products"
                className="text-neutral-400 transition-colors hover:text-amber-400"
              >
                All Products
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer service */}
        <div>
          <h3 className="mb-5 text-sm font-semibold uppercase tracking-widest text-white">
            Customer Care
          </h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link to="/about" className="text-neutral-400 hover:text-amber-400 transition-colors">
                About Ematech
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-neutral-400 hover:text-amber-400 transition-colors">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/shipping" className="text-neutral-400 hover:text-amber-400 transition-colors">
                Shipping &amp; Delivery
              </Link>
            </li>
            <li>
              <Link to="/returns" className="text-neutral-400 hover:text-amber-400 transition-colors">
                Returns &amp; Warranty
              </Link>
            </li>
            <li>
              <Link to="/faq" className="text-neutral-400 hover:text-amber-400 transition-colors">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="text-neutral-400 hover:text-amber-400 transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="text-neutral-400 hover:text-amber-400 transition-colors">
                Terms &amp; Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter + contact */}
        <div>
          <h3 className="mb-5 text-sm font-semibold uppercase tracking-widest text-white">
            Stay Connected
          </h3>
          <p className="text-sm text-neutral-400">
            Subscribe to receive exclusive offers, early access to new arrivals, and
            premium tech insights.
          </p>

          <form
            className="mt-4 flex w-full overflow-hidden rounded-full border border-neutral-800 bg-neutral-900/60 focus-within:border-amber-400"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              required
              placeholder="Your email address"
              className="flex-1 bg-transparent px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-amber-400 to-amber-600 px-5 text-sm font-semibold text-black transition-opacity hover:opacity-90"
            >
              Join
            </button>
          </form>

          <ul className="mt-6 space-y-3 text-sm text-neutral-400">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 text-amber-400" />
              <span>Boulevard Mohammed V, Casablanca, Morocco</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-amber-400" />
              <a href="tel:+212522000000" className="hover:text-amber-400 transition-colors">
                +212 5 22 00 00 00
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-amber-400" />
              <a
                href="mailto:contact@ematech.ma"
                className="hover:text-amber-400 transition-colors"
              >
                contact@ematech.ma
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-neutral-800 bg-black">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 text-xs text-neutral-500 md:flex-row">
          <p>
            &copy; {year}{' '}
            <span className="font-semibold text-white">Ematech</span>. All rights
            reserved.
          </p>
          <div className="flex items-center gap-4">
            <span>Visa</span>
            <span className="text-neutral-700">|</span>
            <span>Mastercard</span>
            <span className="text-neutral-700">|</span>
            <span>CMI</span>
            <span className="text-neutral-700">|</span>
            <span>Cash on Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

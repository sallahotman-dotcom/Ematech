import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  Search,
  ShoppingBag,
  Menu,
  X,
  User,
  Heart,
  Phone
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { categories } from '../data/products';

const Navbar = () => {
  const { itemsCount } = useCart();
  const location = useLocation();

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  // Add subtle shadow on scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  const navLinkBase =
    'relative px-1 py-2 text-sm font-medium tracking-wide transition-colors duration-200';
  const navLinkActive = 'text-amber-400';
  const navLinkInactive = 'text-neutral-200 hover:text-amber-400';

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-black text-white border-b border-neutral-800 transition-shadow duration-300 ${
        isScrolled ? 'shadow-[0_8px_24px_-12px_rgba(212,175,55,0.25)]' : ''
      }`}
    >
      {/* Top announcement bar */}
      <div className="hidden md:block bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 border-b border-neutral-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <Phone className="h-3.5 w-3.5 text-amber-400" />
            <span>+212 5 22 00 00 00</span>
            <span className="mx-3 text-neutral-700">|</span>
            <span>Free delivery across Morocco from 1,000 MAD</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-neutral-500">Premium Tech Store</span>
            <span className="text-amber-400 font-medium">EN | AR</span>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 md:px-6 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 shadow-md ring-1 ring-amber-300/40">
            <span className="text-sm font-black text-black">E</span>
          </span>
          <span className="text-xl md:text-2xl font-bold tracking-wider">
            <span className="text-white">Ema</span>
            <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
              tech
            </span>
          </span>
        </Link>

        {/* Desktop categories */}
        <nav className="hidden lg:flex items-center gap-8">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${navLinkBase} ${isActive ? navLinkActive : navLinkInactive}`
            }
          >
            Home
          </NavLink>

          {categories.map((cat) => (
            <NavLink
              key={cat.id}
              to={`/category/${cat.slug}`}
              className={({ isActive }) =>
                `${navLinkBase} ${isActive ? navLinkActive : navLinkInactive}`
              }
            >
              <span className="flex flex-col leading-tight">
                <span>{cat.name}</span>
                <span
                  className="text-[10px] text-neutral-500"
                  dir="rtl"
                >
                  {cat.nameAr}
                </span>
              </span>
            </NavLink>
          ))}

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${navLinkBase} ${isActive ? navLinkActive : navLinkInactive}`
            }
          >
            About
          </NavLink>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2 md:gap-4">
          <button
            type="button"
            aria-label="Search"
            className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full text-neutral-300 hover:text-amber-400 hover:bg-neutral-900 transition-colors"
          >
            <Search className="h-5 w-5" />
          </button>

          <Link
            to="/wishlist"
            aria-label="Wishlist"
            className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full text-neutral-300 hover:text-amber-400 hover:bg-neutral-900 transition-colors"
          >
            <Heart className="h-5 w-5" />
          </Link>

          <Link
            to="/account"
            aria-label="Account"
            className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full text-neutral-300 hover:text-amber-400 hover:bg-neutral-900 transition-colors"
          >
            <User className="h-5 w-5" />
          </Link>

          <Link
            to="/cart"
            aria-label="Cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-neutral-200 hover:text-amber-400 hover:bg-neutral-900 transition-colors"
          >
            <ShoppingBag className="h-5 w-5" />
            {itemsCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600 px-1 text-[11px] font-bold text-black ring-2 ring-black">
                {itemsCount > 99 ? '99+' : itemsCount}
              </span>
            )}
          </Link>

          {/* Mobile burger */}
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={isMobileOpen}
            onClick={() => setIsMobileOpen((v) => !v)}
            className="lg:hidden flex h-10 w-10 items-center justify-center rounded-full text-neutral-200 hover:text-amber-400 hover:bg-neutral-900 transition-colors"
          >
            {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden bg-black border-t border-neutral-800 transition-[max-height,opacity] duration-300 ease-out ${
          isMobileOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="px-4 py-4 space-y-1">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `block rounded-md px-3 py-3 text-base font-medium transition-colors ${
                isActive
                  ? 'bg-neutral-900 text-amber-400'
                  : 'text-neutral-200 hover:bg-neutral-900 hover:text-amber-400'
              }`
            }
          >
            Home
          </NavLink>

          <div className="pt-2 pb-1 px-3 text-xs uppercase tracking-widest text-neutral-500">
            Categories
          </div>

          {categories.map((cat) => (
            <NavLink
              key={cat.id}
              to={`/category/${cat.slug}`}
              className={({ isActive }) =>
                `flex items-center justify-between rounded-md px-3 py-3 text-base font-medium transition-colors ${
                  isActive
                    ? 'bg-neutral-900 text-amber-400'
                    : 'text-neutral-200 hover:bg-neutral-900 hover:text-amber-400'
                }`
              }
            >
              <span>{cat.name}</span>
              <span className="text-sm text-neutral-400" dir="rtl">
                {cat.nameAr}
              </span>
            </NavLink>
          ))}

          <div className="pt-2 pb-1 px-3 text-xs uppercase tracking-widest text-neutral-500">
            Account
          </div>

          <NavLink
            to="/account"
            className="block rounded-md px-3 py-3 text-base font-medium text-neutral-200 hover:bg-neutral-900 hover:text-amber-400"
          >
            My Account
          </NavLink>
          <NavLink
            to="/wishlist"
            className="block rounded-md px-3 py-3 text-base font-medium text-neutral-200 hover:bg-neutral-900 hover:text-amber-400"
          >
            Wishlist
          </NavLink>
          <NavLink
            to="/about"
            className="block rounded-md px-3 py-3 text-base font-medium text-neutral-200 hover:bg-neutral-900 hover:text-amber-400"
          >
            About Ematech
          </NavLink>

          <div className="mt-4 flex items-center gap-2 rounded-md bg-neutral-900 px-3 py-3 text-sm text-neutral-300">
            <Phone className="h-4 w-4 text-amber-400" />
            <span>+212 5 22 00 00 00</span>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

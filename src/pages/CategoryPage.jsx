import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  SlidersHorizontal,
  X,
  ArrowDownUp,
  Star,
  ChevronRight,
  Home as HomeIcon,
  PackageOpen
} from 'lucide-react';
import {
  getCategoryBySlug,
  getProductsByCategory
} from '../data/products';
import ProductCard from '../components/ProductCard';

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest first' },
  { value: 'price-asc', label: 'Price: Low to high' },
  { value: 'price-desc', label: 'Price: High to low' },
  { value: 'rating', label: 'Top rated' }
];

const RATING_OPTIONS = [
  { value: 0, label: 'Any rating' },
  { value: 4, label: '4 stars & up' },
  { value: 4.5, label: '4.5 stars & up' }
];

/**
 * FiltersPanel - Defined at module scope so React doesn't remount it
 * (and the filter inputs) on every parent re-render. This preserves
 * focus while typing in the price-range fields.
 */
const FiltersPanel = ({
  availableBrands,
  selectedBrands,
  toggleBrand,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  minRating,
  setMinRating,
  inStockOnly,
  setInStockOnly,
  activeFiltersCount,
  resetFilters,
  radioGroupName
}) => (
  <div className="space-y-7">
    {/* Brand */}
    {availableBrands.length > 0 && (
      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-white">
          Brand
        </h3>
        <ul className="space-y-2">
          {availableBrands.map((brand) => (
            <li key={brand}>
              <label className="flex cursor-pointer items-center gap-3 text-sm text-neutral-300 transition-colors hover:text-white">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => toggleBrand(brand)}
                  className="h-4 w-4 cursor-pointer accent-amber-500"
                />
                {brand}
              </label>
            </li>
          ))}
        </ul>
      </div>
    )}

    {/* Price */}
    <div>
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-white">
        Price (MAD)
      </h3>
      <div className="grid grid-cols-2 gap-3">
        <input
          type="number"
          inputMode="numeric"
          min="0"
          placeholder="Min"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-white placeholder-neutral-500 outline-none transition-colors focus:border-amber-400"
        />
        <input
          type="number"
          inputMode="numeric"
          min="0"
          placeholder="Max"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-white placeholder-neutral-500 outline-none transition-colors focus:border-amber-400"
        />
      </div>
    </div>

    {/* Rating */}
    <div>
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-white">
        Rating
      </h3>
      <ul className="space-y-2">
        {RATING_OPTIONS.map((opt) => (
          <li key={opt.value}>
            <label className="flex cursor-pointer items-center gap-3 text-sm text-neutral-300 transition-colors hover:text-white">
              <input
                type="radio"
                name={radioGroupName}
                checked={minRating === opt.value}
                onChange={() => setMinRating(opt.value)}
                className="h-4 w-4 cursor-pointer accent-amber-500"
              />
              {opt.value > 0 ? (
                <span className="flex items-center gap-1.5">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  {opt.label}
                </span>
              ) : (
                <span>{opt.label}</span>
              )}
            </label>
          </li>
        ))}
      </ul>
    </div>

    {/* Stock */}
    <div>
      <label className="flex cursor-pointer items-center gap-3 text-sm text-neutral-300 transition-colors hover:text-white">
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => setInStockOnly(e.target.checked)}
          className="h-4 w-4 cursor-pointer accent-amber-500"
        />
        In stock only
      </label>
    </div>

    {/* Reset */}
    {activeFiltersCount > 0 && (
      <button
        type="button"
        onClick={resetFilters}
        className="w-full rounded-full border border-neutral-700 bg-neutral-900 py-2 text-sm font-medium text-neutral-300 transition-colors hover:border-amber-400 hover:text-amber-400"
      >
        Reset filters
      </button>
    )}
  </div>
);

const CategoryPage = () => {
  const { slug } = useParams();
  const category = getCategoryBySlug(slug);

  const categoryProducts = useMemo(
    () => (category ? getProductsByCategory(slug) : []),
    [category, slug]
  );

  const availableBrands = useMemo(() => {
    const set = new Set(categoryProducts.map((p) => p.brand));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [categoryProducts]);

  // ---------- Filter / sort state ----------
  const [sortBy, setSortBy] = useState('featured');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Reset all filters when the category changes
  useEffect(() => {
    setSortBy('featured');
    setSelectedBrands([]);
    setMinRating(0);
    setInStockOnly(false);
    setMinPrice('');
    setMaxPrice('');
    setIsMobileFilterOpen(false);
  }, [slug]);

  // Lock body scroll when the mobile filter drawer is open
  useEffect(() => {
    if (typeof document === 'undefined') return undefined;
    document.body.style.overflow = isMobileFilterOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileFilterOpen]);

  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const resetFilters = () => {
    setSelectedBrands([]);
    setMinRating(0);
    setInStockOnly(false);
    setMinPrice('');
    setMaxPrice('');
  };

  const activeFiltersCount =
    selectedBrands.length +
    (minRating > 0 ? 1 : 0) +
    (inStockOnly ? 1 : 0) +
    (minPrice !== '' ? 1 : 0) +
    (maxPrice !== '' ? 1 : 0);

  // ---------- Filtered + sorted products ----------
  const visibleProducts = useMemo(() => {
    let list = categoryProducts;

    if (selectedBrands.length > 0) {
      list = list.filter((p) => selectedBrands.includes(p.brand));
    }
    if (minRating > 0) {
      list = list.filter((p) => Number(p.rating) >= minRating);
    }
    if (inStockOnly) {
      list = list.filter((p) => p.inStock !== false);
    }
    if (minPrice !== '' && !Number.isNaN(Number(minPrice))) {
      list = list.filter((p) => p.price >= Number(minPrice));
    }
    if (maxPrice !== '' && !Number.isNaN(Number(maxPrice))) {
      list = list.filter((p) => p.price <= Number(maxPrice));
    }

    const sorted = [...list];
    switch (sortBy) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        sorted.sort((a, b) => Number(b.rating) - Number(a.rating));
        break;
      case 'newest':
        sorted.sort(
          (a, b) => Number(Boolean(b.isNew)) - Number(Boolean(a.isNew))
        );
        break;
      case 'featured':
      default:
        sorted.sort(
          (a, b) =>
            Number(Boolean(b.isFeatured)) - Number(Boolean(a.isFeatured))
        );
        break;
    }
    return sorted;
  }, [
    categoryProducts,
    selectedBrands,
    minRating,
    inStockOnly,
    minPrice,
    maxPrice,
    sortBy
  ]);

  // ---------- Category not found ----------
  if (!category) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center bg-black px-6 py-24 text-center">
        <div className="max-w-md">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">
            Category not found
          </p>
          <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl">
            We couldn&apos;t find that collection
          </h1>
          <p className="mt-3 text-sm text-neutral-400">
            The category &quot;{slug}&quot; doesn&apos;t exist. Try one of our
            curated collections instead.
          </p>
          <p className="mt-2 text-xs text-neutral-500" dir="rtl">
            القسم المطلوب غير موجود.
          </p>
          <Link
            to="/"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 px-7 py-3 text-sm font-semibold text-black shadow-lg shadow-amber-500/20 transition-all hover:shadow-amber-400/40"
          >
            Back to Home
          </Link>
        </div>
      </section>
    );
  }

  // ---------- Render ----------
  return (
    <div className="bg-neutral-950">
      {/* Hero / breadcrumb */}
      <section className="relative overflow-hidden bg-black">
        <div className="pointer-events-none absolute -top-40 -right-40 h-[24rem] w-[24rem] rounded-full bg-amber-500/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 left-0 h-[24rem] w-[24rem] rounded-full bg-amber-300/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-12 lg:py-16">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-4 flex items-center gap-2 text-xs text-neutral-500"
          >
            <Link
              to="/"
              className="flex items-center gap-1 transition-colors hover:text-amber-400"
            >
              <HomeIcon className="h-3.5 w-3.5" />
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-neutral-300">{category.name}</span>
          </nav>

          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">
            Collection
          </p>
          <h1 className="mt-2 text-4xl font-bold text-white sm:text-5xl">
            {category.name}
          </h1>
          <p className="mt-2 text-base text-neutral-300" dir="rtl">
            {category.nameAr}
          </p>
          <p className="mt-3 max-w-xl text-sm text-neutral-400">
            {category.description}
          </p>
          <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-300">
            {categoryProducts.length} product
            {categoryProducts.length !== 1 ? 's' : ''} available
          </p>
        </div>
      </section>

      {/* Toolbar (sticky) */}
      <section className="sticky top-16 z-30 border-y border-neutral-800 bg-black/90 backdrop-blur md:top-24">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-6 py-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsMobileFilterOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-amber-400 hover:text-amber-400 lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {activeFiltersCount > 0 && (
                <span className="ml-1 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600 px-1.5 text-[11px] font-bold text-black">
                  {activeFiltersCount}
                </span>
              )}
            </button>
            <p className="hidden text-sm text-neutral-400 lg:block">
              <span className="font-semibold text-white">
                {visibleProducts.length}
              </span>{' '}
              of {categoryProducts.length} products
            </p>
          </div>

          <div className="relative">
            <ArrowDownUp className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort products"
              className="appearance-none rounded-full border border-neutral-700 bg-neutral-900 py-2 pl-9 pr-9 text-sm text-white outline-none transition-colors hover:border-amber-400 focus:border-amber-400"
            >
              {SORT_OPTIONS.map((opt) => (
                <option
                  key={opt.value}
                  value={opt.value}
                  className="bg-neutral-900"
                >
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronRight className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 rotate-90 text-neutral-500" />
          </div>
        </div>
      </section>

      {/* Body: sidebar + grid */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[280px_1fr]">
          {/* Desktop filters */}
          <aside className="hidden lg:block">
            <div className="sticky top-[180px] rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-widest text-white">
                  Filters
                </h2>
                {activeFiltersCount > 0 && (
                  <span className="rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-medium text-amber-300">
                    {activeFiltersCount} active
                  </span>
                )}
              </div>
              <FiltersPanel
                availableBrands={availableBrands}
                selectedBrands={selectedBrands}
                toggleBrand={toggleBrand}
                minPrice={minPrice}
                setMinPrice={setMinPrice}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                minRating={minRating}
                setMinRating={setMinRating}
                inStockOnly={inStockOnly}
                setInStockOnly={setInStockOnly}
                activeFiltersCount={activeFiltersCount}
                resetFilters={resetFilters}
                radioGroupName="rating-desktop"
              />
            </div>
          </aside>

          {/* Products grid or empty state */}
          <div>
            {visibleProducts.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {visibleProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-800 bg-neutral-900/40 p-12 text-center">
                <PackageOpen className="h-12 w-12 text-neutral-700" />
                <h3 className="mt-4 text-lg font-semibold text-white">
                  No products match your filters
                </h3>
                <p className="mt-2 max-w-sm text-sm text-neutral-400">
                  Try adjusting or resetting your filters to discover more from
                  our collection.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-6 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 px-6 py-2.5 text-sm font-semibold text-black shadow-md transition-opacity hover:opacity-90"
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Mobile filter drawer */}
      <div
        aria-hidden={!isMobileFilterOpen}
        className={`fixed inset-0 z-50 lg:hidden ${
          isMobileFilterOpen ? '' : 'pointer-events-none'
        }`}
      >
        {/* Overlay */}
        <button
          type="button"
          aria-label="Close filters overlay"
          onClick={() => setIsMobileFilterOpen(false)}
          className={`absolute inset-0 bg-black/70 transition-opacity duration-300 ${
            isMobileFilterOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Drawer */}
        <div
          className={`absolute right-0 top-0 flex h-full w-[88%] max-w-sm flex-col border-l border-neutral-800 bg-neutral-950 shadow-2xl transition-transform duration-300 ${
            isMobileFilterOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between border-b border-neutral-800 px-6 py-4">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-semibold text-white">Filters</h2>
              {activeFiltersCount > 0 && (
                <span className="rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-medium text-amber-300">
                  {activeFiltersCount}
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={() => setIsMobileFilterOpen(false)}
              aria-label="Close filters"
              className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-300 transition-colors hover:bg-neutral-900 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6">
            <FiltersPanel
              availableBrands={availableBrands}
              selectedBrands={selectedBrands}
              toggleBrand={toggleBrand}
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              minRating={minRating}
              setMinRating={setMinRating}
              inStockOnly={inStockOnly}
              setInStockOnly={setInStockOnly}
              activeFiltersCount={activeFiltersCount}
              resetFilters={resetFilters}
              radioGroupName="rating-mobile"
            />
          </div>

          <div className="border-t border-neutral-800 px-6 py-4">
            <button
              type="button"
              onClick={() => setIsMobileFilterOpen(false)}
              className="w-full rounded-full bg-gradient-to-r from-amber-400 to-amber-600 py-3 text-sm font-semibold text-black shadow-md transition-opacity hover:opacity-90"
            >
              Show {visibleProducts.length} result
              {visibleProducts.length !== 1 ? 's' : ''}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;

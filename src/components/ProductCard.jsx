import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingBag, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

/**
 * ProductCard - Premium reusable product card.
 *
 * Props:
 *   product      (required) - Product object from src/data/products.js
 *   className    (optional) - Extra Tailwind classes for the outer <article>
 */
const ProductCard = ({ product, className = '' }) => {
  const { addToCart, formatPrice } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const isOutOfStock = product.inStock === false;

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    addToCart(product, 1);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-500/60 hover:shadow-lg hover:shadow-amber-500/10 ${className}`}
    >
      {/* Image + badges */}
      <Link
        to={`/product/${product.id}`}
        className="relative block aspect-square overflow-hidden bg-neutral-950"
        aria-label={product.name}
      >
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          loading="lazy"
        />

        {/* Top-left badge */}
        {product.isNew && !isOutOfStock && (
          <span className="absolute left-3 top-3 rounded-full bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-black shadow-sm">
            New
          </span>
        )}

        {/* Top-right discount */}
        {discount > 0 && !isOutOfStock && (
          <span className="absolute right-3 top-3 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 px-2.5 py-1 text-[10px] font-bold text-black shadow-sm">
            -{discount}%
          </span>
        )}

        {/* Out of stock overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/65 backdrop-blur-[2px]">
            <span className="rounded-full border border-white/20 bg-black/70 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
              Out of stock
            </span>
          </div>
        )}
      </Link>

      {/* Body */}
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

        {/* Rating */}
        <div className="mt-2 flex items-center gap-1 text-xs">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          <span className="font-medium text-white">
            {Number(product.rating).toFixed(1)}
          </span>
          <span className="text-neutral-500">({product.reviewsCount})</span>
        </div>

        {/* Price + Add to cart */}
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
            onClick={handleAdd}
            disabled={isOutOfStock}
            aria-label={`Add ${product.name} to cart`}
            className={`flex h-10 w-10 items-center justify-center rounded-full text-black shadow-md transition-all duration-200 hover:scale-110 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 ${
              justAdded
                ? 'bg-emerald-400'
                : 'bg-gradient-to-br from-amber-400 to-amber-600'
            }`}
          >
            {justAdded ? (
              <Check className="h-4 w-4" strokeWidth={3} />
            ) : (
              <ShoppingBag className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;

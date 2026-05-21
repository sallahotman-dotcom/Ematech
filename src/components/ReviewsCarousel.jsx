import { useCallback, useEffect, useRef, useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { reviews } from '../data/products';

const AUTOPLAY_INTERVAL = 4500; // ms
const GAP_PX = 20; // matches Tailwind gap-5

const ReviewsCarousel = () => {
  const trackRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Compute scroll step based on first card width + gap
  const getStep = useCallback(() => {
    const el = trackRef.current;
    if (!el) return 320;
    const card = el.querySelector('[data-review-card]');
    if (!card) return 320;
    return card.getBoundingClientRect().width + GAP_PX;
  }, []);

  const updateScrollState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 4);
  }, []);

  const scrollByStep = useCallback(
    (direction) => {
      const el = trackRef.current;
      if (!el) return;
      el.scrollBy({ left: direction * getStep(), behavior: 'smooth' });
    },
    [getStep]
  );

  // Auto-play loop
  useEffect(() => {
    if (isPaused) return undefined;
    const interval = setInterval(() => {
      const el = trackRef.current;
      if (!el) return;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
      if (atEnd) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: getStep(), behavior: 'smooth' });
      }
    }, AUTOPLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [isPaused, getStep]);

  // Track scroll button availability
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return undefined;
    updateScrollState();
    const onScroll = () => updateScrollState();
    el.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateScrollState);
    return () => {
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [updateScrollState]);

  const formatDate = (iso) => {
    try {
      return new Date(iso).toLocaleDateString('ar-MA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (err) {
      return iso;
    }
  };

  return (
    <section className="bg-neutral-950 py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">
              Customer Reviews
            </p>
            <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
              Trusted across Morocco
            </h2>
            <p className="mt-2 text-sm text-neutral-400">
              Real stories from {reviews.length}+ customers who chose Ematech.
            </p>
            <p className="mt-1 text-sm text-neutral-500" dir="rtl">
              آراء حقيقية من زبائن Ematech عبر المغرب.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollByStep(-1)}
              disabled={!canScrollLeft}
              aria-label="Previous reviews"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-700 bg-neutral-900 text-neutral-300 transition-all hover:border-amber-400 hover:text-amber-400 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-neutral-700 disabled:hover:text-neutral-300"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollByStep(1)}
              disabled={!canScrollRight}
              aria-label="Next reviews"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-700 bg-neutral-900 text-neutral-300 transition-all hover:border-amber-400 hover:text-amber-400 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-neutral-700 disabled:hover:text-neutral-300"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Track */}
        <div
          ref={trackRef}
          className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {reviews.map((rev) => (
            <article
              key={rev.id}
              data-review-card
              className="group relative flex w-[85%] shrink-0 snap-start flex-col rounded-2xl border border-neutral-800 bg-gradient-to-br from-neutral-900 to-black p-6 transition-all hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/10 sm:w-[60%] md:w-[45%] lg:w-[32%] xl:w-[28%]"
            >
              <Quote className="absolute right-5 top-5 h-9 w-9 text-amber-500/15" />

              {/* Identity */}
              <div className="flex items-center gap-4">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="h-12 w-12 rounded-full border border-amber-500/30 object-cover"
                  loading="lazy"
                />
                <div dir="rtl" className="text-right">
                  <p className="text-sm font-semibold text-white">{rev.name}</p>
                  <p className="text-xs text-neutral-500">{rev.city}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="mt-4 flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < rev.rating
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-neutral-700'
                    }`}
                  />
                ))}
              </div>

              {/* Comment */}
              <p
                dir="rtl"
                className="mt-4 line-clamp-5 flex-1 text-right text-sm leading-relaxed text-neutral-300"
              >
                {rev.comment}
              </p>

              {/* Date */}
              <p className="mt-5 text-xs text-neutral-600" dir="rtl">
                {formatDate(rev.date)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsCarousel;

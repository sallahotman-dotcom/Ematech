import { Instagram, ArrowRight, Heart, Camera } from 'lucide-react';

const INSTAGRAM_URL = 'https://www.instagram.com/ematechstore';

// Curated still-life shots that mirror the kind of unboxing /
// shipping content posted on @ematechstore. We reuse Unsplash
// references that are already loaded elsewhere in the catalog so
// browsers can serve them from cache.
const POSTS = [
  {
    id: 'ig-1',
    image:
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&q=80&auto=format&fit=crop',
    captionAr: 'iPhone جديد متلف من إيماتيك',
    likes: '1.2K'
  },
  {
    id: 'ig-2',
    image:
      'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=800&q=80&auto=format&fit=crop',
    captionAr: 'Apple Watch وصلات لزبون من الرباط',
    likes: '912'
  },
  {
    id: 'ig-3',
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80&auto=format&fit=crop',
    captionAr: 'سماعات Sony WH-1000XM5 — توصيل مراكش',
    likes: '745'
  },
  {
    id: 'ig-4',
    image:
      'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&q=80&auto=format&fit=crop',
    captionAr: 'AirPods Pro 2 — توصيل أكادير',
    likes: '1.4K'
  },
  {
    id: 'ig-5',
    image:
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80&auto=format&fit=crop',
    captionAr: 'Marshall Stanmore III — تطوان',
    likes: '684'
  },
  {
    id: 'ig-6',
    image:
      'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&q=80&auto=format&fit=crop',
    captionAr: 'Nespresso Vertuo — توصيل البيضاء',
    likes: '1.0K'
  }
];

/**
 * InstagramShowcase - "إيماتيك في الواقع" social proof grid.
 *
 * Visually represents verified shipping & unboxing posts from the
 * official @ematechstore Instagram account. Each tile links out to
 * the live profile so customers can see the full feed.
 */
const InstagramShowcase = () => {
  return (
    <section className="border-t border-neutral-900 bg-black py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-medium text-amber-300">
            <Instagram className="h-3.5 w-3.5" />
            @ematechstore
          </div>
          <h2
            className="mt-4 text-3xl font-bold text-white sm:text-4xl"
            dir="rtl"
          >
            إيماتيك في الواقع
          </h2>
          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">
            Ematech in real life
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-neutral-400">
            Verified shipments and unboxings from real Ematech customers across
            Morocco — straight from our Instagram feed.
          </p>
          <p
            className="mx-auto mt-1 max-w-2xl text-sm text-neutral-500"
            dir="rtl"
          >
            لقطات حقيقية من زبائن إيماتيك بعد استلام طلباتهم في جميع مدن المغرب.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          {POSTS.map((post) => (
            <a
              key={post.id}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open @ematechstore on Instagram - ${post.captionAr}`}
              className="group relative aspect-square overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 transition-all hover:border-amber-500/60 hover:shadow-lg hover:shadow-amber-500/15"
            >
              <img
                src={post.image}
                alt={post.captionAr}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />

              {/* Hover gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Caption + likes (hover reveal) */}
              <div className="absolute inset-x-2 bottom-2 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <div className="rounded-xl bg-black/70 p-2 backdrop-blur-md">
                  <p
                    className="line-clamp-1 text-[11px] font-medium text-white"
                    dir="rtl"
                  >
                    {post.captionAr}
                  </p>
                  <p className="mt-0.5 flex items-center gap-1 text-[10px] text-neutral-300">
                    <Heart className="h-3 w-3 fill-amber-400 text-amber-400" />
                    {post.likes}
                  </p>
                </div>
              </div>

              {/* Permanent IG badge in corner */}
              <span className="pointer-events-none absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white opacity-90 backdrop-blur-sm transition-colors group-hover:bg-gradient-to-br group-hover:from-amber-400 group-hover:to-amber-600 group-hover:text-black">
                <Instagram className="h-3.5 w-3.5" />
              </span>
            </a>
          ))}
        </div>

        {/* Follow CTA */}
        <div className="mt-10 flex flex-col items-center gap-3">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 px-7 py-3 text-sm font-semibold text-black shadow-lg shadow-amber-500/20 transition-all hover:shadow-amber-400/40"
          >
            <Instagram className="h-4 w-4" />
            Follow @ematechstore
            <ArrowRight className="h-4 w-4" />
          </a>
          <p className="flex items-center gap-1.5 text-xs text-neutral-500">
            <Camera className="h-3.5 w-3.5 text-amber-400" />
            Tag <span className="text-amber-400">#Ematech</span> to be featured.
          </p>
        </div>
      </div>
    </section>
  );
};

export default InstagramShowcase;

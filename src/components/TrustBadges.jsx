import { ShieldCheck, PackageSearch, Truck } from 'lucide-react';

/**
 * TrustBadges - luxury Arabic-first trust bar.
 *
 * Used directly under the checkout form and inside ProductPage.
 * The three badges are the high-converting reassurances Moroccan
 * buyers expect for premium / used iPhones:
 *   1) حق الفحص قبل الدفع   (Inspect before paying)
 *   2) ضمان إيماتيك الرسمي  (Official Ematech Warranty)
 *   3) شحن آمن من طنجة لجميع المدن (Secure shipping from Tangier)
 *
 * Props:
 *   heading   (boolean) - render the section heading. Default: true.
 *   className (string)  - extra Tailwind classes for the outer section.
 *   variant   ('default' | 'compact') - 'compact' tightens vertical
 *             padding for embed under forms. Default: 'default'.
 */
const BADGES = [
  {
    icon: PackageSearch,
    titleAr: 'حق الفحص قبل الدفع',
    subtitle: 'Open the package and inspect every device before paying a dirham.'
  },
  {
    icon: ShieldCheck,
    titleAr: 'ضمان إيماتيك الرسمي',
    subtitle: 'Official Ematech warranty + manufacturer warranty on every order.'
  },
  {
    icon: Truck,
    titleAr: 'شحن آمن من طنجة لجميع المدن',
    subtitle: 'Sealed, tracked delivery from Tangier to every city across Morocco.'
  }
];

const TrustBadges = ({
  heading = true,
  className = '',
  variant = 'default'
}) => {
  const wrapperPadding =
    variant === 'compact' ? 'py-10' : 'py-14 sm:py-16';

  return (
    <section
      className={`relative overflow-hidden border-y border-amber-500/15 bg-gradient-to-br from-black via-neutral-950 to-black ${wrapperPadding} ${className}`}
    >
      {/* Ambient gold glows */}
      <div className="pointer-events-none absolute -top-32 -left-20 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-20 h-72 w-72 rounded-full bg-amber-300/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        {heading && (
          <div className="mb-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">
              Why customers trust Ematech
            </p>
            <h2
              className="mt-2 text-2xl font-bold text-white sm:text-3xl"
              dir="rtl"
            >
              ضمانات إيماتيك
            </h2>
            <p
              className="mx-auto mt-2 max-w-xl text-sm text-neutral-400"
              dir="rtl"
            >
              ثلاثة وعود نلتزم بها مع كل طلب: شفافية، ضمان، وتوصيل آمن.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3">
          {BADGES.map((badge) => {
            const Icon = badge.icon;
            return (
              <article
                key={badge.titleAr}
                className="group relative flex items-start gap-4 overflow-hidden rounded-2xl border border-amber-500/25 bg-gradient-to-br from-neutral-900 via-black to-neutral-900 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-400/60 hover:shadow-lg hover:shadow-amber-500/15"
              >
                {/* Subtle inset gold gleam */}
                <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-amber-300/10" />

                <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 text-black shadow-md shadow-amber-500/30">
                  <Icon className="h-6 w-6" strokeWidth={2.25} />
                </div>

                <div className="relative min-w-0 flex-1">
                  <p
                    className="text-base font-semibold leading-snug text-white sm:text-lg"
                    dir="rtl"
                  >
                    {badge.titleAr}
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-neutral-400">
                    {badge.subtitle}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;

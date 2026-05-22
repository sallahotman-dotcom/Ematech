import { BatteryFull, Sparkles, Package, BadgeCheck } from 'lucide-react';

/**
 * DeviceConditionCard - golden-bordered specification grid for
 * smartphones. Renders the three reassurances Moroccan buyers
 * expect when purchasing a budget/used iPhone from Ematech:
 *
 *   1) صحة البطارية: +90٪
 *   2) حالة الجهاز: Grade A+ كالجديد
 *   3) الملحقات: كابل الشحن الأصلي + علبة المتجر
 *
 * The component is fully static: it represents the standard
 * Ematech inspection guarantee. Drop it into ProductPage when
 * `product.category === 'smartphones'`.
 */
const CELLS = [
  {
    icon: BatteryFull,
    label: 'Battery Health',
    labelAr: 'صحة البطارية',
    valueAr: '+90٪',
    note: 'Verified with official Apple Battery Service tools.'
  },
  {
    icon: Sparkles,
    label: 'Cosmetic Grade',
    labelAr: 'حالة الجهاز',
    valueAr: 'Grade A+ كالجديد',
    note: 'No scratches, no dents, factory-quality finish.'
  },
  {
    icon: Package,
    label: 'Included Accessories',
    labelAr: 'الملحقات',
    valueAr: 'كابل الشحن الأصلي + علبة المتجر',
    note: 'Original Apple cable + Ematech premium packaging.'
  }
];

const DeviceConditionCard = () => {
  return (
    <section className="bg-black py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-3xl border-2 border-amber-500/50 bg-gradient-to-br from-amber-500/10 via-black to-neutral-900 p-6 shadow-xl shadow-amber-500/10 sm:p-8 lg:p-10">
          {/* Ambient gold glows */}
          <div className="pointer-events-none absolute -top-32 -right-32 h-72 w-72 rounded-full bg-amber-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-amber-300/10 blur-3xl" />
          {/* Inner gold gleam */}
          <span className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-amber-300/20" />

          {/* Header */}
          <div className="relative mb-7 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">
                Device Condition
              </p>
              <h2
                className="mt-2 text-2xl font-bold text-white sm:text-3xl"
                dir="rtl"
              >
                حالة الجهاز
              </h2>
              <p
                className="mt-1.5 max-w-xl text-sm text-neutral-300"
                dir="rtl"
              >
                فحص شامل وشفافية كاملة قبل الشراء — راحة بال مضمونة.
              </p>
            </div>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 px-3 py-1.5 text-xs font-semibold text-amber-300 ring-1 ring-amber-500/40">
              <BadgeCheck className="h-3.5 w-3.5" />
              Verified by Ematech
            </span>
          </div>

          {/* Grid */}
          <div className="relative grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3">
            {CELLS.map((cell) => {
              const Icon = cell.icon;
              return (
                <div
                  key={cell.labelAr}
                  className="group relative overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-br from-neutral-900 to-black p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-400/60 hover:shadow-md hover:shadow-amber-500/15"
                >
                  <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-amber-300/10" />

                  <div className="relative flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 text-black shadow-md shadow-amber-500/30">
                      <Icon className="h-5 w-5" strokeWidth={2.25} />
                    </div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-400">
                      {cell.label}
                    </p>
                  </div>

                  <p
                    className="relative mt-4 text-xs uppercase tracking-wider text-neutral-500"
                    dir="rtl"
                  >
                    {cell.labelAr}
                  </p>
                  <p
                    className="relative mt-1 text-lg font-bold leading-snug text-white sm:text-xl"
                    dir="rtl"
                  >
                    {cell.valueAr}
                  </p>
                  <p className="relative mt-2 text-xs leading-relaxed text-neutral-400">
                    {cell.note}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Footer fine print */}
          <p
            className="relative mt-6 text-center text-xs text-neutral-500"
            dir="rtl"
          >
            كل جهاز يخضع لفحص دقيق من فريق إيماتيك قبل الشحن، ويصلك مع ضمان رسمي من المتجر.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DeviceConditionCard;

// PostCSS configuration for Ematech (Tailwind CSS v4)
// The new @tailwindcss/postcss plugin replaces the legacy
// `tailwindcss` + `autoprefixer` pair from v3. Vendor prefixing
// is now handled internally by Tailwind via Lightning CSS.
export default {
  plugins: {
    '@tailwindcss/postcss': {}
  }
};

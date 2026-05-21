import { useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';

// Scrolls to the top whenever the route changes (premium UX)
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);
  return null;
};

const App = () => {
  return (
    <div className="flex min-h-screen flex-col bg-neutral-950 text-white antialiased">
      <ScrollToTop />
      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/product/:id" element={<ProductPage />} />

          {/* Graceful fallback for routes not yet implemented */}
          <Route
            path="*"
            element={
              <section className="flex min-h-[60vh] items-center justify-center bg-black px-6 py-24 text-center">
                <div className="max-w-md">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">
                    404
                  </p>
                  <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl">
                    Page not found
                  </h1>
                  <p className="mt-3 text-sm text-neutral-400">
                    The page you are looking for is not available yet. Our team is
                    working hard to bring it to you.
                  </p>
                  <p className="mt-2 text-xs text-neutral-500" dir="rtl">
                    الصفحة المطلوبة غير متوفرة حالياً.
                  </p>
                  <Link
                    to="/"
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 px-7 py-3 text-sm font-semibold text-black shadow-lg shadow-amber-500/20 transition-all hover:shadow-amber-400/40"
                  >
                    Back to Home
                  </Link>
                </div>
              </section>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;

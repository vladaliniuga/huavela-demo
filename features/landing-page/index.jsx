import { useCallback, useEffect, useRef, useState } from 'react';
import Header from './Header';
import Hero from './Hero';
import Discover from './Discover';
import Footer from './Footer';
import { DEFAULT_CATEGORY, getCategory } from './content';
import { cn, FOCUS } from './theme';

export default function LandingPage() {
  const [activeCategory, setActiveCategory] = useState(DEFAULT_CATEGORY);
  const [navigationRequest, setNavigationRequest] = useState(0);
  const widgetRef = useRef(null);
  const category = getCategory(activeCategory);

  const navigateToCategory = useCallback((id) => {
    setActiveCategory(getCategory(id).id);
    setNavigationRequest((previous) => previous + 1);
  }, []);

  useEffect(() => {
    if (!navigationRequest) return;

    const element = widgetRef.current;
    if (!element) return;

    element
      .querySelector('[role="tab"][aria-selected="true"]')
      ?.focus({ preventScroll: true });

    element.scrollIntoView({
      block: 'start',
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth',
    });
  }, [navigationRequest]);

  return (
    <>
      <a
        href="#main-content"
        className={cn(
          'sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:text-ink focus:shadow-lg',
          FOCUS,
        )}
      >
        Skip to main content
      </a>

      <Header onNavigate={navigateToCategory} />

      <main id="main-content" tabIndex={-1}>
        <Hero
          category={category}
          onCategoryChange={setActiveCategory}
          onNavigate={navigateToCategory}
          widgetRef={widgetRef}
        />
        <Discover onNavigate={navigateToCategory} />
      </main>

      <Footer />
    </>
  );
}

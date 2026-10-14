/* eslint-disable @next/next/no-html-link-for-pages */
import { useId, useRef, useState } from 'react';
import BrandLogo from '@/components/BrandLogo';
import Icon from '@/components/ui/Icon';
import { cn, FOCUS, PRIMARY_BUTTON } from '../theme';

export default function Header({ onNavigate }) {
  const menuId = useId();
  const toggleRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  function planTrip() {
    setMenuOpen(false);
    onNavigate('expert');
  }

  function closeOnEscape(event) {
    if (event.key !== 'Escape') return;
    setMenuOpen(false);
    toggleRef.current?.focus();
  }

  return (
    <header className="relative z-30 border-b border-ink/5 bg-mist">
      <div className="mx-auto flex min-h-24 max-w-[1440px] items-center justify-between gap-5 px-4 sm:px-8 lg:px-12">
        <a
          href="/"
          aria-label="Huavela home"
          className={cn('rounded-md', FOCUS)}
        >
          <BrandLogo />
        </a>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-8 md:flex"
        >
          <a
            href="#discover"
            className={cn('rounded text-sm font-medium text-ink', FOCUS)}
          >
            Explore
          </a>
          <a
            href="#about"
            className={cn('rounded text-sm font-medium text-ink', FOCUS)}
          >
            About huavela
          </a>
          <a
            href="mailto:aloha@huavela.com"
            className={cn('rounded text-sm font-medium text-ink', FOCUS)}
          >
            Get in touch
          </a>
          <button type="button" onClick={planTrip} className={PRIMARY_BUTTON}>
            <Icon name="sparkles" className="size-4" />
            Plan my trip
          </button>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={menuOpen}
          aria-controls={menuId}
          onClick={() => setMenuOpen((open) => !open)}
          onKeyDown={closeOnEscape}
          className={cn(
            'grid size-12 place-items-center rounded-full border border-line md:hidden',
            FOCUS,
          )}
        >
          <Icon name={menuOpen ? 'close' : 'menu'} />
        </button>
      </div>

      <nav
        id={menuId}
        aria-label="Mobile navigation"
        hidden={!menuOpen}
        onKeyDown={closeOnEscape}
        className="border-t border-line bg-mist px-4 py-4 md:hidden"
      >
        <div className="flex flex-col gap-1">
          <a
            href="#discover"
            onClick={() => setMenuOpen(false)}
            className={cn('rounded-xl px-4 py-3 font-medium', FOCUS)}
          >
            Explore your trip
          </a>
          <a
            href="#about"
            onClick={() => setMenuOpen(false)}
            className={cn('rounded-xl px-4 py-3 font-medium', FOCUS)}
          >
            About huavela
          </a>
          <a
            href="mailto:aloha@huavela.com"
            className={cn('rounded-xl px-4 py-3 font-medium', FOCUS)}
          >
            Get in touch
          </a>
          <button
            type="button"
            onClick={planTrip}
            className={cn(PRIMARY_BUTTON, 'mt-3')}
          >
            <Icon name="sparkles" />
            Plan with Travel expert
          </button>
        </div>
      </nav>
    </header>
  );
}

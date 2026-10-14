import BrandLogo from '@/components/BrandLogo';
import Icon from '@/components/ui/Icon';
import { cn, EYEBROW, FOCUS } from '../theme';

export default function Footer() {
  return (
    <footer id="about" className="border-t border-line bg-mist">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-12 sm:px-8 md:grid-cols-[1.2fr_1fr_1fr] lg:px-12">
        <div>
          <BrandLogo />
          <p className="mt-4 max-w-xs text-sm leading-6 text-muted">
            A little aloha. A new way to bring your island plans together.
          </p>
        </div>

        <div className="border-t border-line pt-4">
          <p className={EYEBROW}>Email</p>
          <a
            href="mailto:aloha@huavela.com"
            className={cn(
              'mt-3 inline-flex items-center gap-3 rounded text-base text-ink',
              FOCUS,
            )}
          >
            aloha@huavela.com
            <Icon name="arrow-up-right" className="size-4" />
          </a>
        </div>

        <div className="border-t border-line pt-4">
          <p className={EYEBROW}>Address</p>
          <address className="mt-3 text-sm not-italic leading-7 text-muted">
            2222 Kalakaua Ave. Suite 1002
            <br />
            Honolulu, HI 96815
          </address>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-2 px-4 pb-6 text-xs leading-5 text-muted sm:flex-row sm:px-8 lg:px-12">
        <p>Huavela LLC</p>
        <p>
          Interactive concept · No live AI, availability, payments, or bookings.
        </p>
      </div>
    </footer>
  );
}

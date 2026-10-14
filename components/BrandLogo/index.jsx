const LOGO_SIZES = {
  default: 'w-[172px] sm:w-[200px]',
  compact: 'w-[132px] sm:w-[148px]',
};

export default function BrandLogo({
  className = '',
  size = 'default',
  decorative = false,
}) {
  return (
    <span
      aria-hidden={decorative ? true : undefined}
      className={[
        'inline-flex shrink-0 items-center',
        LOGO_SIZES[size] || LOGO_SIZES.default,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <img
        src="/huavela-logo.png"
        alt={decorative ? '' : 'Huavela'}
        width={772}
        height={246}
        decoding="async"
        draggable={false}
        className="block h-auto w-full object-contain"
      />
    </span>
  );
}

// Keep the named export available for existing imports.
export function BrandMark({ className = '' }) {
  return <BrandLogo className={className} size="compact" decorative />;
}

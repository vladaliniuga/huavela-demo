const PATHS = {
  sparkles: (
    <>
      <path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z" />
      <path d="M20 2v4m-2-2h4" />
    </>
  ),
  car: (
    <>
      <path d="m5 8 1.5-4h11L19 8M3 9h18v9H3zM3 13h18M6 18v3m12-3v3" />
      <path d="M6 11h1m10 0h1" />
    </>
  ),
  bed: (
    <>
      <path d="M3 18V6m18 12v-7H3m0 7v3m18-3v3M3 16h18" />
      <path d="M6 7h4v4H6zm6 0h7a2 2 0 0 1 2 2v2h-9z" />
    </>
  ),
  plane: (
    <path d="M12 2a2 2 0 0 1 2 2v5l7 4v3l-7-2v4l2 2v1l-4-1-4 1v-1l2-2v-4l-7 2v-3l7-4V4a2 2 0 0 1 2-2Z" />
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m16 8-2.5 5.5L8 16l2.5-5.5L16 8Z" />
    </>
  ),
  pin: (
    <>
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="7" r="3" />
      <path d="M3 21v-3a6 6 0 0 1 12 0v3M16 4a3 3 0 0 1 0 6m2 5a5 5 0 0 1 3 5" />
    </>
  ),
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m16 16 5 5" />
    </>
  ),
  'arrow-right': <path d="M4 12h16m-6-6 6 6-6 6" />,
  'arrow-up': <path d="M12 20V4m-6 6 6-6 6 6" />,
  'arrow-up-right': <path d="M5 19 19 5M5 5h14v14" />,
  'chevron-down': <path d="m6 9 6 6 6-6" />,
  swap: <path d="M4 7h16m-4-4 4 4-4 4M20 17H4m4-4-4 4 4 4" />,
  menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  close: <path d="m6 6 12 12M6 18 18 6" />,
  check: <path d="m5 12 4 4L19 6" />,
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v6m0-10v.01" />
    </>
  ),
};

export default function Icon({ name, className = 'size-5', ...props }) {
  if (!PATHS[name]) return null;

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {PATHS[name]}
    </svg>
  );
}

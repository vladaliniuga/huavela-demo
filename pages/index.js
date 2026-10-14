import Head from 'next/head';
import { DM_Sans, DM_Serif_Display } from 'next/font/google';
import LandingPage from '@/features/landing-page';

const sans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-huavela-sans',
});

const display = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-huavela-display',
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Huavela | Your island escape, all together</title>
        <meta
          name="description"
          content="Explore the Huavela travel concept: cars, stays, flights, activities, and a Travel expert planning preview."
          key="description"
        />
        <meta name="theme-color" content="#e9f5fa" key="theme-color" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
          key="viewport"
        />
        {/* Remove this restriction when the live platform is ready. */}
        <meta name="robots" content="noindex, nofollow" key="robots" />
        <link
          rel="icon"
          href="/huavela-mark.svg"
          type="image/svg+xml"
          key="favicon"
        />
      </Head>

      <div
        className={`${sans.variable} ${display.variable} min-h-screen bg-mist font-sans text-ink antialiased`}
      >
        <LandingPage />
      </div>
    </>
  );
}

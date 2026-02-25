import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="fr">
      <Head>
        {/* Favicon & Apple Touch Icon */}
        <link rel="icon" href="/images/LogoGH.webp" />
        <link rel="apple-touch-icon" href="/images/LogoGH.webp" />
        <link rel="manifest" href="/manifest.webmanifest" />

        {/* Theme color */}
        <meta name="theme-color" content="#1C1917" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

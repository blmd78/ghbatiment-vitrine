import Head from 'next/head';
import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Page introuvable - GH Bâtiment</title>
        <meta name="robots" content="noindex" />
      </Head>

      <section className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden">
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #1a1a1a 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Decorative corners */}
        <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-copper/30" />
        <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-copper/30" />

        <div className="relative z-10 text-center px-6">
          <span className="font-display text-[clamp(8rem,20vw,14rem)] text-copper/10 leading-none block">
            404
          </span>

          <h1 className="font-display text-3xl md:text-4xl text-concrete-900 tracking-tight -mt-8 mb-4">
            Page introuvable
          </h1>

          <p className="text-concrete-500 text-lg max-w-md mx-auto mb-10">
            La page que vous recherchez n&apos;existe pas ou a été déplacée.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className="group inline-flex items-center gap-3 px-7 py-4 bg-copper text-white font-bold uppercase tracking-wider text-sm
                hover:bg-concrete-900 transition-all duration-300"
            >
              <svg
                className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              <span>Retour à l&apos;accueil</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-7 py-4 border border-concrete-200 text-concrete-700
                hover:border-copper hover:text-copper transition-all duration-300 text-sm font-semibold tracking-wide"
            >
              Contactez-nous
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

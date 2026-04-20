import { LogoLoop } from '@/components/ui/LogoLoop';
import { PARTENAIRES } from '@/lib/constants';

export function PartenairesSection() {
  return (
    <section className="py-24 lg:py-32 px-4 lg:px-16 bg-background">
      <div className="max-w-350 mx-auto">
        <div className="reveal text-center mb-12">
          <span className="text-label mb-4 block">Ils nous font confiance</span>
          <h2 className="text-display-md text-concrete-900">Nos partenaires</h2>
        </div>

        <LogoLoop
          logos={PARTENAIRES}
          speed={80}
          logoHeight={50}
          gap={56}
          pauseOnHover
          scaleOnHover
          fadeOut
        />
      </div>
    </section>
  );
}

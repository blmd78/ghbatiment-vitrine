'use client';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { CorpsMetierSection } from '@/features/home/components/CorpsMetierSection';
import { EngagementsSection } from '@/features/home/components/EngagementsSection';
import { GalerieSection } from '@/features/home/components/GalerieSection';
import { PartenairesSection } from '@/features/home/components/PartenairesSection';
import { CTASection } from '@/features/home/components/CTASection';

const RefreshRouteOnSave = dynamic(
  () =>
    import('@payloadcms/live-preview-react').then(
      (mod) => mod.RefreshRouteOnSave,
    ),
  { ssr: false },
);

type PayloadMedia = { url?: string | null; alt?: string | null };
type PayloadAlbum = { id?: string | null; title: string; images?: (string | PayloadMedia)[] | null };
type GalerieSection = { albums?: PayloadAlbum[] | null };

type EngagementItem = {
  id?: string;
  title: string;
  description: string;
  icon: 'shield' | 'team' | 'checklist' | 'star' | 'clock' | 'thumbup';
};

type MediaObject = { id: string; url: string; width?: number; height?: number; alt?: string };

type EngagementsSectionData = {
  label?: string;
  title?: string;
  titleHighlight?: string;
  image?: MediaObject | null;
  imageOverlayValue?: string;
  imageOverlayLabel?: string;
  engagements?: EngagementItem[];
  stats?: Array<{ value: string; suffix?: string; label: string; id?: string }>;
};

type HomePageProps = {
  engagementsSection?: EngagementsSectionData;
  galerieSection?: GalerieSection | null;
};

export default function HomePage({ engagementsSection = {}, galerieSection }: HomePageProps) {
  const router = useRouter();

  return (
    <>
      <RefreshRouteOnSave
        refresh={router.refresh}
        serverURL={process.env.NEXT_PUBLIC_ADMIN_URL || process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}
      />
      <CorpsMetierSection />
      <EngagementsSection data={engagementsSection} />
      <GalerieSection albums={galerieSection?.albums} />
      <PartenairesSection />
      <CTASection />
    </>
  );
}

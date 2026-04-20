import { CorpsMetierSection } from '@/features/home/components/CorpsMetierSection';
import { EngagementsSection } from '@/features/home/components/EngagementsSection';
import { GalerieSection } from '@/features/home/components/GalerieSection';
import { PartenairesSection } from '@/features/home/components/PartenairesSection';
import { CTASection } from '@/features/home/components/CTASection';
import { LivePreviewListener } from '@/components/payload/LivePreviewListener';

type PayloadMedia = { url?: string | null; alt?: string | null };
type PayloadAlbum = { id?: string | null; title: string; images?: (string | PayloadMedia)[] | null };
type GalerieSectionData = { albums?: PayloadAlbum[] | null };

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
  galerieSection?: GalerieSectionData | null;
};

export default function HomePage({ engagementsSection = {}, galerieSection }: HomePageProps) {
  return (
    <>
      <LivePreviewListener />
      <CorpsMetierSection />
      <EngagementsSection data={engagementsSection} />
      <GalerieSection albums={galerieSection?.albums} />
      <PartenairesSection />
      <CTASection />
    </>
  );
}

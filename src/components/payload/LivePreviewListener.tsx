'use client';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

const RefreshRouteOnSave = dynamic(
  () =>
    import('@payloadcms/live-preview-react').then(
      (mod) => mod.RefreshRouteOnSave,
    ),
  { ssr: false },
);

const SERVER_URL =
  process.env.NEXT_PUBLIC_ADMIN_URL ||
  process.env.NEXT_PUBLIC_SERVER_URL ||
  'http://localhost:3000';

export function LivePreviewListener() {
  const router = useRouter();
  return <RefreshRouteOnSave refresh={router.refresh} serverURL={SERVER_URL} />;
}

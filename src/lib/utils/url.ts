export function normalizeUrl(url: string): string {
  if (!url) return '';
  if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?\//.test(url)) {
    return url.replace(/^https?:\/\/[^/]+/, '');
  }
  return url;
}

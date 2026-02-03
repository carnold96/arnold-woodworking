export function getImageUrl(path) {
  const base = import.meta.env.BASE_URL;
  if (path.startsWith('/')) {
    return base.endsWith('/') ? base.slice(0, -1) + path : base + path;
  }
  return path;
}
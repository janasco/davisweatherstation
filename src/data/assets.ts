const base = ((import.meta as any).env?.PUBLIC_ASSET_BASE || '').replace(/\/$/, '');

export function asset(path: string): string {
  const suffix = path.startsWith('/') ? path : `/${path}`;
  return `${base}${suffix}`;
}

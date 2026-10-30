import { resellers, type Reseller } from '../data/resellers';

export interface CountryGroup {
  name: string;
  slug: string;
  count: number;
  resellers: Reseller[];
}

// Countries with a single listing that still deserve a dedicated landing page.
const prioritySingleCountries = new Set([
  'Canada',
  'Australia',
  'Japan',
  'Singapore',
  'Netherlands',
  'Spain',
  'Italy',
  'Ireland',
  'Switzerland',
  'Sweden',
  'Norway',
  'Denmark',
  'Belgium',
  'Austria',
  'Finland',
  'Czech Republic',
  'New Zealand',
  'South Africa',
  'Brazil',
  'India',
]);

export function countrySlug(name: string): string {
  return name
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const grouped = new Map<string, Reseller[]>();
for (const reseller of resellers) {
  const list = grouped.get(reseller.country) || [];
  list.push(reseller);
  grouped.set(reseller.country, list);
}

export const countryGroups: CountryGroup[] = [...grouped.entries()]
  .map(([name, list]) => ({
    name,
    slug: countrySlug(name),
    count: list.length,
    resellers: [...list].sort((a, b) => a.name.localeCompare(b.name)),
  }))
  .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

export const countryPages = countryGroups.filter(
  (country) => country.count >= 2 || prioritySingleCountries.has(country.name)
);

export function getCountryPage(slug: string): CountryGroup | undefined {
  return countryPages.find((country) => country.slug === slug);
}

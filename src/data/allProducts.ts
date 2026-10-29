import data from './generated/products.json';
import { asset } from './assets';

export interface UnifiedProduct {
  slug: string;
  name: string;
  category: string;
  description: string;
  features: string[];
  image?: string;
  sku?: string;
  davisUrl?: string;
  curated: boolean;
}

const categoryOrder = [
  'Weather Stations',
  'Sensors',
  'Data Collection',
  'Data Viewing',
  'Air Quality',
  'Mounting & Accessories',
  'Replacement Parts',
];

export const allProducts: UnifiedProduct[] = (data as UnifiedProduct[]).map((product) => ({
  ...product,
  ...(product.image ? { image: asset(product.image) } : {}),
}));

export const allProductCategories = [...new Set(allProducts.map((product) => product.category))].sort(
  (a, b) => {
    const ai = categoryOrder.indexOf(a);
    const bi = categoryOrder.indexOf(b);
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  }
);

export function getProduct(slug: string): UnifiedProduct | undefined {
  return allProducts.find((product) => product.slug === slug);
}

export function relatedProducts(product: UnifiedProduct, count = 4): UnifiedProduct[] {
  return allProducts
    .filter((item) => item.slug !== product.slug && item.category === product.category)
    .slice(0, count);
}

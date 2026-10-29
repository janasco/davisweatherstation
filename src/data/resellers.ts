import data from './generated/resellers.json';
import { asset } from './assets';

export interface Reseller {
  id: string;
  name: string;
  country: string;
  city?: string;
  slug: string;
  address?: string;
  phone?: string;
  telephone?: string;
  email?: string;
  website?: string;
  services?: string;
  resellerSince?: string;
  description?: string;
  about?: string;
  designations?: string[];
  certifications?: string[];
  products?: string[];
  additionalInfo?: string;
  image?: string;
  updatedAt?: string;
}

export const resellers: Reseller[] = (data as Reseller[]).map((reseller) => ({
  ...reseller,
  ...(reseller.image ? { image: asset(reseller.image) } : {}),
}));

export const countries = [...new Set(resellers.map((reseller) => reseller.country))].sort();

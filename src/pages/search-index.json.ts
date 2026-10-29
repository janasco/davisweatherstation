import type { APIRoute } from 'astro';
import { allProducts } from '../data/allProducts';
import { resellers } from '../data/resellers';
import { faqs } from '../data/faqs';
import { countryPages } from '../utils/countries';

export const prerender = true;

const pages = [
  { type: 'Page', title: 'Home', url: '/', description: 'Find authorized Davis Instruments resellers worldwide.' },
  { type: 'Page', title: 'Resellers', url: '/resellers/', description: 'Browse authorized Davis Instruments resellers by country.' },
  { type: 'Page', title: 'Resellers by Country', url: '/resellers/countries/', description: 'Browse Davis Instruments resellers by country.' },
  { type: 'Page', title: 'Products', url: '/products/', description: 'Explore the complete Davis Instruments product catalog.' },
  { type: 'Page', title: 'Smart Buying Guide', url: '/guide/', description: 'Build a recommended Davis weather station configuration.' },
  { type: 'Page', title: 'Frequently Asked Questions', url: '/faq/', description: 'Answers about products, installation, WeatherLink, and support.' },
  { type: 'Page', title: 'About Us', url: '/about/', description: 'About the Davis Weather Station directory.' },
  { type: 'Page', title: 'Contact Us', url: '/contact/', description: 'Contact Davis Weather Station.' },
  { type: 'Page', title: 'Terms & Conditions', url: '/terms/', description: 'Terms of use for this website.' },
  { type: 'Page', title: 'Privacy Policy', url: '/privacy/', description: 'How we handle personal information.' },
  { type: 'Page', title: 'Cookie Policy', url: '/cookies/', description: 'Cookies and similar technologies used on this site.' },
  { type: 'Page', title: 'Disclaimer', url: '/disclaimer/', description: 'Important information about the scope of our content.' },
  { type: 'Page', title: 'Return & Refund Policy', url: '/returns/', description: 'Returns and refunds for reseller purchases.' },
  { type: 'Page', title: 'Shipping Policy', url: '/shipping/', description: 'Shipping and delivery information.' },
  { type: 'Page', title: 'Accessibility Statement', url: '/accessibility/', description: 'Our accessibility commitment and feedback process.' },
  { type: 'Page', title: 'Intellectual Property Notice', url: '/intellectual-property/', description: 'Ownership and permitted use of content.' },
  { type: 'Page', title: 'Acceptable Use Policy', url: '/acceptable-use/', description: 'Rules for using this website and quote form.' },
  { type: 'Page', title: 'Report Abuse', url: '/report-abuse/', description: 'Report spam, fraud, or abusive content.' },
  { type: 'Page', title: 'Do Not Sell or Share', url: '/do-not-sell/', description: 'Privacy choices and California rights.' },
  { type: 'Page', title: 'Legal Notice', url: '/legal-notice/', description: 'Operator, contact, and legal disclosures.' },
];

const entries = [
  ...pages,
  ...countryPages.map((country) => ({
    type: 'Page',
    title: `Davis Resellers in ${country.name}`,
    url: `/resellers/country/${country.slug}/`,
    description: `${country.count} authorized Davis Instruments ${country.count === 1 ? 'reseller' : 'resellers'} in ${country.name}.`,
    keywords: country.name,
  })),
  ...allProducts.map((product) => ({
    type: 'Product',
    title: product.name,
    url: `/products/${product.slug}/`,
    description: product.description,
    keywords: product.sku || '',
  })),
  ...resellers.map((reseller) => ({
    type: 'Reseller',
    title: reseller.name,
    url: `/resellers/${reseller.slug}/`,
    description: `${reseller.country}${reseller.address ? ` · ${reseller.address}` : ''}`,
    keywords: reseller.country,
  })),
  ...faqs.map((faq) => ({
    type: 'FAQ',
    title: faq.question,
    url: '/faq/',
    description: faq.answer.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 180),
    keywords: faq.category,
  })),
];

export const GET: APIRoute = () =>
  new Response(JSON.stringify(entries), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600',
    },
  });

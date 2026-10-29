import data from './generated/faqs.json';

export interface FAQ {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export const faqs = data as FAQ[];

export const faqCategories = [...new Set(faqs.map((faq) => faq.category))];

import { resellers } from '../data/resellers';

function getDayOfYear(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function getFeaturedResellers(count: number = 6) {
  const dayOfYear = getDayOfYear();
  const shuffled = [...resellers];
  
  for (let i = shuffled.length - 1; i > 0; i--) {
    const seed = dayOfYear * 10000 + i;
    const j = Math.floor(seededRandom(seed) * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled.slice(0, count);
}

export function getDailyRotationDate(): string {
  return new Date().toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });
}

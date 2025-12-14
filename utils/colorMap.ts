import { PostCategory } from '../types';

export function getSphereColor(sentimentScore: number, category?: PostCategory): string {
  // Category-based overrides - Neon/Glowing accents
  if (category === 'rant') return '#f43f5e'; // Rose Red (Glowing)
  if (category === 'achievement') return '#fbbf24'; // Golden Amber
  if (category === 'relationship') return '#c084fc'; // Electric Purple

  // Default Sentiment Gradient (Aurora Theme)
  // -1 (Sad/Deep) -> 0 (Neutral) -> 1 (Happy/Bright)
  
  if (sentimentScore < -0.3) {
    return '#2563eb'; // Deep Blue
  } else if (sentimentScore < 0.3) {
    return '#94a3b8'; // Starlight Grey
  } else {
    return '#2dd4bf'; // Cyan/Teal
  }
}

export function getAvatarBaseColor(sentimentScore: number): string {
  // The avatar body color - ethereal glow
  if (sentimentScore < -0.2) return '#818cf8'; // Indigo
  if (sentimentScore > 0.2) return '#2dd4bf'; // Teal
  return '#cbd5e1'; // Moon White
}
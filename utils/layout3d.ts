import { AnalyzedPost, MemorySphere } from '../types';
import { getSphereColor } from './colorMap';

export function layoutMemorySpheres(posts: AnalyzedPost[]): MemorySphere[] {
  const count = posts.length;
  
  return posts.map((post, i) => {
    // X Axis: Time/Sequence. Center 0 is middle of timeline.
    // Range roughly -15 to +15 depending on count.
    const x = (i - count / 2) * 0.8;

    // Y Axis: Sentiment. Higher is happier.
    // Range: -3 to +3
    const y = post.sentimentScore * 4;

    // Z Axis: Perlin-like noise or spiral to add depth.
    // We push them back slightly so the Avatar stands in front (at Z=2 approx)
    const z = Math.sin(i * 0.5) * 2 - 4; 

    // Radius: Based on intensity (text length/emotion)
    // Range: 0.2 to 0.6
    const radius = 0.2 + (post.intensity / 5) * 0.4;

    return {
      id: post.id,
      post,
      position: [x, y, z],
      radius,
      color: getSphereColor(post.sentimentScore, post.category),
    };
  });
}
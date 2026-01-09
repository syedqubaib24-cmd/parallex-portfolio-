
import React from 'react';

export const TOTAL_FRAMES = 240;
export const ACCENT_ORANGE = '#ff5e00';

// Note: In a real app, frames would be individual files. 
// For this demo, we simulate frame indices with the provided template link structure.
export const getFrameUrl = (index: number) => {
  const padded = index.toString().padStart(3, '0');
  return `https://rsecsgeiuzkskyxbqalw.supabase.co/storage/v1/object/public/Protfolio%202/frame_${padded}_delay-0.042s.webp`;
};

export const LEARNING_PATHS = [
  {
    id: '1',
    title: 'Animated Websites',
    index: '#01',
    description: 'Master the art of high-end scroll animations and interactive parallax experiences.',
    thumbnail: 'https://picsum.photos/seed/anim/600/400'
  },
  {
    id: '2',
    title: 'AI Website Builders',
    index: '#02',
    description: 'Leverage modern AI tools to generate stunning layouts and copy in minutes.',
    thumbnail: 'https://picsum.photos/seed/aiweb/600/400'
  },
  {
    id: '3',
    title: 'Internal AI Tools',
    index: '#03',
    description: 'Build custom automated dashboards and productivity bots for your business.',
    thumbnail: 'https://picsum.photos/seed/tools/600/400'
  },
  {
    id: '4',
    title: 'AI App Development',
    index: '#04',
    description: 'Deploy full-stack web applications with the help of AI coding assistants.',
    thumbnail: 'https://picsum.photos/seed/apps/600/400'
  }
];

export const SOCIAL_ICONS = [
  { name: 'YouTube', url: '#' },
  { name: 'Instagram', url: '#' },
  { name: 'X', url: '#' }
];

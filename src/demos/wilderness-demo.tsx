'use client';

import React from 'react';
import ParallaxHero, { defaultLayers } from '@/components/ui/wilderness';

export default function ParallaxHeroDemo() {
  return (
    <ParallaxHero 
      layers={defaultLayers} 
      title="HERO" 
      subtitle="SPATIAL DEPTH DEMO" 
    />
  );
}

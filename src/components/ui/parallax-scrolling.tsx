'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import { ChevronDown, Compass } from 'lucide-react';

export interface ParallaxComponentProps {
  title?: string;
  subtitle?: string;
}

export function ParallaxComponent({
  title = "PORTFOLIO",
  subtitle = "CREATIVE TECHNOLOGIST & INTERACTION DESIGNER"
}: ParallaxComponentProps) {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const triggerElement = parallaxRef.current?.querySelector('[data-parallax-layers]') as HTMLElement | null;

    if (triggerElement) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: "0% 0%",
          end: "100% 0%",
          scrub: 0
        }
      });

      const layers = [
        { layer: "1", yPercent: 70 },
        { layer: "2", yPercent: 55 },
        { layer: "3", yPercent: 40 },
        { layer: "4", yPercent: 10 }
      ];

      layers.forEach((layerObj, idx) => {
        tl.to(
          triggerElement.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`),
          {
            yPercent: layerObj.yPercent,
            ease: "none"
          },
          idx === 0 ? undefined : "<"
        );
      });
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      // Clean up GSAP and ScrollTrigger instances
      ScrollTrigger.getAll().forEach(st => st.kill());
      if (triggerElement) {
        gsap.killTweensOf(triggerElement);
      }
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="parallax" ref={parallaxRef}>
      <section className="parallax__header">
        <div className="parallax__visuals">
          <div className="parallax__black-line-overflow"></div>
          <div data-parallax-layers className="parallax__layers">
            {/* Layer 1: Distant Sky / Cosmos */}
            <img 
              src="https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=2000&q=80" 
              loading="eager" 
              width="800" 
              data-parallax-layer="1" 
              alt="Distant horizon" 
              className="parallax__layer-img" 
            />
            {/* Layer 2: Midground Mountain Ridge */}
            <img 
              src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=80" 
              loading="eager" 
              width="800" 
              data-parallax-layer="2" 
              alt="Mountain peaks" 
              className="parallax__layer-img mix-blend-screen opacity-90" 
            />
            {/* Layer 3: Typography Layer */}
            <div data-parallax-layer="3" className="parallax__layer-title">
              <div className="text-center px-4">
                <span className="text-xs md:text-sm font-mono tracking-[0.35em] text-emerald-400 uppercase mb-3 block">
                  {subtitle}
                </span>
                <h2 className="parallax__title text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter text-white uppercase drop-shadow-2xl">
                  {title}
                </h2>
              </div>
            </div>
            {/* Layer 4: Foreground Mist and Trees */}
            <img 
              src="https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2000&q=80" 
              loading="eager" 
              width="800" 
              data-parallax-layer="4" 
              alt="Foreground trees and mist" 
              className="parallax__layer-img" 
            />
          </div>
          <div className="parallax__fade"></div>
        </div>
      </section>
      <section className="parallax__content flex flex-col items-center justify-center py-10">
        <div className="flex flex-col items-center gap-3 text-zinc-400 text-xs font-mono tracking-widest uppercase animate-bounce">
          <div className="p-2 rounded-full border border-zinc-800 bg-zinc-900/60">
            <Compass className="w-6 h-6 text-emerald-400" />
          </div>
          <span>Scroll to explore</span>
          <ChevronDown className="w-4 h-4 text-emerald-400" />
        </div>
      </section>
    </div>
  );
}

export default ParallaxComponent;


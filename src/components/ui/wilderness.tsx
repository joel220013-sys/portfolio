'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import { cn } from '@/lib/utils';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Plus, 
  Search, 
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';

export interface ParallaxLayer {
  src: string;
  alt: string;
  speedX?: number;
  speedY?: number;
  speedZ?: number;
  rotation?: number;
  distance?: number;
  className?: string;
  zIndex?: number;
}

export const defaultLayers: ParallaxLayer[] = [];

export interface CyberSecurityHeroProps {
  title?: string;
  subtitle?: string;
  layers?: ParallaxLayer[];
  className?: string;
}

export const ParallaxHero: React.FC<CyberSecurityHeroProps> = ({
  className,
}) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const characterRef = useRef<HTMLDivElement>(null);
  const textLayerRef = useRef<HTMLDivElement>(null);
  const hudLinesRef = useRef<HTMLDivElement>(null);
  const serviceCardRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);

  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [velocityShake, setVelocityShake] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let shakeDecay: number | null = null;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let currentShake = 0;

    const handleMouseMove = (e: MouseEvent) => {
      // Normalized coordinates (-1 to 1) from screen center
      const normX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const normY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      const velocity = Math.min(2.5, Math.hypot(e.movementX, e.movementY) / 20);

      targetX = normX;
      targetY = normY;
      currentShake = velocity;
      setVelocityShake(velocity);

      setCursorPos({ x: Math.round(e.clientX), y: Math.round(e.clientY) });

      if (shakeDecay) window.clearTimeout(shakeDecay);
      shakeDecay = window.setTimeout(() => {
        currentShake = 0;
        setVelocityShake(0);
      }, 150);
    };

    let animId: number;
    const render = () => {
      // Smooth lerp
      currentX += (targetX - currentX) * 0.07;
      currentY += (targetY - currentY) * 0.07;

      const jitterX = (Math.random() - 0.5) * currentShake * 3;
      const jitterY = (Math.random() - 0.5) * currentShake * 3;

      // 1. Central 3D Cyber Character subtle head-tracking & parallax
      if (characterRef.current) {
        const rotY = currentX * 12;
        const rotX = -currentY * 10;
        const transX = currentX * -14 + jitterX;
        const transY = currentY * -10 + jitterY;
        characterRef.current.style.transform = `perspective(1200px) rotateY(${rotY}deg) rotateX(${rotX}deg) translateX(${transX}px) translateY(${transY}px) scale(1.02)`;
      }

      // 2. Center Text Parallax
      if (textLayerRef.current) {
        const tX = currentX * -22 + jitterX * 1.5;
        const tY = currentY * -16 + jitterY * 1.5;
        textLayerRef.current.style.transform = `translateX(${tX}px) translateY(${tY}px)`;
      }

      // 3. Right Circular "Our service" Card 3D Floating Tilt
      if (serviceCardRef.current) {
        const rotY = currentX * 24;
        const rotX = -currentY * 20;
        const transZ = 40 + currentShake * 25;
        serviceCardRef.current.style.transform = `perspective(1000px) rotateY(${rotY}deg) rotateX(${rotX}deg) translateZ(${transZ}px) translateX(${currentX * -28 + jitterX * 2}px) translateY(${currentY * -22 + jitterY * 2}px)`;
      }

      // 4. Left Thumbnail Card 3D Tilt
      if (leftCardRef.current) {
        const rotY = currentX * 18;
        const rotX = -currentY * 15;
        leftCardRef.current.style.transform = `perspective(1000px) rotateY(${rotY}deg) rotateX(${rotX}deg) translateX(${currentX * -16 + jitterX}px) translateY(${currentY * -12 + jitterY}px)`;
      }

      // 5. Precision HUD Gridlines micro-drift
      if (hudLinesRef.current) {
        hudLinesRef.current.style.transform = `translateX(${currentX * -4}px) translateY(${currentY * -4}px)`;
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);
    const tickerCb = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (shakeDecay) window.clearTimeout(shakeDecay);
      cancelAnimationFrame(animId);
      gsap.ticker.remove(tickerCb);
      lenis.destroy();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className={cn(
        'relative h-[100dvh] min-h-[700px] w-full overflow-hidden bg-[#111318] text-white select-none selection:bg-[#44f575] selection:text-black flex flex-col justify-between',
        className
      )}
    >
      {/* 1. Central 3D Cyberpunk Character Layer (Pink hair, Tinted Glasses, Cyber Jaw) */}
      <div 
        ref={characterRef}
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none transition-transform duration-200 ease-out will-change-transform"
      >
        <img
          src="/cyber-hero-joel.jpg"
          alt="Joel Joyson N - Cyberpunk Hero"
          className="w-full h-full object-cover object-[center_20%] brightness-[0.95] contrast-[108%]"
        />
        {/* Soft Vignette Gradients for Editorial Atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111318] via-transparent to-[#111318]/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#111318]/70 via-transparent to-[#111318]/70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(17,19,24,0.6)_100%)]" />
      </div>

      {/* 2. Precision Minimalist HUD Crosshair Gridlines (Matching Reference Image Exactly) */}
      <div 
        ref={hudLinesRef}
        className="absolute inset-0 z-10 pointer-events-none will-change-transform"
      >
        {/* Center Vertical Axis Hairline */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-white/20" />

        {/* Horizontal Eye/Glasses Alignment Line */}
        <div className="absolute left-0 right-0 top-[26%] h-[1px] bg-white/15" />

        {/* Horizontal Mid Jaw/Subtitle Line */}
        <div className="absolute left-0 right-0 top-[52%] h-[1px] bg-white/20" />

        {/* Horizontal Title Baseline Line */}
        <div className="absolute left-0 right-0 top-[78%] h-[1px] bg-white/15" />

        {/* Large Concentric Orbital Ring Arc (Right Side) */}
        <div className="absolute top-[-10%] right-[-5%] w-[820px] h-[820px] rounded-full border border-white/10 pointer-events-none" />
        <div className="absolute top-[8%] right-[8%] w-[580px] h-[580px] rounded-full border border-white/10 pointer-events-none" />

        {/* Left Sub-Grid Segment */}
        <div className="absolute top-[52%] left-10 sm:left-16 w-32 sm:w-48 h-[1px] bg-white/30" />
      </div>

      {/* 3. Top Navigation Bar (Matching Reference Image: Home, Explore, Service, Catalog) */}
      <nav className="relative z-30 w-full px-6 sm:px-12 pt-8 flex items-center justify-between text-xs font-mono">
        {/* Left Nav Links */}
        <div className="flex items-center gap-8 text-zinc-300">
          <a href="#home" className="relative text-white font-bold pb-1 group flex flex-col items-center">
            <span>Home</span>
            <span className="w-full h-[2px] bg-white mt-0.5 rounded-full" />
          </a>
          <a href="#about" className="hover:text-white transition-colors">Explore</a>
          <a href="#projects" className="hover:text-white transition-colors">Service</a>
        </div>

        {/* Top Right Actions */}
        <div className="flex items-center gap-4">
          <a
            href="#projects"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/20 bg-black/30 backdrop-blur-md text-zinc-300 hover:text-white hover:border-white/40 transition-all group"
          >
            <span className="text-[11px] tracking-wide">Catalog</span>
            <div className="w-3.5 h-3.5 rounded-full border border-zinc-400 group-hover:border-white flex items-center justify-center">
              <span className="w-1 h-1 rounded-full bg-white" />
            </div>
          </a>
        </div>
      </nav>

      {/* 4. Left Side HUD Badges (Gaming / Protecting Future, Battery — 50%) */}
      <div className="absolute top-24 left-6 sm:left-12 z-20 pointer-events-none flex flex-col gap-1 font-mono text-[10px] text-zinc-400 select-none">
        <span className="text-zinc-200 uppercase tracking-widest font-semibold">Gaming Ops</span>
        <span className="text-zinc-500 uppercase tracking-wider">Protecting Future</span>
      </div>

      {/* Left Mid-Signal Indicator: "— 50%" */}
      <div className="absolute top-[48%] left-6 sm:left-12 z-20 pointer-events-none flex items-center gap-2 font-mono text-xs text-zinc-300 select-none">
        <span className="w-6 h-[2px] bg-[#44f575]" />
        <span className="text-[#44f575] font-bold">50%</span>
      </div>

      {/* 5. Left Lower Info Card (Glyph, Thumbnail, Editorial Copy) */}
      <div 
        ref={leftCardRef}
        className="absolute bottom-16 sm:bottom-20 left-6 sm:left-12 z-20 max-w-[280px] sm:max-w-[320px] transition-transform duration-200 ease-out will-change-transform hidden md:flex flex-col gap-3"
      >
        <div className="flex items-center gap-3">
          {/* Abstract Glyph Badge */}
          <div className="w-10 h-10 rounded-lg bg-zinc-900/80 border border-white/20 flex items-center justify-center shadow-lg backdrop-blur-md">
            <div className="w-5 h-5 rounded-full border-2 border-white border-r-transparent rotate-45" />
          </div>

          {/* Mini Thumbnail */}
          <div className="w-16 h-10 rounded-lg overflow-hidden border border-white/20 bg-black">
            <img 
              src="/cyber-techwear-03.jpg" 
              alt="Cyber techwear study" 
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>

        {/* Micro-Editorial Manifesto Text */}
        <p className="text-[10px] sm:text-[11px] font-mono leading-relaxed text-zinc-400 select-none">
          With expertise in communication/cyber security protocols, we protect against the most aggressive threats across the cyber frontier universe.
        </p>
      </div>

      {/* 6. Center Massive Typography ("JOEL JOYSON" & Subtitle - Positioned at Neck Level) */}
      <div 
        ref={textLayerRef}
        className="absolute left-0 right-0 top-[56%] sm:top-[58%] md:top-[60%] z-20 w-full flex flex-col items-center justify-center text-center px-4 pointer-events-none transition-transform duration-200 ease-out will-change-transform"
      >
        {/* Subtitle Line with "Next" Tag */}
        <div className="flex items-center justify-center gap-4 mb-1.5 font-sans">
          <span className="text-xs sm:text-sm font-semibold tracking-wide text-zinc-200 drop-shadow-md">
            Creative Technologist &amp; Spatial Architect
          </span>
          <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest hidden xs:inline">
            Next —
          </span>
        </div>

        {/* Precision Crosshair Plus Sign above Title */}
        <div className="my-0.5 text-white/50">
          <Plus className="w-3.5 h-3.5 text-white/70" />
        </div>

        {/* Massive Bold Headline: JOEL / JOYSON */}
        <h1 className="font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter uppercase leading-[0.88] text-white drop-shadow-[0_15px_40px_rgba(0,0,0,0.9)] select-none">
          <span className="block">JOEL</span>
          <span className="block">JOYSON</span>
        </h1>

        {/* Subtle Signature Badge */}
        <div className="mt-2.5 font-mono text-[10px] sm:text-xs text-zinc-400 tracking-[0.3em] uppercase">
          // CYBER PROTOCOL &amp; SPATIAL SYSTEMS //
        </div>
      </div>

      {/* 7. Right Floating Circular "Our service ↘" Card (Matching Reference Image) */}
      <div 
        ref={serviceCardRef}
        className="absolute top-[38%] right-6 sm:right-14 lg:right-24 z-20 transition-transform duration-200 ease-out will-change-transform"
      >
        <a 
          href="#projects"
          className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full border border-white/30 p-1 flex items-center justify-center group overflow-hidden bg-black/40 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.8)] cursor-pointer block"
        >
          {/* Avatar Inside */}
          <div className="w-full h-full rounded-full overflow-hidden relative">
            <img
              src="/cyber-service-avatar.png"
              alt="Our Service Avatar"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 brightness-95"
            />
            {/* Dark overlay for text contrast */}
            <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors" />
          </div>

          {/* Center Label: "Our service" */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-xs sm:text-sm font-sans font-bold text-white tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              Our service
            </span>
          </div>

          {/* Bottom-Right Arrow Circle: ↘ */}
          <div className="absolute bottom-1 right-1 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/80 border border-white/40 flex items-center justify-center text-white group-hover:bg-[#44f575] group-hover:text-black group-hover:border-[#44f575] transition-all duration-300 shadow-md">
            <ArrowDownRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
        </a>
      </div>

      {/* 8. Bottom-Right Vibrant Neon Lime Pill Button: "Catalog" (Matching Reference Image) */}
      <div className="relative z-30 w-full px-6 sm:px-12 pb-8 flex items-center justify-between pointer-events-auto">
        <div className="text-[11px] font-mono text-zinc-500 hidden sm:block">
          STATUS: <span className="text-[#44f575]">ENCRYPTED_ONLINE</span>
        </div>

        <a
          href="#projects"
          className="ml-auto px-7 py-2.5 rounded-full bg-[#44f575] hover:bg-[#5aff8b] text-black font-sans font-bold text-xs sm:text-sm tracking-wide transition-all duration-300 hover:shadow-[0_0_25px_rgba(68,245,117,0.6)] hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer shadow-lg"
        >
          <span>Catalog</span>
        </a>
      </div>
    </section>
  );
};

export const ParallaxHeroDemo: React.FC = () => {
  return <ParallaxHero />;
};

export default ParallaxHero;

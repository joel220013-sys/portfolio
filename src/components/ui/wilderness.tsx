'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import { cn } from '@/lib/utils';
import { ChevronDown, Compass } from 'lucide-react';

export interface ParallaxLayer {
  src: string;
  alt: string;
  speedX: number;
  speedY: number;
  speedZ: number;
  rotation: number;
  distance: number;
  className?: string;
  zIndex: number;
  initialTop: string;
  initialLeft: string;
  width: string;
}

export interface ParallaxHeroProps {
  layers?: ParallaxLayer[];
  title?: string;
  subtitle?: string;
  className?: string;
}

// Fallback Unsplash assets in case CDN mirrors are blocked or fail
const UNSPLASH_FALLBACKS: Record<string, string> = {
  background: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=3200&q=80',
  mountain: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=80',
  fog: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=2200&q=80',
  forest: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2000&q=80',
};

export const defaultLayers: ParallaxLayer[] = [
  {
    src: 'https://cdn.21st.dev/assets/mirror/bf/bfb8ca258f591d2b7388d05d79ac2332b695867281627c1bc8c7165ca6429a6d.png',
    alt: 'background',
    speedX: 0.03,
    speedY: 0.038,
    speedZ: 0,
    rotation: 0,
    distance: -200,
    zIndex: 1,
    initialTop: 'calc(50% - 50px)',
    initialLeft: 'calc(50% + 0px)',
    width: '3200px',
  },
  {
    src: 'https://cdn.21st.dev/assets/mirror/c8/c878e14d1f8e481f6f70b31fb01de352338db5353f5b8852a241062bb251b558.png',
    alt: 'fog-7',
    speedX: 0.27,
    speedY: 0.32,
    speedZ: 0,
    rotation: 0,
    distance: 850,
    zIndex: 2,
    initialTop: 'calc(50% - 100px)',
    initialLeft: 'calc(50% + 300px)',
    width: '1900px',
  },
  {
    src: 'https://cdn.21st.dev/assets/mirror/e9/e94a2247aa54feee12cd1580a7c3abf97d6f55bbe7e50006d8dda6e4dffbe921.png',
    alt: 'mountain-10',
    speedX: 0.095,
    speedY: 0.005,
    speedZ: 0,
    rotation: 0,
    distance: 1110,
    zIndex: 3,
    initialTop: 'calc(50% + 169px)',
    initialLeft: 'calc(50% + 330px)',
    width: '1200px',
  },
  {
    src: 'https://cdn.21st.dev/assets/mirror/99/9955626de3f10d97d27b7b89f7be180c02e1700f288db28e0c6824142871523f.png',
    alt: 'fog-6',
    speedX: 0.25,
    speedY: 0.28,
    speedZ: 0,
    rotation: 0,
    distance: 1400,
    zIndex: 4,
    initialTop: 'calc(50% + 285px)',
    initialLeft: 'calc(50%)',
    width: '2200px',
    className: 'opacity-30',
  },
  {
    src: 'https://cdn.21st.dev/assets/mirror/dd/dd999609be149c46fcb65fce4d267cad8d5651b0c31901b399054da5146cb46e.png',
    alt: 'mountain-9',
    speedX: 0.125,
    speedY: 0.155,
    speedZ: 0.15,
    rotation: 0.02,
    distance: 1700,
    zIndex: 51,
    initialTop: 'calc(50% + 313px)',
    initialLeft: 'calc(50% - 557px)',
    width: '670px',
  },
  {
    src: 'https://cdn.21st.dev/assets/mirror/d5/d579e64ddeb3a32d04dff5391980b827eb4d6d4aafa2cc3231e2cbe02d66a7c7.png',
    alt: 'fog-5',
    speedX: 0.16,
    speedY: 0.105,
    speedZ: 0,
    rotation: 0,
    distance: 1900,
    zIndex: 7,
    initialTop: 'calc(50% + 360px)',
    initialLeft: 'calc(50% + 40px)',
    width: '650px',
  },
  {
    src: 'https://cdn.21st.dev/assets/mirror/b7/b74be54427fd5b9568571ba97684bc8a4334d366a3f3b32c353d31fd1501c09b.png',
    alt: 'mountain-7',
    speedX: 0.1,
    speedY: 0.1,
    speedZ: 0,
    rotation: 0.09,
    distance: 2000,
    zIndex: 19,
    initialTop: 'calc(50% + 223px)',
    initialLeft: 'calc(50% + 495px)',
    width: '738px',
  },
  {
    src: 'https://cdn.21st.dev/assets/mirror/ed/edf306a4225b6188283aa94ecec1553b2e0855038a3acaed402001f38c64af1d.png',
    alt: 'mountain-6',
    speedX: 0.065,
    speedY: 0.05,
    speedZ: 0.05,
    rotation: 0.12,
    distance: 2300,
    zIndex: 18,
    initialTop: 'calc(50% + 120px)',
    initialLeft: 'calc(50% + 590px)',
    width: '408px',
  },
  {
    src: 'https://cdn.21st.dev/assets/mirror/8d/8d12582b7eac71f981eca3a8bb19157fb57fc4b05c14f9ef80fd029e5fecfab5.png',
    alt: 'fog-4',
    speedX: 0.135,
    speedY: 0.1,
    speedZ: 0,
    rotation: 0,
    distance: 2400,
    zIndex: 11,
    initialTop: 'calc(50% + 223px)',
    initialLeft: 'calc(50% + 460px)',
    width: '590px',
    className: 'opacity-50',
  },
  {
    src: 'https://cdn.21st.dev/assets/mirror/9c/9c1a1b7f4b165011788c27d440d920e407d70f148cbc9a01eacfecb49126efcb.png',
    alt: 'mountain-5',
    speedX: 0.08,
    speedY: 0.05,
    speedZ: 0.13,
    rotation: 0.1,
    distance: 2550,
    zIndex: 12,
    initialTop: 'calc(50% + 320px)',
    initialLeft: 'calc(50% + 230px)',
    width: '725px',
  },
  {
    src: 'https://cdn.21st.dev/assets/mirror/0e/0e7888cc6d1732222b5c1f38b925cf1ecdb7fec02fd1193dd1cfef280a453c5a.png',
    alt: 'fog-3',
    speedX: 0.11,
    speedY: 0.018,
    speedZ: 0,
    rotation: 0,
    distance: 2800,
    zIndex: 113,
    initialTop: 'calc(50% + 210px)',
    initialLeft: 'calc(50% + 5px)',
    width: '1600px',
  },
  {
    src: 'https://cdn.21st.dev/assets/mirror/fa/fa0946f924ad025b207616cfe20ce022bcccd22ac9db4038a584ace23b7d9721.png',
    alt: 'mountain-4',
    speedX: 0.059,
    speedY: 0.024,
    speedZ: 0.35,
    rotation: 0.14,
    distance: 3200,
    zIndex: 15,
    initialTop: 'calc(50% + 196px)',
    initialLeft: 'calc(50% - 698px)',
    width: '1100px',
  },
  {
    src: 'https://cdn.21st.dev/assets/mirror/90/90863919566208c1eb7a78136d1dd493dd402f4d5a5efe2fc890a288a6b07449.png',
    alt: 'mountain-3',
    speedX: 0.04,
    speedY: 0.018,
    speedZ: 0.32,
    rotation: 0.05,
    distance: 3400,
    zIndex: 20,
    initialTop: 'calc(50% - 20px)',
    initialLeft: 'calc(50% + 750px)',
    width: '630px',
  },
  {
    src: 'https://cdn.21st.dev/assets/mirror/b2/b2d0ba5c7f17d038a04475b8f36563aea22cfee00983db3b5477f1ac4c9a5097.png',
    alt: 'fog-2',
    speedX: 0.15,
    speedY: 0.0115,
    speedZ: 0,
    rotation: 0,
    distance: 3600,
    zIndex: 16,
    initialTop: 'calc(50% - 20px)',
    initialLeft: 'calc(50% + 698px)',
    width: '1100px',
  },
  {
    src: 'https://cdn.21st.dev/assets/mirror/c4/c4ae700b3a0070eae9f3c005a17572ae68fcb8373d322f279d28c5bf19cd501d.png',
    alt: 'mountain-2',
    speedX: 0.0235,
    speedY: 0.013,
    speedZ: 0.42,
    rotation: 0.15,
    distance: 3800,
    zIndex: 17,
    initialTop: 'calc(50% + 256px)',
    initialLeft: 'calc(50% + 528px)',
    width: '800px',
  },
  {
    src: 'https://cdn.21st.dev/assets/mirror/41/414097ad4507410ac1dc884afcc92bb3f4f45763fd17b2986bf82dd43c31da97.png',
    alt: 'mountain-1',
    speedX: 0.027,
    speedY: 0.018,
    speedZ: 0.53,
    rotation: 0.2,
    distance: 4000,
    zIndex: 18,
    initialTop: 'calc(50% + 196px)',
    initialLeft: 'calc(50% - 728px)',
    width: '1100px',
  },
  {
    src: 'https://cdn.21st.dev/assets/mirror/aa/aa8ace86d9779fcccce3a1a28b8ac0cb86336b5980706659f2c8889c3daaf5a1.png',
    alt: 'fog-1',
    speedX: 0.12,
    speedY: 0.01,
    speedZ: 0,
    rotation: 0,
    distance: 4200,
    zIndex: 21,
    initialTop: 'calc(100% - 355px)',
    initialLeft: 'calc(50% + 100px)',
    width: '1900px',
    className: 'opacity-50',
  },
];

export const ParallaxHero: React.FC<ParallaxHeroProps> = ({
  layers = defaultLayers,
  title = 'HERO',
  subtitle: _subtitle,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<(HTMLImageElement | null)[]>([]);
  const textRef = useRef<HTMLDivElement>(null);
  const [_xValue, setXValue] = useState(0);
  const [_yValue, setYValue] = useState(0);
  const [_rotateDegree, setRotateDegree] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTouchDevice(
        'ontouchstart' in window || navigator.maxTouchPoints > 0
      );
    };
    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  const updateLayers = useCallback((
    cursorPosition: number,
    xVal: number,
    yVal: number,
    rotateDeg: number,
    scrollProg: number = 0
  ) => {
    layerRefs.current.forEach((el, index) => {
      if (!el) return;

      const layer = layers[index];
      if (!layer) return;
      const { speedX, speedY, speedZ, rotation } = layer;

      const computedLeft = parseFloat(
        getComputedStyle(el).left.replace('px', '')
      );
      const isInLeft = computedLeft < window.innerWidth / 2 ? 1 : -1;
      const zValue = (cursorPosition - computedLeft) * isInLeft * 0.1;

      // Calculate multi-layer scrolling offset proportional to layer speed and depth distance
      const scrollOffset = scrollProg * (layer.speedY * 1100 + (layer.distance > 0 ? layer.distance * 0.15 : 0));

      el.style.transform = `perspective(2300px) translateZ(${
        zValue * speedZ
      }px) rotateY(${rotateDeg * rotation}deg) translateX(calc(-50% + ${
        -xVal * speedX
      }px)) translateY(calc(-50% + ${yVal * speedY + scrollOffset}px))`;
    });

    if (textRef.current) {
      const textSpeedX = 0.07;
      const textSpeedY = 0.05;
      const textSpeedZ = 0.08;
      const textRotation = 0.04;

      const computedLeft = parseFloat(
        getComputedStyle(textRef.current).left.replace('px', '')
      );
      const isInLeft = computedLeft < window.innerWidth / 2 ? 1 : -1;
      const zValue = (cursorPosition - computedLeft) * isInLeft * 0.1;

      const textScrollOffset = scrollProg * 260;

      textRef.current.style.transform = `perspective(2300px) translateZ(${
        zValue * textSpeedZ
      }px) rotateY(${rotateDeg * textRotation}deg) translateX(calc(-50% + ${
        -xVal * textSpeedX
      }px)) translateY(calc(-50% + ${yVal * textSpeedY + textScrollOffset}px))`;
      textRef.current.style.opacity = `${Math.max(0, 1 - scrollProg * 1.5)}`;
    }
  }, [layers]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let scrollProgress = 0;
    let lastCursor = {
      clientX: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
      xVal: 0,
      yVal: 0,
      rotateDeg: 0,
    };

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom top',
      scrub: 0,
      onUpdate: (self) => {
        scrollProgress = self.progress;
        updateLayers(
          lastCursor.clientX,
          lastCursor.xVal,
          lastCursor.yVal,
          lastCursor.rotateDeg,
          scrollProgress
        );
      },
    });

    const handleMouseMove = (e: MouseEvent) => {
      const newXValue = e.clientX - window.innerWidth / 2;
      const newYValue = e.clientY - window.innerHeight / 2;
      const newRotateDegree = (newXValue / (window.innerWidth / 2)) * 20;

      lastCursor = {
        clientX: e.clientX,
        xVal: newXValue,
        yVal: newYValue,
        rotateDeg: newRotateDegree,
      };

      setXValue(newXValue);
      setYValue(newYValue);
      setRotateDegree(newRotateDegree);

      updateLayers(e.clientX, newXValue, newYValue, newRotateDegree, scrollProgress);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!e.touches || e.touches.length === 0) return;
      const touch = e.touches[0];
      const newXValue = touch.clientX - window.innerWidth / 2;
      const newYValue = touch.clientY - window.innerHeight / 2;
      const newRotateDegree = (newXValue / (window.innerWidth / 2)) * 15;

      lastCursor = {
        clientX: touch.clientX,
        xVal: newXValue,
        yVal: newYValue,
        rotateDeg: newRotateDegree,
      };

      setXValue(newXValue);
      setYValue(newYValue);
      setRotateDegree(newRotateDegree);

      updateLayers(touch.clientX, newXValue, newYValue, newRotateDegree, scrollProgress);
    };

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma === null || e.beta === null) return;
      const clampedGamma = Math.max(-40, Math.min(40, e.gamma));
      const clampedBeta = Math.max(-40, Math.min(40, e.beta - 45));

      const newXValue = (clampedGamma / 40) * (window.innerWidth * 0.2);
      const newYValue = (clampedBeta / 40) * (window.innerHeight * 0.2);
      const newRotateDegree = (clampedGamma / 40) * 12;

      lastCursor = {
        clientX: window.innerWidth / 2 + newXValue,
        xVal: newXValue,
        yVal: newYValue,
        rotateDeg: newRotateDegree,
      };

      setXValue(newXValue);
      setYValue(newYValue);
      setRotateDegree(newRotateDegree);

      updateLayers(lastCursor.clientX, newXValue, newYValue, newRotateDegree, scrollProgress);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    if (typeof window !== 'undefined' && 'DeviceOrientationEvent' in window) {
      window.addEventListener('deviceorientation', handleOrientation, { passive: true });
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
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      if (typeof window !== 'undefined' && 'DeviceOrientationEvent' in window) {
        window.removeEventListener('deviceorientation', handleOrientation);
      }
      trigger.kill();
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, [layers, updateLayers]);

  const getResponsiveStyle = (layer: ParallaxLayer, index: number): React.CSSProperties => {
    if (index === 0) {
      return {
        top: '50%',
        left: '50%',
        width: isMobile ? '135vw' : '120vw',
        minWidth: isMobile ? '850px' : '1500px',
        height: '120vh',
        minHeight: '100dvh',
        zIndex: layer.zIndex,
        transform: 'translate(-50%, -50%)',
        objectFit: 'cover',
        objectPosition: 'center',
      };
    }

    if (isMobile) {
      const widthNum = parseFloat(layer.width);
      const mobileWidth = Math.round(widthNum * 0.55);

      let mobileLeft = layer.initialLeft;
      const leftMatch = layer.initialLeft.match(/calc\(50%\s*([+-])\s*(\d+)px\)/);
      if (leftMatch) {
        const sign = leftMatch[1];
        const val = parseFloat(leftMatch[2]);
        const scaledVal = Math.round(val * 0.4);
        mobileLeft = `calc(50% ${sign} ${scaledVal}px)`;
      }

      let mobileTop = layer.initialTop;
      const topMatch = layer.initialTop.match(/calc\((50%|100%)\s*([+-])\s*(\d+)px\)/);
      if (topMatch) {
        const base = topMatch[1];
        const sign = topMatch[2];
        const val = parseFloat(topMatch[3]);
        const scaledVal = Math.round(val * 0.7);
        mobileTop = `calc(${base} ${sign} ${scaledVal}px)`;
      }

      return {
        width: `${mobileWidth}px`,
        top: mobileTop,
        left: mobileLeft,
        zIndex: layer.zIndex,
        transform: 'translate(-50%, -50%)',
      };
    }

    return {
      width: layer.width,
      top: layer.initialTop,
      left: layer.initialLeft,
      zIndex: layer.zIndex,
      transform: 'translate(-50%, -50%)',
    };
  };

  return (
    <main
      ref={containerRef}
      className={cn(
        'relative h-[100dvh] min-h-[620px] w-full overflow-hidden bg-gradient-to-b from-[#060e18] via-[#0b1626] to-[#09090b]',
        className
      )}
    >
      {/* Top Atmosphere Gradient for Seamless Header Blending */}
      <div className="absolute top-0 left-0 right-0 h-32 sm:h-40 bg-gradient-to-b from-[#09090b]/90 via-[#09090b]/35 to-transparent z-[25] pointer-events-none" />

      {/* Vignette Depth Gradient */}
      <div className="absolute inset-0 z-[26] pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_35%,rgba(9,9,11,0.85)_100%)]" />

      {/* Subtle Star / Particle Field */}
      <div className="absolute inset-0 z-[0] bg-[radial-gradient(#38bdf8_0.75px,transparent_0.75px)] [background-size:32px_32px] opacity-15 pointer-events-none" />

      {/* Render Parallax Layers */}
      {layers.map((layer, index) => (
        <img
          key={index}
          ref={(el) => {
            if (el) layerRefs.current[index] = el;
          }}
          src={layer.src}
          alt={layer.alt}
          onError={(e) => {
            const target = e.currentTarget;
            if (layer.alt.includes('fog')) {
              target.src = UNSPLASH_FALLBACKS.fog;
              target.style.mixBlendMode = 'screen';
              target.style.opacity = '0.35';
            } else if (layer.alt.includes('mountain')) {
              target.src = UNSPLASH_FALLBACKS.mountain;
              target.style.mixBlendMode = 'lighten';
            } else {
              target.src = UNSPLASH_FALLBACKS.background;
            }
          }}
          className={cn(
            'absolute pointer-events-none transition-transform duration-[450ms] ease-out will-change-transform select-none max-w-none',
            index === 0 && 'object-cover object-center',
            layer.className
          )}
          style={getResponsiveStyle(layer, index)}
        />
      ))}

      {/* Central Interactive Headline */}
      <div
        ref={textRef}
        className="absolute z-[9] text-white text-center pointer-events-none transition-transform duration-[450ms] ease-out will-change-transform px-4 w-full max-w-4xl"
        style={{
          top: isMobile ? '50%' : 'calc(50% - 25px)',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <h1 className="font-black text-[2.6rem] xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.5rem] leading-[0.88] sm:leading-[0.95] tracking-tighter uppercase drop-shadow-[0_20px_45px_rgba(0,0,0,0.9)] select-none text-center">
          {(() => {
            if (!title.includes(' ')) return title;
            const words = title.trim().split(/\s+/);
            if (words.length === 3 && words[2].length <= 2) {
              return (
                <>
                  <span className="block sm:inline sm:mr-4 md:mr-5">{words[0]}</span>
                  <span className="block sm:inline whitespace-nowrap">
                    {words[1]} {words[2]}
                  </span>
                </>
              );
            }
            return words.map((word, wIdx) => (
              <span key={wIdx} className="block sm:inline sm:mr-4 md:mr-5 last:mr-0">
                {word}
              </span>
            ));
          })()}
        </h1>
      </div>

      {/* Atmospheric Bottom Horizon Blend */}
      <div className="absolute bottom-0 left-0 right-0 h-44 sm:h-52 bg-gradient-to-t from-[#09090b] via-[#09090b]/80 to-transparent z-[27] pointer-events-none" />

      {/* Interactive Explorer Scroll Cue */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-[35] flex flex-col items-center gap-2 pointer-events-auto">
        <a
          href="#about"
          className="flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full border border-zinc-700/60 bg-zinc-900/70 backdrop-blur-md text-xs font-mono text-zinc-400 hover:text-emerald-400 hover:border-emerald-500/50 transition-all duration-300 group shadow-lg"
        >
          <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 group-hover:rotate-45 transition-transform duration-500" />
          <span className="tracking-wider uppercase text-[10px] sm:text-[11px]">
            {isMobile || isTouchDevice ? 'Scroll to Explore' : 'Move Cursor / Scroll Down'}
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-zinc-500 group-hover:translate-y-0.5 transition-transform" />
        </a>
      </div>
    </main>
  );
};

export const ParallaxHeroDemo: React.FC = () => {
  return <ParallaxHero title="WILDERNESS" subtitle="3D SPATIAL INTERACTION" />;
};

export default ParallaxHero;

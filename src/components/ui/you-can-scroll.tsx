"use client";
import { useEffect, useRef } from "react";
import "@/index.css";

const WORDS = [
  { text: "design.", color: "#ff4d4d" },
  { text: "prototype.", color: "#ff7a29" },
  { text: "solve.", color: "#ffaa00" },
  { text: "build.", color: "#facc15" },
  { text: "develop.", color: "#00f0b5" },
];

export default function ScrollAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const items = itemsRef.current.filter((el): el is HTMLLIElement => el !== null);
    if (!items.length) return;

    let ticking = false;

    const updateActiveWords = () => {
      const centerY = window.innerHeight / 2;
      let closestIndex = 0;
      let minDistance = Infinity;

      // Find the word whose center is closest to 'I can' (window center)
      for (let i = 0; i < items.length; i++) {
        const rect = items[i].getBoundingClientRect();
        const itemCenter = rect.top + rect.height / 2;
        const dist = Math.abs(itemCenter - centerY);
        if (dist < minDistance) {
          minDistance = dist;
          closestIndex = i;
        }
      }

      // Apply bright illumination to closest word and smooth colors/dimming to neighbors
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const distFromActive = Math.abs(i - closestIndex);

        if (distFromActive === 0) {
          // ACTIVE WORD: 100% full bright neon glow & scale
          item.style.opacity = "1";
          item.style.transform = "scale(1.06)";
          item.style.filter = "brightness(1.5) drop-shadow(0 0 25px currentColor)";
          item.style.zIndex = "10";
        } else if (distFromActive === 1) {
          // Direct neighbors: visible stacked lines
          item.style.opacity = "0.32";
          item.style.transform = "scale(0.98)";
          item.style.filter = "brightness(0.75) drop-shadow(0 0 0px transparent)";
          item.style.zIndex = "1";
        } else {
          // Further lines: dimmed background stack
          item.style.opacity = "0.18";
          item.style.transform = "scale(0.95)";
          item.style.filter = "brightness(0.6) drop-shadow(0 0 0px transparent)";
          item.style.zIndex = "0";
        }
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateActiveWords);
        ticking = true;
      }
    };

    // Initial update
    updateActiveWords();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="you-can-scroll-section relative w-full bg-black text-white"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
      }}
    >
      <main className="relative w-full">
        <section className="relative flex justify-center items-start w-full px-4 sm:px-8 md:px-12">
          {/* Left sticky 'I can' (small-medium size) */}
          <div className="sticky top-1/2 -translate-y-1/2 flex items-center pr-2 sm:pr-3 md:pr-4 z-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white whitespace-nowrap drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] select-none">
              I can&nbsp;
            </h2>
          </div>

          {/* Right scrolling words: ONLY design., prototype., solve., build., develop. */}
          <ul className="list-none p-0 m-0 z-10 pt-[calc(50vh-2rem)] pb-[calc(50vh-2rem)]">
            {WORDS.map((item, i) => (
              <li
                key={item.text}
                ref={(el) => {
                  itemsRef.current[i] = el;
                }}
                style={{
                  color: item.color,
                  transition:
                    "opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1), transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), filter 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                  willChange: "transform, opacity, filter",
                }}
                className="h-[60px] sm:h-[75px] md:h-[90px] lg:h-[105px] flex items-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight whitespace-nowrap select-none"
              >
                {item.text}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

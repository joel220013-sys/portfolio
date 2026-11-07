"use client";
import { useEffect, useRef } from "react";
import "@/index.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Pane } from "tweakpane";

const WORDS = [
  "design.",
  "prototype.",
  "solve.",
  "build.",
  "develop.",
  "debug.",
  "learn.",
  "cook.",
  "ship.",
  "prompt.",
  "collaborate.",
  "create.",
  "inspire.",
  "follow.",
  "innovate.",
  "test.",
  "optimize.",
  "teach.",
  "visualize.",
  "transform.",
  "scale.",
  "do it.",
];

export default function ScrollAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const config = {
      theme: "dark",
      animate: true,
      snap: true,
      start: 0,
      end: 360,
      scroll: true,
      debug: false,
    };

    let ctrl: Pane | null = null;
    try {
      ctrl = new Pane({ title: "Config", expanded: false });
      ctrl.addBinding(config, "animate", { label: "Animate" });
      ctrl.addBinding(config, "snap", { label: "Snap" });
      ctrl.addBinding(config, "start", { label: "Hue Start", min: 0, max: 1000, step: 1 });
      ctrl.addBinding(config, "end", { label: "Hue End", min: 0, max: 1000, step: 1 });
      ctrl.addBinding(config, "scroll", { label: "Scrollbar" });
      ctrl.addBinding(config, "debug", { label: "Debug" });
      ctrl.addBinding(config, "theme", {
        label: "Theme",
        options: { System: "system", Light: "light", Dark: "dark" },
      });
    } catch {
      // Graceful fallback if Tweakpane DOM is blocked
    }

    const items = itemsRef.current.filter((el): el is HTMLLIElement => el !== null);
    if (!items.length) return;

    // Initial styling: base colors and dimming
    items.forEach((item, index) => {
      const baseHue = (config.start + index * (360 / items.length)) % 360;
      item.style.color = `hsl(${baseHue}, 100%, 65%)`;

      gsap.set(item, {
        opacity: index === 0 ? 1 : 0.2,
        scale: index === 0 ? 1.05 : 0.96,
        filter:
          index === 0
            ? "brightness(1.4) drop-shadow(0 0 30px currentColor)"
            : "brightness(0.6)",
        transformOrigin: "left center",
      });
    });

    const triggers: ScrollTrigger[] = [];

    // Global Hue scrub across the section
    if (containerRef.current) {
      const hueTrigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          const currentHue = gsap.utils.interpolate(config.start, config.end, self.progress);
          items.forEach((item, i) => {
            const h = (currentHue + i * (360 / items.length)) % 360;
            item.style.color = `hsl(${h}, 100%, 65%)`;
          });
        },
      });
      triggers.push(hueTrigger);
    }

    // Scroll lighting effect for each word (tight gap, activates as it aligns with 'I can')
    items.forEach((item, index) => {
      const trigger = ScrollTrigger.create({
        trigger: item,
        start: "center 56%",
        end: "center 44%",
        onEnter: () => {
          gsap.to(item, {
            opacity: 1,
            scale: 1.05,
            filter: "brightness(1.45) drop-shadow(0 0 35px currentColor)",
            duration: 0.2,
            ease: "power2.out",
          });
        },
        onLeave: () => {
          gsap.to(item, {
            opacity: 0.2,
            scale: 0.96,
            filter: "brightness(0.6) drop-shadow(0 0 0px transparent)",
            duration: 0.2,
            ease: "power2.out",
          });
        },
        onEnterBack: () => {
          gsap.to(item, {
            opacity: 1,
            scale: 1.05,
            filter: "brightness(1.45) drop-shadow(0 0 35px currentColor)",
            duration: 0.2,
            ease: "power2.out",
          });
        },
        onLeaveBack: () => {
          if (index !== 0) {
            gsap.to(item, {
              opacity: 0.2,
              scale: 0.96,
              filter: "brightness(0.6) drop-shadow(0 0 0px transparent)",
              duration: 0.2,
              ease: "power2.out",
            });
          }
        },
      });
      triggers.push(trigger);
    });

    // Refresh ScrollTrigger to ensure metrics align after DOM paint
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timer);
      ctrl?.dispose();
      triggers.forEach((t) => t.kill());
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
          {/* Left sticky 'I can' */}
          <div className="sticky top-1/2 -translate-y-1/2 flex items-center pr-2 sm:pr-4 md:pr-6 z-20">
            <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tight text-white whitespace-nowrap drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] select-none">
              I can&nbsp;
            </h2>
          </div>

          {/* Right scrolling words - tight gap matching reference photos */}
          <ul className="list-none p-0 m-0 z-10 pt-[calc(50vh-4rem)] pb-[calc(50vh-4rem)]">
            {WORDS.map((word, i) => (
              <li
                key={i}
                ref={(el) => {
                  itemsRef.current[i] = el;
                }}
                className="h-[110px] sm:h-[135px] md:h-[160px] lg:h-[180px] flex items-center text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tight whitespace-nowrap transition-transform duration-100 select-none"
              >
                {word}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

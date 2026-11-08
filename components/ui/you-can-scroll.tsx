"use client";
import { useEffect, useRef } from "react";
import "@/index.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const WORDS = [
  { text: "design.", color: "#ff4d4d" },
  { text: "prototype.", color: "#ff7a29" },
  { text: "solve.", color: "#ffaa00" },
  { text: "build.", color: "#facc15" },
  { text: "develop.", color: "#00f0b5" },
  { text: "attack.", color: "#ff2255" },
  { text: "defend.", color: "#00d8ff" },
];

export default function ScrollAnimation() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const itemsRef = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const list = listRef.current;
    const items = itemsRef.current.filter((el): el is HTMLLIElement => el !== null);
    if (!section || !list || items.length === 0) return;

    const ctx = gsap.context(() => {
      const getLineHeight = () => items[0]?.offsetHeight || 95;
      let lineHeight = getLineHeight();
      let totalTravel = (items.length - 1) * lineHeight;

      const updateIllumination = (progress: number) => {
        const floatIndex = progress * (items.length - 1);

        items.forEach((item, index) => {
          const dist = Math.abs(index - floatIndex);
          // Smooth bell curve for active word
          const factor = Math.max(0, 1 - dist / 1.15);
          const smoothFactor = factor * factor * (3 - 2 * factor);

          const opacity = 0.2 + smoothFactor * 0.8;
          const scale = 0.95 + smoothFactor * 0.12;
          const glow = smoothFactor * 30;
          const brightness = 0.65 + smoothFactor * 0.85;

          item.style.opacity = `${opacity}`;
          item.style.transform = `scale(${scale})`;
          item.style.filter = `brightness(${brightness}) drop-shadow(0 0 ${glow}px currentColor)`;
          item.style.zIndex = smoothFactor > 0.4 ? "10" : "1";
        });
      };

      // Set initial illumination for progress 0
      updateIllumination(0);

      const st = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=2400", // Luxurious 2400px scroll runway for smooth paced scrolling
        pin: true,
        scrub: 1.1, // Smooth cinematic momentum dampening
        anticipatePin: 1,
        onUpdate: (self) => {
          lineHeight = getLineHeight();
          totalTravel = (items.length - 1) * lineHeight;
          gsap.set(list, { y: -self.progress * totalTravel });
          updateIllumination(self.progress);
        },
      });

      const handleResize = () => {
        lineHeight = getLineHeight();
        totalTravel = (items.length - 1) * lineHeight;
        ScrollTrigger.refresh();
      };

      window.addEventListener("resize", handleResize);

      return () => {
        st.kill();
        window.removeEventListener("resize", handleResize);
      };
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="you-can-scroll-section relative w-full h-screen bg-black text-white flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
      }}
    >
      <div className="relative flex justify-center items-center w-full px-4 sm:px-8 md:px-12">
        {/* Left 'I can' */}
        <div className="flex items-center pr-2 sm:pr-4 md:pr-6 z-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white whitespace-nowrap drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] select-none">
            I can&nbsp;
          </h2>
        </div>

        {/* Right scrolling words list with smooth vertical motion */}
        <div className="relative overflow-visible h-[65px] sm:h-[80px] md:h-[95px] lg:h-[110px] flex items-center">
          <ul ref={listRef} className="list-none p-0 m-0 z-10 will-change-transform">
            {WORDS.map((item, i) => (
              <li
                key={item.text}
                ref={(el) => {
                  itemsRef.current[i] = el;
                }}
                style={{
                  color: item.color,
                  transformOrigin: "left center",
                }}
                className="h-[65px] sm:h-[80px] md:h-[95px] lg:h-[110px] flex items-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight whitespace-nowrap select-none"
              >
                {item.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

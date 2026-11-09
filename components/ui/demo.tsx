"use client";

import { WebGLShader } from "@/components/ui/web-gl-shader";
import { LiquidButton } from "@/components/ui/liquid-glass-button";

export function DemoOne() {
  const handleAction = () => {
    const contactSection = document.getElementById("profile-links");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "mailto:joel220013@gmail.com";
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-4 py-20 sm:py-28">
      <WebGLShader className="absolute inset-0 w-full h-full block pointer-events-none" />
      <div className="relative z-10 border border-[#27272a] p-2 w-full mx-auto max-w-3xl backdrop-blur-[2px] bg-black/40 rounded-xl shadow-2xl">
        <main className="relative border border-[#27272a] py-10 px-4 sm:px-8 overflow-hidden rounded-lg">
          <h1 className="mb-3 text-white text-center text-5xl sm:text-7xl font-extrabold tracking-tighter md:text-[clamp(2rem,8vw,7rem)]">
            Design is Everything
          </h1>
          <p className="text-white/60 px-4 sm:px-6 text-center text-xs md:text-sm lg:text-lg max-w-xl mx-auto">
            Unleashing creativity through bold visuals, seamless interfaces, and limitless possibilities.
          </p>
          <div className="my-8 flex items-center justify-center gap-2">
            <span className="relative flex h-3 w-3 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
            </span>
            <p className="text-xs sm:text-sm font-medium text-green-500">Available for New Projects</p>
          </div>

          <div className="flex justify-center">
            <LiquidButton
              onClick={handleAction}
              className="text-white border border-white/20 rounded-full px-8 py-3 text-sm sm:text-base font-semibold hover:border-cyan-400 transition-colors"
              size="xl"
            >
              Let's Go
            </LiquidButton>
          </div>
        </main>
      </div>
    </div>
  );
}

export default DemoOne;

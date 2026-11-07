"use client";

import { RandomLetterSwap } from "@/components/ui/random-letter-swap";
import { cn } from "@/lib/utils";

const links = ["Home", "Work", "About", "Blog", "Contact"];

export default function RandomLetterSwapNav({ className }: { className?: string }) {
  const handleNavClick = (link: string) => {
    if (link === "Home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (link === "Contact") {
      const el = document.getElementById("profile-links");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = "mailto:joel220013@gmail.com";
      }
    } else {
      document.getElementById("scroll-section")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={cn("flex items-center justify-center px-2 sm:px-6 py-2 z-20", className)}>
      <nav className="flex items-center gap-3 sm:gap-6 md:gap-8 backdrop-blur-md bg-zinc-950/40 px-4 sm:px-6 py-2 rounded-full border border-zinc-800/50 shadow-[0_0_25px_rgba(34,211,238,0.1)]">
        {links.map((link) => (
          <button
            key={link}
            type="button"
            onClick={() => handleNavClick(link)}
            className="cursor-pointer bg-transparent border-0 p-0 text-left focus:outline-none"
          >
            <RandomLetterSwap
              className="font-medium text-zinc-400 text-xs sm:text-sm hover:text-white transition-colors"
              label={link}
              staggerDuration={0.025}
              transition={{ duration: 0.6, type: "spring" }}
            />
          </button>
        ))}
      </nav>
    </div>
  );
}

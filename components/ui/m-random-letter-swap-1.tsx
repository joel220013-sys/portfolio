"use client";

import { RandomLetterSwap } from "@/components/ui/random-letter-swap";
import { cn } from "@/lib/utils";

const links = ["Home", "Work", "About", "Blog", "Contact"];

export default function RandomLetterSwapNav({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center px-6 py-2 z-20", className)}>
      <nav className="flex items-center gap-6 sm:gap-8 backdrop-blur-md bg-zinc-950/40 px-6 py-2 rounded-full border border-zinc-800/50 shadow-[0_0_25px_rgba(34,211,238,0.1)]">
        {links.map((link) => (
          <RandomLetterSwap
            className="cursor-pointer font-medium text-zinc-400 text-sm hover:text-white transition-colors"
            key={link}
            label={link}
            staggerDuration={0.025}
            transition={{ duration: 0.6, type: "spring" }}
          />
        ))}
      </nav>
    </div>
  );
}


"use client";

import { cn } from "@/lib/utils";
import defaultProfileImg from "@/assets/joel-joyson.png";
import TechMarquee from "@/components/ui/tech-marquee";
import {
  GithubIcon,
  LinkedinIcon,
  TryHackMeIcon,
  GmailIcon,
} from "@/components/ui/logo-clouds-utils/brand-icons";

export type LogoCloudSwapProps = {
  imageSrc?: string;
  className?: string;
};

export default function LogoCloudSwap({
  imageSrc = defaultProfileImg,
  className,
}: LogoCloudSwapProps) {
  return (
    <section className={cn("w-full bg-transparent px-2 sm:px-4 py-2 sm:py-4", className)}>
      <div className="mx-auto max-w-2xl text-center">
        {imageSrc && (
          <div className="flex justify-center">
            <img
              src={imageSrc}
              alt="Joel Joyson"
              className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] object-contain drop-shadow-[0_0_25px_rgba(34,211,238,0.25)]"
            />
          </div>
        )}

        {/* Quick Social & Contact Links */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3.5">
          <a
            href="https://github.com/joel220013-sys"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 rounded-full border border-zinc-800/80 bg-zinc-950/70 px-3.5 py-1.5 text-xs sm:text-sm font-medium text-zinc-300 backdrop-blur-md transition-all hover:border-zinc-500 hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.15)]"
          >
            <GithubIcon className="h-4 w-4" />
            <span>GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/joel-joyson-n-a4242a362/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 rounded-full border border-zinc-800/80 bg-zinc-950/70 px-3.5 py-1.5 text-xs sm:text-sm font-medium text-zinc-300 backdrop-blur-md transition-all hover:border-blue-500/80 hover:text-white hover:shadow-[0_0_15px_rgba(10,102,194,0.3)]"
          >
            <LinkedinIcon className="h-4 w-4 text-[#0A66C2]" />
            <span>LinkedIn</span>
          </a>
          <a
            href="https://tryhackme.com/p/joel220013"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 rounded-full border border-zinc-800/80 bg-zinc-950/70 px-3.5 py-1.5 text-xs sm:text-sm font-medium text-zinc-300 backdrop-blur-md transition-all hover:border-red-500/80 hover:text-white hover:shadow-[0_0_15px_rgba(234,42,42,0.3)]"
          >
            <TryHackMeIcon className="h-4 w-4 text-[#EA2A2A]" />
            <span>TryHackMe</span>
          </a>
          <a
            href="mailto:joel220013@gmail.com?subject=Contact%20Joel%20Joyson%20-%20Cybersecurity%20Communication"
            className="group flex items-center gap-2 rounded-full border border-zinc-800/80 bg-zinc-950/70 px-3.5 py-1.5 text-xs sm:text-sm font-medium text-zinc-300 backdrop-blur-md transition-all hover:border-cyan-500/80 hover:text-white hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]"
          >
            <GmailIcon className="h-4 w-4" />
            <span>Gmail</span>
          </a>
        </div>
      </div>

      {/* Infinite Cybersecurity & Tech Stack Marquee from Video */}
      <div className="mx-auto mt-6 w-full max-w-6xl">
        <TechMarquee />
      </div>
    </section>
  );
}

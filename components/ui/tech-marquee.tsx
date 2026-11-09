/* eslint-disable react-refresh/only-export-components */
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export const WiresharkIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2.5 16C6 14.5 9 12 11.5 8c1.5-2.5 3.2-4.5 5.5-4.5 3.5 0 5 4 5 7.5 0 3-2 5-5.5 6-4 1.2-8.5.5-14-1z" fill="rgba(14,165,233,0.2)" />
    <path d="M11.5 8c2.5 4 6 5 10 5" />
  </svg>
);

export const BurpSuiteIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <rect width="24" height="24" rx="4" fill="#FF6633" />
    <path d="M13.5 4.5L7 13.5h5l-1.5 6 6.5-9h-5l1.5-6z" fill="#FFFFFF" />
  </svg>
);

export const PythonIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fill="#3776AB" d="M11.9 2c-3.1 0-2.9 1.3-2.9 1.3l.01 1.4h3v.4H6.2S4 4.8 4 8c0 3.1 1.8 3 1.8 3h1.1v-1.5c0-1.7 1.4-1.7 1.4-1.7h4.8c1.3 0 1.3-.8 1.3-.8V3.4s.2-1.4-2.5-1.4zm-1.6 1a.7.7 0 1 1 0 1.4.7.7 0 0 1 0-1.4z" />
    <path fill="#FFD438" d="M12.1 22c3.1 0 2.9-1.3 2.9-1.3l-.01-1.4h-3v-.4h5.8s2.2.3 2.2-2.9c0-3.1-1.8-3-1.8-3h-1.1v1.5c0 1.7-1.4 1.7-1.4 1.7H12c-1.3 0-1.3.8-1.3.8v3.5s-.2 1.4 2.5 1.4zm1.6-1a.7.7 0 1 1 0-1.4.7.7 0 0 1 0 1.4z" />
  </svg>
);

export const FlaskIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M10 2v5.5L4.4 18.2A2 2 0 0 0 6.1 21h11.8a2 2 0 0 0 1.7-2.8L14 7.5V2" />
    <path d="M8.5 2h7" />
    <path d="M7 16h10" />
    <circle cx="10" cy="18" r="0.8" fill="currentColor" />
    <circle cx="14" cy="17" r="0.6" fill="currentColor" />
  </svg>
);

export const MongoIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fill="#47A248" d="M12 1.5s-.3.4-.6.9C9.8 5.6 7 10.4 7 14.5c0 3.7 2.3 6.9 5 8 2.7-1.1 5-4.3 5-8 0-4.1-2.8-8.9-4.4-12.1-.3-.5-.6-.9-.6-.9zm0 18.5c-1.5-.7-3-2.6-3-5.5 0-2.8 1.8-6.4 3-8.8 1.2 2.4 3 6 3 8.8 0 2.9-1.5 4.8-3 5.5z" />
  </svg>
);

export const ExpressIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <div className={cn("flex items-center justify-center font-mono font-bold text-sm tracking-tight text-white border border-zinc-700 rounded px-1.5 py-0.5 leading-none", className)}>
    ex
  </div>
);

export const ReactIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="-11.5 -10.23174 23 20.46348" fill="none" stroke="#61DAFB" strokeWidth="1.2" className={className}>
    <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
    <ellipse rx="11" ry="4.2" />
    <ellipse rx="11" ry="4.2" transform="rotate(60)" />
    <ellipse rx="11" ry="4.2" transform="rotate(120)" />
  </svg>
);

export const NodeIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#5FA04E" strokeWidth="1.8" className={className}>
    <path d="M12 2l8 4.6v9.2L12 20.4l-8-4.6V6.6L12 2z" />
    <text x="6.8" y="15" fill="#5FA04E" fontSize="9" fontWeight="bold" stroke="none" fontFamily="sans-serif">JS</text>
  </svg>
);

export const SQLAlchemyIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <div className={cn("flex items-center font-black text-xs tracking-tighter text-[#D71F00]", className)}>
    SQLA
  </div>
);

export const KaliLinuxIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm3.5 12.5a4 4 0 0 1-5.5 0 4 4 0 0 1 0-5.5l1.5 1.5a2 2 0 0 0 0 2.5 2 2 0 0 0 2.5 0z" fill="rgba(56,189,248,0.15)" />
    <circle cx="16" cy="8" r="1.5" fill="#38bdf8" />
  </svg>
);

export const NmapIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#2596be" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1.5" fill="#2596be" />
    <line x1="12" y1="1" x2="12" y2="5" />
    <line x1="12" y1="19" x2="12" y2="23" />
    <line x1="1" y1="12" x2="5" y2="12" />
    <line x1="19" y1="12" x2="23" y2="12" />
  </svg>
);

export interface TechItem {
  name: string;
  Icon: React.ComponentType<{ className?: string }>;
}

export const TECH_ITEMS: TechItem[] = [
  { name: "Wireshark", Icon: WiresharkIcon },
  { name: "Burp Suite", Icon: BurpSuiteIcon },
  { name: "Python", Icon: PythonIcon },
  { name: "Flask", Icon: FlaskIcon },
  { name: "MongoDB", Icon: MongoIcon },
  { name: "Express", Icon: ExpressIcon },
  { name: "React", Icon: ReactIcon },
  { name: "Node.js", Icon: NodeIcon },
  { name: "SQLAlchemy", Icon: SQLAlchemyIcon },
  { name: "Kali Linux", Icon: KaliLinuxIcon },
  { name: "Nmap", Icon: NmapIcon },
];

export function TechMarquee({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden py-3 sm:py-4 select-none pointer-events-auto",
        className
      )}
      style={{
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
        maskImage:
          "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
      }}
    >
      <div className="flex w-max animate-marquee gap-8 sm:gap-12 hover:[animation-play-state:paused]">
        {/* Set 1 */}
        {TECH_ITEMS.map((item, index) => (
          <div
            key={`marquee-1-${index}-${item.name}`}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg border border-transparent hover:border-zinc-800/80 hover:bg-zinc-900/40 transition-colors cursor-default group"
          >
            <span className="flex items-center justify-center shrink-0">
              <item.Icon className="h-5 w-5 sm:h-6 sm:w-6 transition-transform group-hover:scale-110" />
            </span>
            <span className="whitespace-nowrap text-sm sm:text-base font-medium text-zinc-300 group-hover:text-white transition-colors">
              {item.name}
            </span>
          </div>
        ))}

        {/* Set 2 (for seamless loop) */}
        {TECH_ITEMS.map((item, index) => (
          <div
            key={`marquee-2-${index}-${item.name}`}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg border border-transparent hover:border-zinc-800/80 hover:bg-zinc-900/40 transition-colors cursor-default group"
          >
            <span className="flex items-center justify-center shrink-0">
              <item.Icon className="h-5 w-5 sm:h-6 sm:w-6 transition-transform group-hover:scale-110" />
            </span>
            <span className="whitespace-nowrap text-sm sm:text-base font-medium text-zinc-300 group-hover:text-white transition-colors">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TechMarquee;

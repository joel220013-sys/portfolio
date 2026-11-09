"use client";

import { motion } from "framer-motion";

export interface TechItem {
  name: string;
  icon: React.ReactNode;
}

const CYBER_TECH_ITEMS: TechItem[] = [
  {
    name: "Wireshark",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-4.5 h-4.5 text-[#167fc4] shrink-0"
        aria-hidden="true"
      >
        <path d="M12.5 3C11 8 8 13.5 3 17c5 0 10-1.5 13-4.5 1.5 3 4 5 5 5.5-1-3-1.5-7-1.5-10 0-2.5-.5-4-1-5-1.5 1-3.5 1.5-6 0z" />
      </svg>
    ),
  },
  {
    name: "Burp Suite",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-4.5 h-4.5 text-[#ff6633] shrink-0"
        aria-hidden="true"
      >
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="4"
          fill="#ff6633"
          fillOpacity="0.2"
          stroke="#ff6633"
          strokeWidth="1.5"
        />
        <path
          d="M13 7l-4 6h4l-2 5 6-7h-4l2-4z"
          fill="#ff6633"
          stroke="#ff6633"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    name: "Python",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-4.5 h-4.5 shrink-0"
        aria-hidden="true"
      >
        <path
          d="M11.9 2c-3.1 0-5 .7-5 2.5v1.9h5v.6H4.3C2.4 7 1 8.8 1 11.2c0 2.4 1.4 3.8 3.3 3.8h1.6v-2.3c0-1.7 1.4-3.1 3.1-3.1h4.9c1.4 0 2.5-1.1 2.5-2.5V4.5c0-1.8-1.9-2.5-4.5-2.5zm-2.7 1.5c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9z"
          fill="#387eb8"
        />
        <path
          d="M12.1 22c3.1 0 5-.7 5-2.5v-1.9h-5v-.6h7.6c1.9 0 3.3-1.8 3.3-4.2 0-2.4-1.4-3.8-3.3-3.8h-1.6v2.3c0 1.7-1.4 3.1-3.1 3.1H10.1c-1.4 0-2.5 1.1-2.5 2.5v2.6c0 1.8 1.9 2.5 4.5 2.5zm2.7-1.5c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9z"
          fill="#ffe052"
        />
      </svg>
    ),
  },
  {
    name: "Flask",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-4.5 h-4.5 text-zinc-300 shrink-0"
        aria-hidden="true"
      >
        <path d="M9 3h6" />
        <path d="M10 3v5l-4.5 9a2 2 0 0 0 1.8 3h9.4a2 2 0 0 0 1.8-3L14 8V3" />
        <path d="M8.5 14h7" />
      </svg>
    ),
  },
  {
    name: "MongoDB",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-4.5 h-4.5 text-[#13aa52] shrink-0"
        aria-hidden="true"
      >
        <path d="M12 2C11.5 5.5 8 9.5 8 13.5c0 3.5 2 6.5 4 8.5 2-2 4-5 4-8.5 0-4-3.5-8-4-11.5z" />
        <path
          d="M12 2v20c-.2 0-.4-.1-.5-.2C9.5 20 8 17 8 13.5c0-4 3.5-8 4-11.5z"
          fillOpacity="0.25"
          fill="#000"
        />
      </svg>
    ),
  },
  {
    name: "Express",
    icon: (
      <span className="text-xs font-black tracking-tighter text-zinc-300 font-mono px-0.5">
        ex
      </span>
    ),
  },
  {
    name: "React",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="#61dafb"
        strokeWidth="1.5"
        className="w-4.5 h-4.5 text-[#61dafb] shrink-0"
        aria-hidden="true"
      >
        <ellipse cx="12" cy="12" rx="4" ry="10" transform="rotate(0 12 12)" />
        <ellipse cx="12" cy="12" rx="4" ry="10" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="4" ry="10" transform="rotate(120 12 12)" />
        <circle cx="12" cy="12" r="1.8" fill="#61dafb" />
      </svg>
    ),
  },
  {
    name: "Node.js",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-4.5 h-4.5 text-[#68a063] shrink-0"
        aria-hidden="true"
      >
        <path d="M12 2l8.7 5v10L12 22l-8.7-5V7L12 2zm0 2.3L5.3 8.2v7.6L12 19.7l6.7-3.9V8.2L12 4.3z" />
        <path d="M11 9v6h2V9h-2zm-3 1.5h2v3H8v-3zm6 0h2v3h-2v-3z" />
      </svg>
    ),
  },
  {
    name: "SQLAlchemy",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="w-4.5 h-4.5 text-[#d71f00] shrink-0"
        aria-hidden="true"
      >
        <ellipse cx="12" cy="5" rx="8" ry="3" />
        <path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
        <path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
      </svg>
    ),
  },
  {
    name: "Kali Linux",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-4.5 h-4.5 text-[#557cbf] shrink-0"
        aria-hidden="true"
      >
        <path d="M3.2 14.5c.3-1.6 1.4-3.5 2.8-4.5 1.5-1 3.2-1.3 4.8-.8.6.2 1.2.6 1.7 1 .3.3.5.3.8 0 .5-.5 1.2-.9 2-.9.8 0 1.6.4 2.2 1 .3.3.6.3.9 0 1.2-1.2 2.8-1.8 4.5-1.5.2 0 .4.2.3.4-.4 1.5-1.3 2.8-2.6 3.6-.8.5-1.7.8-2.6.8-.4 0-.6.3-.5.7.3 1.2.1 2.5-.5 3.6-.6 1-1.6 1.7-2.7 1.9-.3 0-.5-.2-.5-.5 0-.8.3-1.6.8-2.2.3-.4.2-.8-.2-1-.7-.4-1.5-.6-2.3-.5-.4 0-.7.3-.8.7-.3 1.1-.9 2.1-1.8 2.8-.8.6-1.8.8-2.8.6-.3-.1-.4-.3-.3-.6.3-.9.9-1.7 1.7-2.2.3-.2.3-.6.1-.9-.8-.8-1.4-1.8-1.6-2.9-.1-.4-.4-.6-.8-.6-.6.1-1.3.1-1.9 0-.3 0-.5-.3-.4-.5z" />
      </svg>
    ),
  },
  {
    name: "Nmap",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="#38bdf8"
        strokeWidth="1.8"
        className="w-4.5 h-4.5 text-sky-400 shrink-0"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1.5" fill="#38bdf8" />
        <line x1="12" y1="2" x2="12" y2="6" />
        <line x1="12" y1="18" x2="12" y2="22" />
        <line x1="2" y1="12" x2="6" y2="12" />
        <line x1="18" y1="12" x2="22" y2="12" />
      </svg>
    ),
  },
];

// Repeat 4x so even large screens loop with zero gaps
const REPEATED_ITEMS = [
  ...CYBER_TECH_ITEMS,
  ...CYBER_TECH_ITEMS,
  ...CYBER_TECH_ITEMS,
  ...CYBER_TECH_ITEMS,
];

export function CyberTechMarquee() {
  return (
    <div
      className="absolute left-7 sm:left-12 md:left-36 lg:left-60 xl:left-80 right-7 sm:right-12 md:right-36 lg:right-60 xl:right-80 top-32 sm:top-40 md:top-48 -translate-y-1/2 z-0 pointer-events-none overflow-hidden select-none"
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%)",
      }}
    >
      <motion.div
        className="flex w-max items-center gap-6 sm:gap-8 py-2"
        animate={{ x: ["0%", "-25%"] }}
        transition={{
          ease: "linear",
          duration: 25,
          repeat: Infinity,
        }}
      >
        {REPEATED_ITEMS.map((item, index) => (
          <div
            key={`${item.name}-${index}`}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-950/70 border border-zinc-800/60 backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.8)] whitespace-nowrap"
          >
            {item.icon}
            <span className="text-xs sm:text-sm font-medium tracking-wide text-zinc-300">
              {item.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default CyberTechMarquee;

"use client";

import { useState } from "react";
import { motion, type Transition } from "framer-motion";

export interface RandomLetterSwapProps {
  label: string;
  reverse?: boolean;
  transition?: Transition;
  staggerDuration?: number;
  className?: string;
  onClick?: () => void;
}

export function RandomLetterSwap({
  label,
  reverse = true,
  transition = { duration: 0.6, type: "spring" },
  staggerDuration = 0.025,
  className = "",
  onClick,
}: RandomLetterSwapProps) {
  const [isHovered, setIsHovered] = useState(false);

  const letters = label.split("");

  return (
    <span
      className={`inline-flex cursor-pointer overflow-hidden whitespace-nowrap select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {letters.map((letter, index) => {
        // Stagger calculation with deterministic slight variation
        const randomOffset = ((index * 7 + 3) % 5) / 5;
        const delay = index * staggerDuration + randomOffset * staggerDuration * 0.4;

        return (
          <span
            key={index}
            className="relative inline-flex overflow-hidden flex-col leading-none"
            style={{ height: "1.25em" }}
          >
            <motion.span
              className="inline-block"
              initial={{ y: 0 }}
              animate={{ y: isHovered ? (reverse ? "-1.25em" : "1.25em") : 0 }}
              transition={{
                ...transition,
                delay,
              }}
            >
              {/* Primary Character */}
              <span className="block leading-none">{letter === " " ? "\u00A0" : letter}</span>
              {/* Swapped Duplicate Character */}
              <span className="block absolute top-full left-0 leading-none">
                {letter === " " ? "\u00A0" : letter}
              </span>
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}

export default RandomLetterSwap;

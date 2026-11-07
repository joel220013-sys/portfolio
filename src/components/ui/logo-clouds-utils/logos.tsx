import * as React from "react";
import {
  Zap,
  Boxes,
  Layers,
  ShieldCheck,
  Sparkles,
  Cloud,
  Flame,
  Code2,
  Cpu,
} from "lucide-react";
import { SupabaseIcon, GithubIcon, LinkedinIcon } from "./brand-icons";

export type LogoDefinition = {
  name: string;
  color?: string;
  href?: string;
  Icon: React.ComponentType<{
    className?: string;
    style?: React.CSSProperties;
    "aria-hidden"?: boolean | "true" | "false";
  }>;
};

export const LOGOS: LogoDefinition[] = [
  {
    name: "GitHub",
    color: "currentColor",
    href: "https://github.com/joel220013-sys",
    Icon: GithubIcon,
  },
  {
    name: "Vercel",
    color: "currentColor",
    Icon: Zap,
  },
  {
    name: "Supabase",
    color: "#3ECF8E",
    Icon: SupabaseIcon,
  },
  {
    name: "LinkedIn",
    color: "#0A66C2",
    href: "https://www.linkedin.com/in/joel-joyson-n-a4242a362/",
    Icon: LinkedinIcon,
  },
  {
    name: "Prism Labs",
    color: "#EC4899",
    Icon: Code2,
  },
  {
    name: "Tailwind",
    color: "#06B6D4",
    Icon: Boxes,
  },
  {
    name: "Next.js",
    color: "currentColor",
    Icon: Layers,
  },
  {
    name: "Cloudflare",
    color: "#F38020",
    Icon: Cloud,
  },
  {
    name: "Auth0",
    color: "#EB5424",
    Icon: ShieldCheck,
  },
  {
    name: "OpenAI",
    color: "#10A37F",
    Icon: Sparkles,
  },
  {
    name: "FastEdge",
    color: "#EF4444",
    Icon: Flame,
  },
  {
    name: "PulseScale",
    color: "#3B82F6",
    Icon: Cpu,
  },
];

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ParallaxHero from '@/components/ui/wilderness';
import LoadingFillText from '@/components/ui/motion-loading-fill-text';
import { CinematicFooter } from '@/components/ui/motion-footer';
import { 
  Mail, 
  ExternalLink, 
  Sparkles, 
  Layers, 
  Cpu, 
  Terminal, 
  ArrowUpRight,
  Code2,
  Orbit,
  Workflow,
  RotateCcw
} from 'lucide-react';

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const PROJECTS = [
  {
    title: "Apex AI Design Engine",
    description: "Real-time generative spatial UI studio leveraging WebGL shaders and LLM state machines for design system automation.",
    tags: ["React 19", "WebGL", "GSAP", "Tailwind CSS", "TypeScript"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    demo: "https://github.com",
    github: "https://github.com"
  },
  {
    title: "NeuroSphere Telemetry",
    description: "Enterprise multi-cloud streaming visualizer processing over 20M events per second with sub-millisecond WebSockets.",
    tags: ["TypeScript", "Rust", "Apache Arrow", "Tailwind"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    demo: "https://github.com",
    github: "https://github.com"
  },
  {
    title: "Vortex Spatial Synthesizer",
    description: "Browser-based acoustic simulator utilizing WebAudio convolver nodes and 3D HRTF sound positioning.",
    tags: ["Three.js", "WebAudio", "TypeScript", "GSAP"],
    image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80",
    demo: "https://github.com",
    github: "https://github.com"
  }
];

const SKILLS = [
  { 
    name: "Frontend Architecture", 
    icon: Code2,
    items: ["React 19 / Next.js", "TypeScript (Strict)", "GSAP ScrollTrigger", "Lenis Smooth Scroll"] 
  },
  { 
    name: "Graphics & Motion", 
    icon: Orbit,
    items: ["WebGL / WebGPU", "Three.js & Canvas", "GLSL Shaders", "Fluid Dynamics"] 
  },
  { 
    name: "Backend & Systems", 
    icon: Workflow,
    items: ["Node.js & Bun", "PostgreSQL / Prisma", "Google Cloud / Docker", "REST & WebSockets"] 
  },
  { 
    name: "UI & Design Systems", 
    icon: Layers,
    items: ["Tailwind CSS", "shadcn/ui Primitives", "Radix Accessibility", "Figma to Code"] 
  }
];

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {/* Full-screen Loading Animation Gateway */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0, 
              y: -30, 
              filter: "blur(12px)",
              transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } 
            }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#09090b] text-white px-6 select-none overflow-hidden"
          >
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

            {/* Status indicator pill */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-xs font-mono mb-8 tracking-wider shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>SYSTEM INITIALIZING // JOEL.DEV</span>
            </motion.div>

            {/* Center Fill Text Loader Component */}
            <div className="relative z-10 w-full max-w-3xl flex justify-center py-4">
              <LoadingFillText onComplete={() => setIsLoading(false)} />
            </div>

            {/* Status detail footer */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-8 flex flex-col items-center gap-2 text-center"
            >
              <p className="text-xs font-mono text-zinc-400 uppercase tracking-[0.25em]">
                Loading Assets &amp; Interactive Graphics
              </p>
              <div className="flex items-center gap-3 text-[11px] font-mono text-zinc-600">
                <span>[WebGL SHADERS]</span>
                <span>•</span>
                <span>[REACT 19 CORE]</span>
                <span>•</span>
                <span>[LENIS SMOOTH SCROLL]</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-[#09090b] text-zinc-100 selection:bg-emerald-500 selection:text-black">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 backdrop-blur-md bg-zinc-950/70 border-b border-zinc-800/50">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
            <span className="font-mono text-xs sm:text-sm tracking-wider font-bold">JOEL.DEV</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-xs font-mono text-zinc-400">
            <a href="#about" className="hover:text-emerald-400 transition-colors">/about</a>
            <a href="#projects" className="hover:text-emerald-400 transition-colors">/work</a>
            <a href="#skills" className="hover:text-emerald-400 transition-colors">/skills</a>
            <a href="#contact" className="hover:text-emerald-400 transition-colors">/contact</a>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setIsLoading(true)}
              title="Replay loading animation"
              className="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-zinc-900/80 border border-zinc-800 text-xs font-mono text-zinc-400 hover:text-emerald-400 hover:border-zinc-700 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Replay Intro</span>
            </button>
            <a 
              href="#contact" 
              className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-400 hover:bg-emerald-500/20 transition-colors flex items-center gap-1.5"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </nav>

      {/* 3D Wilderness Parallax Hero Section */}
      <ParallaxHero 
        title="JOEL JOYSON N"
      />

      {/* About Section */}
      <section id="about" className="max-w-5xl mx-auto px-6 py-24">
        <div className="flex items-center gap-3 mb-6">
          <Sparkles className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-emerald-400">Introduction</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-8">
          Crafting ultra-smooth interfaces at the intersection of <span className="text-emerald-400">performance engineering</span> and <span className="text-emerald-400">interactive art</span>.
        </h2>
        <p className="text-zinc-400 text-lg leading-relaxed max-w-3xl mb-12">
          Specializing in physics-driven motion, GPU-accelerated web experiences, and robust frontend architectures. I help ambitious engineering teams turn complex systems into intuitive, breathtaking digital products.
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-y border-zinc-800 py-8">
          <div>
            <div className="text-4xl font-mono font-extrabold text-white">7+</div>
            <div className="text-xs font-mono text-zinc-500 uppercase mt-2">Years Experience</div>
          </div>
          <div>
            <div className="text-4xl font-mono font-extrabold text-emerald-400">45+</div>
            <div className="text-xs font-mono text-zinc-500 uppercase mt-2">Projects Shipped</div>
          </div>
          <div>
            <div className="text-4xl font-mono font-extrabold text-white">14</div>
            <div className="text-xs font-mono text-zinc-500 uppercase mt-2">Design Awards</div>
          </div>
          <div>
            <div className="text-4xl font-mono font-extrabold text-emerald-400">100</div>
            <div className="text-xs font-mono text-zinc-500 uppercase mt-2">Lighthouse Score</div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="max-w-6xl mx-auto px-6 py-24">
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Layers className="w-5 h-5 text-emerald-400" />
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-emerald-400">Case Studies</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">Featured Projects</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PROJECTS.map((project, idx) => (
            <div 
              key={idx}
              className="group rounded-2xl overflow-hidden bg-zinc-900/60 border border-zinc-800 hover:border-emerald-500/50 transition-all duration-300 flex flex-col"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-400 transition-colors flex items-center justify-between">
                    {project.title}
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                    {project.description}
                  </p>
                </div>
                <div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIdx) => (
                      <span 
                        key={tagIdx}
                        className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-zinc-800/80 text-zinc-300 border border-zinc-700/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 pt-4 border-t border-zinc-800 text-xs font-mono text-zinc-400">
                    <a href={project.demo} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-emerald-400 transition-colors">
                      <ExternalLink className="w-3.5 h-3.5" /> Live Preview
                    </a>
                    <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-white transition-colors">
                      <GithubIcon className="w-3.5 h-3.5" /> Source
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Repertoire */}
      <section id="skills" className="max-w-5xl mx-auto px-6 py-24 border-t border-zinc-800/60">
        <div className="flex items-center gap-3 mb-4">
          <Cpu className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-emerald-400">Repertoire</span>
        </div>
        <h2 className="text-3xl font-bold mb-12">Core Technical Disciplines</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {SKILLS.map((skillGroup, idx) => {
            const Icon = skillGroup.icon;
            return (
              <div key={idx} className="p-6 rounded-xl bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 transition-colors">
                <div className="flex items-center gap-2.5 mb-4">
                  <Icon className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-sm font-mono font-semibold text-white">{skillGroup.name}</h3>
                </div>
                <ul className="space-y-2.5 text-sm text-zinc-400 font-mono">
                  {skillGroup.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="max-w-4xl mx-auto px-6 py-28 text-center">
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
          Have a vision? Let’s engineer it.
        </h2>
        <p className="text-zinc-400 max-w-lg mx-auto mb-10 text-base">
          Available for select consulting engagements, creative engineering, and high-impact web interactions.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a 
            href="mailto:alex@rivera.design" 
            className="px-8 py-3.5 rounded-xl bg-emerald-500 text-black font-bold text-sm hover:bg-emerald-400 transition-colors flex items-center gap-2"
          >
            <Mail className="w-4 h-4" /> Start a Conversation
          </a>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noreferrer" 
            className="px-8 py-3.5 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-200 font-bold text-sm hover:bg-zinc-800 transition-colors flex items-center gap-2"
          >
            <GithubIcon className="w-4 h-4" /> GitHub
          </a>
          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noreferrer" 
            className="px-8 py-3.5 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-200 font-bold text-sm hover:bg-zinc-800 transition-colors flex items-center gap-2"
          >
            <LinkedinIcon className="w-4 h-4" /> LinkedIn
          </a>
        </div>
      </section>

      {/* Cinematic Curtain-Reveal Footer */}
      <CinematicFooter />
    </div>
    </>
  );
}

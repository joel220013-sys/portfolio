import { useState } from "react";
import { motion } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp";
import LogoCloudSwap from "@/components/ui/logo-clouds";
import MatrixRain from "@/components/ui/matrix-rain";
import IntroVideo from "@/components/ui/intro-video";
import RandomLetterSwapNav from "@/components/ui/m-random-letter-swap-1";
import ScrollAnimation from "@/components/ui/you-can-scroll";

export default function App() {
  const [introFinished, setIntroFinished] = useState(false);

  return (
    <div className="relative min-h-screen w-full bg-black text-white [overflow-x:clip]">
      {/* Intro Video Overlay */}
      {!introFinished && (
        <IntroVideo onComplete={() => setIntroFinished(true)} />
      )}

      {/* Main Website Content */}
      {introFinished && (
        <motion.div
          key="portfolio-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative w-full [overflow-x:clip]"
        >
          {/* Left Falling Green Matrix Rain */}
          <div
            className="fixed inset-y-0 left-0 w-44 sm:w-60 md:w-72 lg:w-80 xl:w-96 pointer-events-none z-30 overflow-hidden"
            style={{
              WebkitMaskImage:
                "linear-gradient(to right, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
              maskImage:
                "linear-gradient(to right, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
            }}
          >
            <MatrixRain fontSize={16} speed={1.0} />
          </div>

          {/* Right Falling Green Matrix Rain */}
          <div
            className="fixed inset-y-0 right-0 w-44 sm:w-60 md:w-72 lg:w-80 xl:w-96 pointer-events-none z-30 overflow-hidden"
            style={{
              WebkitMaskImage:
                "linear-gradient(to left, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
              maskImage:
                "linear-gradient(to left, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
            }}
          >
            <MatrixRain fontSize={16} speed={1.0} />
          </div>

          {/* Center Lamp Lighting Effect & Content */}
          <div className="relative z-10">
            <LampContainer className="bg-black">
              <div className="flex flex-col items-center justify-center w-full">
                {/* Navigation: Below the blue light and above the image */}
                <RandomLetterSwapNav className="mb-2 sm:mb-4" />
                <div id="profile-links" className="w-full">
                  <LogoCloudSwap className="bg-transparent" />
                </div>
              </div>
            </LampContainer>
          </div>

          {/* Scroll Down Prompt */}
          <div className="relative z-20 flex flex-col items-center justify-center py-6 bg-black text-zinc-500 font-mono text-xs tracking-widest uppercase">
            <span className="mb-2 animate-pulse">&darr; SCROLL DOWN TO EXPLORE &darr;</span>
          </div>

          {/* Scrolling Down Animation Section */}
          <div id="scroll-section" className="relative z-20 w-full bg-black [overflow-x:clip]">
            <ScrollAnimation />
          </div>
        </motion.div>
      )}
    </div>
  );
}

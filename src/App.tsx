import { useState } from "react";
import { motion } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp";
import LogoCloudSwap from "@/components/ui/logo-clouds";
import MatrixRain from "@/components/ui/matrix-rain";
import IntroVideo from "@/components/ui/intro-video";

export default function App() {
  const [introFinished, setIntroFinished] = useState(false);

  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-x-hidden">
      {/* Intro Video Overlay */}
      {!introFinished && (
        <IntroVideo onComplete={() => setIntroFinished(true)} />
      )}

      {/* Main Website Content - Mounts and triggers blue light animation right after video ends */}
      {introFinished && (
        <motion.div
          key="portfolio-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative w-full min-h-screen"
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
              <div className="flex flex-col items-center justify-center">
                <LogoCloudSwap className="bg-transparent" />
              </div>
            </LampContainer>
          </div>
        </motion.div>
      )}
    </div>
  );
}

"use client";
import * as React from "react";

interface IntroVideoProps {
  onComplete: () => void;
}

export function IntroVideo({ onComplete }: IntroVideoProps) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isFading, setIsFading] = React.useState(false);
  const finishedRef = React.useRef(false);

  const handleFinish = React.useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setIsFading(true);
    setTimeout(() => {
      onComplete();
    }, 450); // Smooth 450ms fade transition
  }, [onComplete]);

  React.useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {});
    }

    // Safety fallback: 7.5s (video duration is ~6s) so site always loads
    const safetyTimer = setTimeout(() => {
      handleFinish();
    }, 7500);

    return () => {
      clearTimeout(safetyTimer);
    };
  }, [handleFinish]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-500 ease-in-out ${
        isFading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl aspect-square flex items-center justify-center">
        <video
          ref={videoRef}
          src="/intro.mp4"
          autoPlay
          muted
          playsInline
          onEnded={handleFinish}
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}

export default IntroVideo;

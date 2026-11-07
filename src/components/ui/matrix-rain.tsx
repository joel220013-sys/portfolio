"use client";
import * as React from "react";

interface MatrixRainProps {
  className?: string;
  fontSize?: number;
  speed?: number;
  color?: string;
  headColor?: string;
}

interface Column {
  x: number;
  y: number;
  speed: number;
  length: number;
  chars: string[];
}

const CHARACTERS =
  "ｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ101010100101XYZ0123456789<>/*{}[]=;:ﾊﾐﾋｰ";

export function MatrixRain({
  className = "",
  fontSize = 16,
  speed = 1.0,
  color = "#22c55e", // Matrix neon green
  headColor = "#dcfce7", // Glowing bright mint-white head
}: MatrixRainProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let dpr = window.devicePixelRatio || 1;
    let width = 0;
    let height = 0;
    let columns: Column[] = [];

    const initColumns = () => {
      const parent = canvas.parentElement;
      width = parent?.clientWidth || Math.floor(window.innerWidth * 0.25);
      height = parent?.clientHeight || window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      const colCount = Math.max(1, Math.floor(width / fontSize));
      columns = [];

      for (let i = 0; i < colCount; i++) {
        const length = Math.floor(Math.random() * 16) + 12;
        const colChars: string[] = [];
        for (let j = 0; j < length; j++) {
          colChars.push(CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)]);
        }

        // Scatter initial drop positions across the full vertical space so it's instantly active!
        const initialY = Math.random() * height;
        const colSpeed = (Math.random() * 0.8 + 0.7) * speed * 2.2;

        columns.push({
          x: i * fontSize,
          y: initialY,
          speed: colSpeed,
          length,
          chars: colChars,
        });
      }
    };

    initColumns();

    const handleResize = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset scale before reinitializing
      dpr = window.devicePixelRatio || 1;
      initColumns();
    };

    window.addEventListener("resize", handleResize);

    let lastTime = performance.now();

    const render = (time: number) => {
      animationFrameId = requestAnimationFrame(render);

      const deltaTime = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Clear the canvas completely so it is 100% transparent with NO dark box or borders
      ctx.clearRect(0, 0, width, height);

      ctx.font = `bold ${fontSize}px monospace`;
      ctx.textBaseline = "top";

      for (let i = 0; i < columns.length; i++) {
        const col = columns[i];

        // Randomly mutate one character occasionally for authentic digital flicker
        if (Math.random() < 0.08) {
          const randIdx = Math.floor(Math.random() * col.chars.length);
          col.chars[randIdx] = CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
        }

        // Advance vertical drop
        col.y += col.speed * fontSize * deltaTime * 12;

        // Draw trail characters
        for (let j = 0; j < col.length; j++) {
          const charY = col.y - j * fontSize;

          // Skip characters off screen
          if (charY < -fontSize || charY > height) continue;

          const char = col.chars[j];

          if (j === 0) {
            // Bright white/mint glowing head
            ctx.fillStyle = headColor;
            ctx.shadowColor = "#4ade80";
            ctx.shadowBlur = 12;
            ctx.globalAlpha = 1.0;
          } else if (j <= 2) {
            // Luminous neon green immediately behind head
            ctx.fillStyle = color;
            ctx.shadowColor = "#22c55e";
            ctx.shadowBlur = 8;
            ctx.globalAlpha = 0.95;
          } else {
            // Smoothly fading trailing characters
            const fade = 1 - (j - 2) / (col.length - 2);
            ctx.fillStyle = color;
            ctx.shadowColor = "#16a34a";
            ctx.shadowBlur = Math.max(0, fade * 4);
            ctx.globalAlpha = Math.max(0.08, fade * 0.85);
          }

          ctx.fillText(char, col.x, charY);
        }

        // Reset drop when tail passes bottom of screen
        if (col.y - col.length * fontSize > height) {
          col.y = -fontSize * (Math.floor(Math.random() * 6) + 1);
          col.speed = (Math.random() * 0.8 + 0.7) * speed * 2.2;
          col.length = Math.floor(Math.random() * 16) + 12;
        }
      }

      // Reset context state for next frame
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1.0;
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [fontSize, speed, color, headColor]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full block ${className}`}
      style={{ display: "block" }}
    />
  );
}

export default MatrixRain;

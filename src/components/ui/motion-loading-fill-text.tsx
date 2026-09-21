"use client"

import { useEffect } from "react"
import { motion, useSpring, useTransform } from "motion/react"
import "./motion-loading-fill-text-utils/index.css"

export interface LoadingFillTextProps {
  text?: string
  className?: string
  onComplete?: () => void
}

function useFillProgress(onComplete?: () => void) {
  const progress = useSpring(0, {
    stiffness: 70,
    damping: 20
  })

  useEffect(() => {
    let completed = false
    const id = setInterval(() => {
      const current = progress.get()
      const next = Math.min(1, current + 0.15 + Math.random() * 0.15)
      progress.set(next)

      if (next >= 1 && !completed) {
        completed = true
        clearInterval(id)
        if (onComplete) {
          setTimeout(() => {
            onComplete()
          }, 600)
        }
      }
    }, 400)
    return () => clearInterval(id)
  }, [progress, onComplete])

  return progress
}

export function LoadingFillText({
  text = "Loading",
  className = "",
  onComplete
}: LoadingFillTextProps = {}) {
  const progress = useFillProgress(onComplete)
  const clipPath = useTransform(progress, [0, 1], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"])

  return (
    <div className={`fill-text-container ${className}`.trim()}>
      <div className="fill-text-stack">
        <div className="fill-text fill-text-bg" aria-hidden>
          {text}
        </div>
        <motion.div className="fill-text fill-text-fill" style={{ clipPath }}>
          {text}
        </motion.div>
      </div>
    </div>
  )
}

export default LoadingFillText

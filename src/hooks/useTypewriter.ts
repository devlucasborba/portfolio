import { useState, useEffect, useRef } from 'react'

interface UseTypewriterOptions {
  speed?: number
  delay?: number
  enabled?: boolean
}

export function useTypewriter(
  text: string,
  { speed = 40, delay = 0, enabled = true }: UseTypewriterOptions = {}
) {
  const [displayed, setDisplayed] = useState(enabled ? '' : text)
  const [done, setDone] = useState(!enabled)
  const indexRef = useRef(0)

  useEffect(() => {
    if (!enabled) {
      setDisplayed(text)
      setDone(true)
      return
    }

    setDisplayed('')
    setDone(false)
    indexRef.current = 0

    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (indexRef.current < text.length) {
          setDisplayed(text.slice(0, indexRef.current + 1))
          indexRef.current++
        } else {
          clearInterval(interval)
          setDone(true)
        }
      }, speed)
      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(startTimeout)
  }, [text, speed, delay, enabled])

  return { displayed, done }
}

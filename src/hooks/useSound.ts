import { useCallback, useRef } from 'react'

const SOUND_KEY = 'portfolio_sound_enabled'
const HOVER_THROTTLE_MS = 150
const BASE = import.meta.env.BASE_URL
const HOVER_SRC = `${BASE}sounds/hover.mp3`
const CLICK_SRC = `${BASE}sounds/click.mp3`

export function useSoundEnabled() {
  const stored = localStorage.getItem(SOUND_KEY)
  return stored === null ? true : stored === 'true'
}

export function setSoundEnabled(val: boolean) {
  localStorage.setItem(SOUND_KEY, String(val))
}

function createAudioEngine() {
  let ctx: AudioContext | null = null
  const buffers: Record<string, AudioBuffer> = {}
  const loading: Record<string, boolean> = {}

  function getCtx() {
    if (!ctx) {
      ctx = new (
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      )()
    }
    return ctx
  }

  async function load(src: string) {
    if (buffers[src] || loading[src]) return
    loading[src] = true
    try {
      const res = await fetch(src)
      const ab = await res.arrayBuffer()
      buffers[src] = await getCtx().decodeAudioData(ab)
    } catch {
      // ignore
    } finally {
      loading[src] = false
    }
  }

  function play(src: string, volume = 0.25, offset = 0) {
    const buffer = buffers[src]
    if (!buffer) { load(src); return }
    try {
      const c = getCtx()
      const source = c.createBufferSource()
      source.buffer = buffer
      const gain = c.createGain()
      gain.gain.value = volume
      source.connect(gain)
      gain.connect(c.destination)
      source.start(0, offset)
    } catch {
      // ignore
    }
  }

  return { load, play }
}

const engine = createAudioEngine()
engine.load(HOVER_SRC)
engine.load(CLICK_SRC)

export function useSound() {
  const lastHoverRef = useRef(0)

  const playHover = useCallback(() => {
    if (localStorage.getItem(SOUND_KEY) === 'false') return
    const now = Date.now()
    if (now - lastHoverRef.current < HOVER_THROTTLE_MS) return
    lastHoverRef.current = now
    engine.play(HOVER_SRC, 0.25)
  }, [])

  const playClick = useCallback(() => {
    if (localStorage.getItem(SOUND_KEY) === 'false') return
    engine.play(CLICK_SRC, 0.3)
  }, [])

  return { playHover, playClick }
}

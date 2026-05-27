import { useCallback, useRef } from "react"

export function usePracticeSounds() {
  const ctxRef = useRef<AudioContext | null>(null)

  const ctx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext()
    }
    const c = ctxRef.current
    if (c.state === "suspended") void c.resume()
    return c
  }, [])

  const tone = useCallback(
    (frequency: number, durationMs: number, type: OscillatorType = "sine", volume = 0.12) => {
      const audio = ctx()
      const osc = audio.createOscillator()
      const gain = audio.createGain()
      osc.type = type
      osc.frequency.value = frequency
      gain.gain.value = volume
      gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + durationMs / 1000)
      osc.connect(gain)
      gain.connect(audio.destination)
      osc.start()
      osc.stop(audio.currentTime + durationMs / 1000)
    },
    [ctx],
  )

  const playType = useCallback(() => tone(920, 28, "square", 0.06), [tone])

  const playCorrect = useCallback(() => {
    tone(523, 70, "sine", 0.1)
    window.setTimeout(() => tone(784, 90, "sine", 0.1), 70)
  }, [tone])

  const playWrong = useCallback(() => tone(180, 120, "sawtooth", 0.1), [tone])

  const playSentence = useCallback(() => {
    tone(440, 60, "sine", 0.1)
    window.setTimeout(() => tone(554, 60, "sine", 0.1), 60)
    window.setTimeout(() => tone(659, 100, "sine", 0.1), 120)
  }, [tone])

  return { playType, playCorrect, playWrong, playSentence }
}

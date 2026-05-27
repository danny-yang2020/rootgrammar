import { useCallback, useEffect, useState } from "react"
import type { Lesson, PracticePhase, PracticeStats, Sentence } from "./types"
import { wordsMatch } from "./normalize"

const WORD_SCORE = 100
const COMBO_BONUS = 25
const SENTENCE_BONUS = 200

interface UsePracticeOptions {
  lesson: Lesson
}

export function usePractice({ lesson }: UsePracticeOptions) {
  const [sentenceIndex, setSentenceIndex] = useState(0)
  const [wordIndex, setWordIndex] = useState(0)
  const [input, setInput] = useState("")
  const [phase, setPhase] = useState<PracticePhase>("typing")
  const [shake, setShake] = useState(false)
  const [flashCorrect, setFlashCorrect] = useState(false)
  const [stats, setStats] = useState<PracticeStats>({
    score: 0,
    combo: 0,
    maxCombo: 0,
    correctWords: 0,
    totalWords: 0,
    mistakes: 0,
  })
  const sentences = lesson.sentences
  const currentSentence: Sentence | undefined = sentences[sentenceIndex]
  const currentWord = currentSentence?.words[wordIndex]
  const totalWordsInLesson = sentences.reduce((n, s) => n + s.words.length, 0)

  const progress =
    stats.totalWords > 0
      ? Math.round((stats.correctWords / totalWordsInLesson) * 100)
      : 0

  const submitWord = useCallback((): "correct" | "wrong" | "noop" => {
    if (!currentSentence || !currentWord || phase !== "typing") return "noop"

    const trimmed = input.trim()
    if (!trimmed) return "noop"

    if (wordsMatch(currentWord.en, trimmed)) {
      const newCombo = stats.combo + 1
      const wordScore = WORD_SCORE + newCombo * COMBO_BONUS
      const newCorrect = stats.correctWords + 1
      const newStats: PracticeStats = {
        ...stats,
        score: stats.score + wordScore,
        combo: newCombo,
        maxCombo: Math.max(stats.maxCombo, newCombo),
        correctWords: newCorrect,
        totalWords: newCorrect,
      }
      setStats(newStats)
      setFlashCorrect(true)
      setInput("")

      const isLastWord = wordIndex >= currentSentence.words.length - 1
      if (isLastWord) {
        const withBonus: PracticeStats = {
          ...newStats,
          score: newStats.score + SENTENCE_BONUS + newStats.combo * 50,
        }
        setStats(withBonus)
        setPhase("sentence-done")
      } else {
        setWordIndex((i) => i + 1)
      }
      return "correct"
    }

    setStats((s) => ({
      ...s,
      combo: 0,
      mistakes: s.mistakes + 1,
    }))
    setShake(true)
    setTimeout(() => setShake(false), 400)
    return "wrong"
  }, [currentSentence, currentWord, input, phase, stats, wordIndex])

  const nextSentence = useCallback(() => {
    setFlashCorrect(false)
    if (sentenceIndex >= sentences.length - 1) {
      setPhase("lesson-done")
      return
    }
    setSentenceIndex((i) => i + 1)
    setWordIndex(0)
    setInput("")
    setPhase("typing")
  }, [sentenceIndex, sentences.length])

  const restart = useCallback(() => {
    setSentenceIndex(0)
    setWordIndex(0)
    setInput("")
    setPhase("typing")
    setStats({
      score: 0,
      combo: 0,
      maxCombo: 0,
      correctWords: 0,
      totalWords: 0,
      mistakes: 0,
    })
  }, [])

  useEffect(() => {
    if (phase !== "word-flash") return
    const t = setTimeout(() => {
      setFlashCorrect(false)
      setPhase("typing")
    }, 300)
    return () => clearTimeout(t)
  }, [phase])

  return {
    sentenceIndex,
    wordIndex,
    input,
    setInput,
    phase,
    shake,
    flashCorrect,
    stats,
    progress,
    currentSentence,
    currentWord,
    totalSentences: sentences.length,
    totalWordsInLesson,
    submitWord,
    nextSentence,
    restart,
  }
}

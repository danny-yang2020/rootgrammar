import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react"

interface LessonProgress {
  completedAt: string
  score: number
  accuracy: number
}

interface UserProgress {
  lessons: Record<string, LessonProgress>
  totalScore: number
  streak: number
  lastPracticeDate: string | null
}

const STORAGE_KEY = "rootgrammar-progress"

const LEGACY_KEY = "julebu-progress"

const defaultProgress: UserProgress = {
  lessons: {},
  totalScore: 0,
  streak: 0,
  lastPracticeDate: null,
}

interface ProgressContextValue {
  progress: UserProgress
  recordLesson: (lessonId: string, score: number, accuracy: number) => void
  isLessonComplete: (lessonId: string) => boolean
}

const ProgressContext = createContext<ProgressContextValue | null>(null)

function loadProgress(): UserProgress {
  try {
    let raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      raw = localStorage.getItem(LEGACY_KEY)
      if (raw) localStorage.setItem(STORAGE_KEY, raw)
    }
    if (raw) return { ...defaultProgress, ...JSON.parse(raw) }
  } catch {
    /* ignore */
  }
  return { ...defaultProgress }
}

function todayKey() {
  return new Date().toISOString().slice(0, 10)
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<UserProgress>(loadProgress)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  }, [progress])

  const recordLesson = useCallback((lessonId: string, score: number, accuracy: number) => {
    setProgress((prev) => {
      const today = todayKey()
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10)
      let streak = prev.streak
      if (prev.lastPracticeDate === today) {
        /* same day */
      } else if (prev.lastPracticeDate === yesterday) {
        streak += 1
      } else {
        streak = 1
      }

      return {
        lessons: {
          ...prev.lessons,
          [lessonId]: { completedAt: new Date().toISOString(), score, accuracy },
        },
        totalScore: prev.totalScore + score,
        streak,
        lastPracticeDate: today,
      }
    })
  }, [])

  const isLessonComplete = useCallback(
    (lessonId: string) => Boolean(progress.lessons[lessonId]),
    [progress.lessons],
  )

  return (
    <ProgressContext.Provider value={{ progress, recordLesson, isLessonComplete }}>
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider")
  return ctx
}

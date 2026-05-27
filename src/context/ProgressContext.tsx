import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react"
import { useAuth } from "./AuthContext"
import { supabase } from "../lib/supabase"

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
  syncing: boolean
}

const ProgressContext = createContext<ProgressContextValue | null>(null)

function loadLocalProgress(): UserProgress {
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
  const { user } = useAuth()
  const [progress, setProgress] = useState<UserProgress>(loadLocalProgress)
  const [syncing, setSyncing] = useState(false)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  }, [progress])

  useEffect(() => {
    if (!user || !supabase) return

    let cancelled = false
    setSyncing(true)

    async function loadCloud() {
      const [completionsRes, statsRes] = await Promise.all([
        supabase!
          .from("lesson_completions")
          .select("lesson_id, score, accuracy, completed_at")
          .eq("user_id", user!.id),
        supabase!.from("user_stats").select("total_score, streak, last_practice_date").eq("user_id", user!.id).maybeSingle(),
      ])

      if (cancelled) return

      const lessons: Record<string, LessonProgress> = {}
      completionsRes.data?.forEach((row) => {
        lessons[row.lesson_id] = {
          completedAt: row.completed_at,
          score: row.score,
          accuracy: row.accuracy,
        }
      })

      const stats = statsRes.data
      setProgress({
        lessons,
        totalScore: stats?.total_score ?? 0,
        streak: stats?.streak ?? 0,
        lastPracticeDate: stats?.last_practice_date ?? null,
      })
      setSyncing(false)
    }

    loadCloud()
    return () => {
      cancelled = true
    }
  }, [user?.id])

  const recordLesson = useCallback(
    (lessonId: string, score: number, accuracy: number) => {
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

        const next: UserProgress = {
          lessons: {
            ...prev.lessons,
            [lessonId]: { completedAt: new Date().toISOString(), score, accuracy },
          },
          totalScore: prev.totalScore + score,
          streak,
          lastPracticeDate: today,
        }

        if (user && supabase) {
          void (async () => {
            await supabase.from("lesson_completions").upsert(
              {
                user_id: user.id,
                lesson_id: lessonId,
                score,
                accuracy,
                completed_at: new Date().toISOString(),
              },
              { onConflict: "user_id,lesson_id" },
            )
            await supabase.from("user_stats").upsert({
              user_id: user.id,
              total_score: next.totalScore,
              streak: next.streak,
              last_practice_date: today,
              updated_at: new Date().toISOString(),
            })
          })()
        }

        return next
      })
    },
    [user],
  )

  const isLessonComplete = useCallback(
    (lessonId: string) => Boolean(progress.lessons[lessonId]),
    [progress.lessons],
  )

  return (
    <ProgressContext.Provider value={{ progress, recordLesson, isLessonComplete, syncing }}>
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider")
  return ctx
}

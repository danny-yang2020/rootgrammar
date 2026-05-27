import { useCallback } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { getLesson } from "../data/courses"
import { PracticeGame } from "../components/practice/PracticeGame"
import { useProgress } from "../context/ProgressContext"
import { useLocale } from "../context/LocaleContext"
import { pickLocalized } from "../i18n/helpers"

export function PracticePage() {
  const { lessonId } = useParams<{ lessonId: string }>()
  const navigate = useNavigate()
  const { recordLesson } = useProgress()
  const { locale, t } = useLocale()
  const lesson = lessonId ? getLesson(lessonId) : undefined

  const handleComplete = useCallback(
    (score: number, accuracy: number) => {
      if (lesson) recordLesson(lesson.id, score, accuracy)
    },
    [lesson, recordLesson],
  )

  if (!lesson) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0b] px-4 text-center text-gray-300">
        <p>{t.practice.notFound}</p>
        <Link to="/learn" className="mt-4 text-purple-400 hover:underline">
          {t.practice.backToCourses}
        </Link>
      </div>
    )
  }

  const lessonTitle = pickLocalized(locale, lesson.title, lesson.titleEn)

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-gray-300">
      <header className="flex items-center justify-between border-b border-white/5 px-4 py-3">
        <button
          type="button"
          onClick={() => navigate("/learn")}
          className="flex items-center gap-1.5 text-sm text-gray-400 transition-colors hover:text-white"
        >
          <ArrowLeft className="size-4" />
          {t.practice.exit}
        </button>
        <span className="text-sm font-medium text-gray-300">{lessonTitle}</span>
        <Link to="/" className="text-sm text-gray-500 hover:text-white">
          {t.practice.home}
        </Link>
      </header>

      <main className="mx-auto max-w-4xl">
        <PracticeGame
          lesson={lesson}
          onLessonComplete={handleComplete}
          onExit={() => navigate("/learn")}
        />
      </main>
    </div>
  )
}

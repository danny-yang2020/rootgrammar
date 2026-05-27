import { useCallback } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { getLesson } from "../../data/courses"
import { PracticeGame } from "../../components/practice/PracticeGame"
import { useProgress } from "../../context/ProgressContext"
import { useLocale } from "../../context/LocaleContext"
import { pickLocalized } from "../../i18n/helpers"

export function AppPracticePage() {
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
      <div className="flex min-h-screen flex-col items-center justify-center bg-stone-50 px-4 text-center text-stone-600 dark:bg-[#0a0a0b] dark:text-gray-300">
        <p>{t.practice.notFound}</p>
        <Link to="/app/courses" className="mt-4 text-purple-600 hover:underline dark:text-purple-400">
          {t.practice.backToCourses}
        </Link>
      </div>
    )
  }

  const lessonTitle = pickLocalized(locale, lesson.title, lesson.titleEn)

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 dark:bg-[#0a0a0b] dark:text-gray-300">
      <header className="flex items-center justify-between border-b border-stone-200 px-4 py-3 dark:border-white/5">
        <button
          type="button"
          onClick={() => navigate("/app/courses")}
          className="flex items-center gap-1.5 text-sm text-stone-600 transition-colors hover:text-stone-900 dark:text-gray-400 dark:hover:text-white"
        >
          <ArrowLeft className="size-4" />
          {t.practice.exit}
        </button>
        <span className="text-sm font-medium text-stone-800 dark:text-gray-300">{lessonTitle}</span>
        <Link
          to="/app"
          className="text-sm text-stone-500 transition-colors hover:text-stone-900 dark:hover:text-white"
        >
          {t.app.navHome}
        </Link>
      </header>

      <main className="mx-auto max-w-4xl">
        <PracticeGame
          lesson={lesson}
          onLessonComplete={handleComplete}
          onExit={() => navigate("/app/courses")}
        />
      </main>
    </div>
  )
}

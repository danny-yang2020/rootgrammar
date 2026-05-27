import { Link } from "react-router-dom"
import { ArrowRight, BookOpen, Flame, Trophy } from "lucide-react"
import { courses, getCourseLessons, lessons } from "../../data/courses"
import { useProgress } from "../../context/ProgressContext"
import { useLocale } from "../../context/LocaleContext"
import { pickLocalized } from "../../i18n/helpers"

function findContinueLesson(isComplete: (id: string) => boolean): string | null {
  for (const course of courses) {
    for (const lesson of getCourseLessons(course.id)) {
      if (!isComplete(lesson.id)) return lesson.id
    }
  }
  return courses[0] ? getCourseLessons(courses[0].id)[0]?.id ?? null : null
}

export function AppHomePage() {
  const { progress, isLessonComplete } = useProgress()
  const { locale, t } = useLocale()
  const continueId = findContinueLesson(isLessonComplete)
  const continueLesson = continueId ? lessons[continueId] : undefined
  const completedCount = Object.keys(progress.lessons).length

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold text-stone-900 md:text-3xl dark:text-white">{t.app.welcome}</h1>
      <p className="mt-2 text-stone-600 dark:text-gray-400">{t.app.welcomeSub}</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-zinc-900/80 dark:shadow-none">
          <Flame className="size-5 text-orange-500" />
          <p className="mt-2 text-2xl font-bold tabular-nums text-stone-900 dark:text-white">{progress.streak}</p>
          <p className="text-xs text-stone-500 dark:text-gray-500">{t.learn.streak}</p>
        </div>
        <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-zinc-900/80 dark:shadow-none">
          <Trophy className="size-5 text-amber-500" />
          <p className="mt-2 text-2xl font-bold tabular-nums text-stone-900 dark:text-white">
            {progress.totalScore.toLocaleString()}
          </p>
          <p className="text-xs text-stone-500 dark:text-gray-500">{t.learn.totalScore}</p>
        </div>
        <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-zinc-900/80 dark:shadow-none">
          <BookOpen className="size-5 text-purple-600" />
          <p className="mt-2 text-2xl font-bold tabular-nums text-stone-900 dark:text-white">{completedCount}</p>
          <p className="text-xs text-stone-500 dark:text-gray-500">{t.app.lessonsDone}</p>
        </div>
      </div>

      {continueLesson && (
        <section className="mt-10 rounded-2xl border border-purple-200 bg-gradient-to-br from-purple-50 to-white p-6 shadow-sm dark:border-purple-500/30 dark:from-purple-950/50 dark:to-zinc-900 dark:shadow-none">
          <p className="text-sm font-medium text-purple-700 dark:text-purple-300">{t.app.continueLabel}</p>
          <h2 className="mt-1 text-xl font-bold text-stone-900 dark:text-white">
            {pickLocalized(locale, continueLesson.title, continueLesson.titleEn)}
          </h2>
          <Link
            to={`/app/practice/${continueLesson.id}`}
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-purple-500 px-6 py-3 text-sm font-medium text-white hover:bg-purple-600"
          >
            {t.app.continueBtn}
            <ArrowRight className="size-4" />
          </Link>
        </section>
      )}

      <Link
        to="/app/courses"
        className="mt-6 flex items-center justify-between rounded-xl border border-stone-200 bg-white px-5 py-4 shadow-sm transition-colors hover:border-purple-300 dark:border-white/10 dark:bg-zinc-900/50 dark:shadow-none dark:hover:border-purple-500/40"
      >
        <span className="font-medium text-stone-800 dark:text-gray-200">{t.app.browseCourses}</span>
        <ArrowRight className="size-4 text-stone-400 dark:text-gray-500" />
      </Link>
    </div>
  )
}

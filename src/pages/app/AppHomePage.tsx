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
      <h1 className="text-2xl font-bold text-white md:text-3xl">{t.app.welcome}</h1>
      <p className="mt-2 text-gray-400">{t.app.welcomeSub}</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-zinc-900/80 p-4">
          <Flame className="size-5 text-orange-400" />
          <p className="mt-2 text-2xl font-bold tabular-nums text-white">{progress.streak}</p>
          <p className="text-xs text-gray-500">{t.learn.streak}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-zinc-900/80 p-4">
          <Trophy className="size-5 text-amber-400" />
          <p className="mt-2 text-2xl font-bold tabular-nums text-white">
            {progress.totalScore.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500">{t.learn.totalScore}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-zinc-900/80 p-4">
          <BookOpen className="size-5 text-purple-400" />
          <p className="mt-2 text-2xl font-bold tabular-nums text-white">{completedCount}</p>
          <p className="text-xs text-gray-500">{t.app.lessonsDone}</p>
        </div>
      </div>

      {continueLesson && (
        <section className="mt-10 rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-950/50 to-zinc-900 p-6">
          <p className="text-sm font-medium text-purple-300">{t.app.continueLabel}</p>
          <h2 className="mt-1 text-xl font-bold text-white">
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
        className="mt-6 flex items-center justify-between rounded-xl border border-white/10 bg-zinc-900/50 px-5 py-4 transition-colors hover:border-purple-500/40"
      >
        <span className="font-medium text-gray-200">{t.app.browseCourses}</span>
        <ArrowRight className="size-4 text-gray-500" />
      </Link>
    </div>
  )
}

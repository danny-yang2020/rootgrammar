import { Link } from "react-router-dom"
import { BookOpen, CheckCircle2, Lock } from "lucide-react"
import { courses, getCourseLessons } from "../../data/courses"
import { useProgress } from "../../context/ProgressContext"
import { useLocale } from "../../context/LocaleContext"
import { pickLocalized } from "../../i18n/helpers"

export function CoursesPage() {
  const { isLessonComplete } = useProgress()
  const { locale, t } = useLocale()

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-2xl font-bold text-stone-900 md:text-3xl dark:text-white">{t.learn.title}</h1>
      <p className="mt-2 text-stone-600 dark:text-gray-400">{t.app.coursesSub}</p>

      <div className="mt-10 space-y-10">
        {courses.map((course) => {
          const courseLessons = getCourseLessons(course.id)
          const comingSoon = courseLessons.length === 0
          const tags = locale === "en" && course.tagsEn ? course.tagsEn : course.tags

          return (
            <section key={course.id}>
              <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
                <div>
                  <span className="text-xs font-medium uppercase tracking-wide text-purple-600 dark:text-purple-400">
                    {t.levels[course.level]}
                  </span>
                  <h2 className="text-xl font-bold text-stone-900 dark:text-white">
                    {pickLocalized(locale, course.title, course.titleEn)}
                  </h2>
                  <p className="mt-1 text-sm text-stone-500 dark:text-gray-500">
                    {pickLocalized(locale, course.description, course.descriptionEn)}
                  </p>
                </div>
                <div className="flex gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-700 dark:bg-purple-500/15 dark:text-purple-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {comingSoon ? (
                <div className="flex items-center gap-3 rounded-xl border border-dashed border-stone-300 p-8 text-stone-500 dark:border-gray-700 dark:text-gray-500">
                  <Lock className="size-5 shrink-0" />
                  <span>{t.learn.comingSoon}</span>
                </div>
              ) : (
                <ul className="grid gap-3 sm:grid-cols-2">
                  {courseLessons.map((lesson) => {
                    const done = isLessonComplete(lesson.id)
                    const sentenceCount = lesson.sentences.length
                    return (
                      <li key={lesson.id}>
                        <Link
                          to={`/app/practice/${lesson.id}`}
                          className="group flex items-start gap-4 rounded-xl border border-stone-200 bg-white p-5 shadow-sm transition-all hover:border-purple-300 hover:shadow-md dark:border-white/10 dark:bg-zinc-900/60 dark:shadow-none dark:hover:border-purple-500/50 dark:hover:bg-zinc-900"
                        >
                          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300">
                            {done ? <CheckCircle2 className="size-5" /> : <BookOpen className="size-5" />}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-semibold text-stone-900 group-hover:text-purple-700 dark:text-white dark:group-hover:text-purple-300">
                              {pickLocalized(locale, lesson.title, lesson.titleEn)}
                            </p>
                            {(lesson.description || lesson.descriptionEn) && (
                              <p className="mt-0.5 text-sm text-stone-500 dark:text-gray-500">
                                {pickLocalized(locale, lesson.description ?? "", lesson.descriptionEn)}
                              </p>
                            )}
                            <p className="mt-2 text-xs text-stone-400 dark:text-gray-600">
                              {sentenceCount} {t.learn.sentences} · {t.learn.free}
                            </p>
                          </div>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              )}
            </section>
          )
        })}
      </div>
    </div>
  )
}

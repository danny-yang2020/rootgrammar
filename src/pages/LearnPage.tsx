import { Link } from "react-router-dom"
import { BookOpen, CheckCircle2, Flame, Lock } from "lucide-react"
import { courses, getCourseLessons } from "../data/courses"
import { useProgress } from "../context/ProgressContext"
import { useLocale } from "../context/LocaleContext"
import { pickLocalized } from "../i18n/helpers"
import { SiteLayout } from "../components/SiteLayout"

export function LearnPage() {
  const { progress, isLessonComplete } = useProgress()
  const { locale, t } = useLocale()

  return (
    <SiteLayout>
      <div className="mx-auto max-w-[1300px] px-4 py-12 sm:px-6 md:py-16 lg:px-[30px]">
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white md:text-4xl">{t.learn.title}</h1>
          <p className="mt-3 text-gray-500 dark:text-gray-400">{t.learn.subtitle}</p>
          {(progress.totalScore > 0 || progress.streak > 0) && (
            <div className="mt-6 inline-flex flex-wrap gap-4 rounded-xl border border-gray-200 bg-gray-50 px-5 py-3 dark:border-gray-700 dark:bg-zinc-900">
              <span className="flex items-center gap-1.5 text-sm">
                <Flame className="size-4 text-orange-500" />
                <strong>{progress.streak}</strong> {t.learn.streak}
              </span>
              <span className="text-sm text-gray-500">
                {t.learn.totalScore}{" "}
                <strong className="text-purple-600 dark:text-purple-400">{progress.totalScore.toLocaleString()}</strong>
              </span>
            </div>
          )}
        </div>

        <div className="space-y-10">
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
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      {pickLocalized(locale, course.title, course.titleEn)}
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      {pickLocalized(locale, course.description, course.descriptionEn)}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-purple-50 px-2.5 py-0.5 text-xs font-medium text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {comingSoon ? (
                  <div className="flex items-center gap-3 rounded-xl border border-dashed border-gray-300 p-8 text-gray-400 dark:border-gray-700">
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
                            to={`/practice/${lesson.id}`}
                            className="group flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-5 transition-all hover:border-purple-300 hover:shadow-md dark:border-gray-800 dark:bg-zinc-900 dark:hover:border-purple-700"
                          >
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-300">
                              {done ? <CheckCircle2 className="size-5" /> : <BookOpen className="size-5" />}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="font-semibold text-gray-900 group-hover:text-purple-600 dark:text-white dark:group-hover:text-purple-400">
                                {pickLocalized(locale, lesson.title, lesson.titleEn)}
                              </p>
                              {(lesson.description || lesson.descriptionEn) && (
                                <p className="mt-0.5 text-sm text-gray-500">
                                  {pickLocalized(locale, lesson.description ?? "", lesson.descriptionEn)}
                                </p>
                              )}
                              <p className="mt-2 text-xs text-gray-400">
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
    </SiteLayout>
  )
}

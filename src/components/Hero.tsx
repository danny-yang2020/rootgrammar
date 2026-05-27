import { Link } from "react-router-dom"
import { useLocale } from "../context/LocaleContext"
import { useAuth } from "../context/AuthContext"
import { GamePreview } from "./GamePreview"

const heroAvatars = [1, 2, 3, 4].map((n) => `/commentsImgs/avatar-${n}.svg`)

export function Hero() {
  const { locale, t } = useLocale()
  const { user } = useAuth()
  const badgeNumber = locale === "en" ? "700K+" : "70万+"

  const tryHref = user ? "/app/practice/beginner-01" : "/auth"
  const tryState = user ? undefined : { from: "/app/practice/beginner-01" }
  const coursesHref = user ? "/app/courses" : "/auth"
  const coursesState = user ? undefined : { from: "/app/courses" }

  return (
    <section id="home" aria-label="Home" className="pt-16 text-gray-500">
      <div className="mx-auto my-5 text-center">
        <div className="hero-stagger mb-6 flex items-center justify-center" style={{ "--stagger": 0 } as React.CSSProperties}>
          <div className="inline-flex items-center gap-2.5 rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 dark:border-gray-700 dark:bg-gray-800/60">
            <div className="flex -space-x-1.5">
              {heroAvatars.map((src) => (
                <img
                  key={src}
                  src={src}
                  alt=""
                  width={22}
                  height={22}
                  className="size-[22px] rounded-full border-[1.5px] border-white object-cover dark:border-gray-800"
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              <strong className="font-semibold text-gray-800 dark:text-gray-100">{badgeNumber}</strong>{" "}
              {t.hero.badge}
            </span>
          </div>
        </div>

        <h1
          className="hero-stagger text-3xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white lg:text-4xl xl:text-5xl"
          style={{ "--stagger": 1 } as React.CSSProperties}
        >
          {locale === "en" ? (
            <>
              {t.hero.title}{" "}
              <span className="text-purple-600 dark:text-purple-400">{t.hero.titleHighlight}</span>{" "}
              {t.hero.titleEnd}
            </>
          ) : (
            <>
              {t.hero.title}
              <span className="text-purple-600 dark:text-purple-400">{t.hero.titleHighlight}</span>
              {t.hero.titleEnd}
            </>
          )}
        </h1>

        <div className="hero-stagger mt-5 text-sm md:text-base xl:text-lg" style={{ "--stagger": 2 } as React.CSSProperties}>
          <p className="pt-2 text-center text-lg text-gray-600 dark:text-gray-200 lg:text-2xl">
            {t.hero.subtitle}&emsp;
            <span className="underline decoration-2 underline-offset-4">{t.hero.subtitleEm}</span>
          </p>
        </div>
      </div>

      <div className="hero-stagger mt-8 flex items-center justify-center gap-3" style={{ "--stagger": 3 } as React.CSSProperties}>
        <Link
          to={tryHref}
          state={tryState}
          className="hidden h-9 items-center justify-center rounded-lg bg-purple-500 px-6 py-2.5 text-sm font-medium text-white shadow transition-colors hover:bg-purple-600 md:inline-flex"
        >
          {t.hero.playNow}
        </Link>
        <Link
          to={user ? "/app" : "/auth"}
          state={user ? undefined : { from: "/app" }}
          className="inline-flex h-9 items-center justify-center rounded-lg border border-purple-500 bg-purple-500 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-purple-600 md:border-gray-300 md:bg-transparent md:text-gray-700 md:hover:bg-gray-50 md:dark:border-gray-500 md:dark:text-gray-200 md:dark:hover:bg-gray-800"
        >
          {t.hero.tryFree}
        </Link>
      </div>

      <p className="hero-stagger mt-5 text-center text-sm text-gray-500 dark:text-gray-400" style={{ "--stagger": 4 } as React.CSSProperties}>
        {!user && (
          <>
            <Link to="/auth" state={{ from: "/app" }} className="underline-offset-4 hover:underline">
              {locale === "zh" ? "注册保存学习进度 →" : "Sign up to save progress →"}
            </Link>
            <span className="mx-2 text-gray-400">·</span>
          </>
        )}
        <Link to={coursesHref} state={coursesState} className="underline-offset-4 hover:underline">
          {t.hero.startCourse}
        </Link>
      </p>

      <div className="hero-preview mt-10 flex justify-center px-2 md:hidden">
        <Link
          to={tryHref}
          state={tryState}
          className="group overflow-hidden rounded-xl border border-gray-200/60 shadow-lg transition-shadow hover:shadow-xl dark:border-gray-700/60"
        >
          <img
            src="/images/landing/hero-game-preview.webp"
            alt="Practice demo"
            width={1200}
            height={675}
            className="w-full transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </Link>
      </div>

      <div className="relative mt-10 hidden w-full justify-center md:flex">
        <div className="mx-auto w-full max-w-[1320px] px-2">
          <Link to={tryHref} state={tryState} className="block transition-opacity hover:opacity-95">
            <GamePreview />
          </Link>
        </div>
      </div>
    </section>
  )
}

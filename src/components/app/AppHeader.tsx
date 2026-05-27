import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { useLocale } from "../../context/LocaleContext"
import { LanguageToggle } from "../LanguageToggle"
import { ThemeSwitcher } from "../ThemeSwitcher"

export function AppHeader() {
  const { pathname } = useLocation()
  const { user, signOut } = useAuth()
  const { locale, t } = useLocale()

  const nav = [
    { to: "/app", label: t.app.navHome, end: true },
    { to: "/app/courses", label: t.app.navCourses, end: false },
  ]

  const logoutLabel = locale === "zh" ? "退出" : "Log out"
  const displayName =
    user?.phone?.replace(/^\+86/, "") ||
    user?.email?.replace(/@phone\.rootgrammar\.local$/, "") ||
    user?.email ||
    ""

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-stone-50/95 backdrop-blur-md dark:border-white/5 dark:bg-[#0a0a0b]/95">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4">
        <Link to="/app" className="flex shrink-0 items-center gap-2">
          <img src="/logo-dark.svg" alt={t.brand} width={32} height={32} className="size-8" />
          <span className="font-bold text-stone-900 dark:text-white">{t.brand}</span>
        </Link>

        <nav className="flex items-center gap-1 text-sm font-medium">
          {nav.map((item) => {
            const active = item.end ? pathname === item.to : pathname.startsWith(item.to)
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`rounded-lg px-3 py-2 transition-colors ${
                  active
                    ? "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300"
                    : "text-stone-600 hover:text-stone-900 dark:text-gray-400 dark:hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-1.5">
          <LanguageToggle />
          <ThemeSwitcher />
          {displayName && (
            <span className="hidden max-w-[120px] truncate text-xs text-stone-500 sm:inline dark:text-gray-500">
              {displayName}
            </span>
          )}
          <button
            type="button"
            onClick={() => signOut()}
            className="ml-1 rounded-lg px-3 py-2 text-sm text-stone-600 transition-colors hover:bg-stone-200 hover:text-stone-900 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white"
          >
            {logoutLabel}
          </button>
        </div>
      </div>
    </header>
  )
}

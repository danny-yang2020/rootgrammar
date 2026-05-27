import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { useLocale } from "../context/LocaleContext"
import { useAuth } from "../context/AuthContext"
import { ThemeToggle } from "./ThemeToggle"
import { LanguageToggle } from "./LanguageToggle"

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === "/"
  const { t, locale } = useLocale()
  const { user, signOut, configured } = useAuth()
  const authLabel = locale === "zh" ? "登录" : "Log in"
  const logoutLabel = locale === "zh" ? "退出" : "Log out"

  const navLinks = [
    { label: t.nav.docs, href: "#" },
    { label: t.nav.learn, href: user ? "/app/courses" : "/auth" },
    { label: t.nav.changelog, href: "#" },
    { label: t.nav.features, href: "/#features" },
    { label: t.nav.faq, href: "/#faq" },
    { label: t.nav.contact, href: "/#contact" },
  ]

  const NavLink = ({ href, label, onClick }: { href: string; label: string; onClick?: () => void }) => {
    if (href.startsWith("/") && !href.includes("#")) {
      return (
        <Link
          to={href}
          onClick={onClick}
          className="whitespace-nowrap text-gray-800/90 transition-colors hover:text-gray-900 dark:text-gray-200/90 dark:hover:text-white"
        >
          {label}
        </Link>
      )
    }
    const path = isHome ? href : href.startsWith("#") ? `/${href}` : href
    return (
      <a
        href={path}
        onClick={onClick}
        className="whitespace-nowrap text-gray-800/90 transition-colors hover:text-gray-900 dark:text-gray-200/90 dark:hover:text-white"
      >
        {label}
      </a>
    )
  }

  const primaryCta = user ? "/app" : "/auth"
  const tryHref = user ? "/app/practice/beginner-01" : "/auth"

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md transition-colors dark:bg-[#0f0f10]/90">
      <div className="px-4 sm:px-8 lg:px-10">
        <div className="flex h-16 items-center">
          <Link to="/" className="flex shrink-0 items-center gap-2">
            <img
              src="/logo-dark.svg"
              alt={t.brand}
              width={36}
              height={36}
              className="block transition-transform duration-300 hover:rotate-12"
            />
            <span className="text-xl font-bold text-gray-900 dark:text-white">{t.brand}</span>
          </Link>

          <nav aria-label="Global" className="hidden flex-1 justify-center md:flex">
            <ul className="flex items-center text-[15px] font-medium">
              {navLinks.map((link) => (
                <li key={link.href + link.label} className="px-4">
                  <NavLink href={link.href} label={link.label} />
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-1 items-center justify-end gap-1 md:flex-none md:gap-2">
            <LanguageToggle />
            <ThemeToggle />
            <div className="hidden items-center gap-2 md:flex">
              {user ? (
                <>
                  <Link
                    to="/app"
                    className="h-8 rounded-md px-4 text-sm leading-8 text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                  >
                    {t.app.enterApp}
                  </Link>
                  <button
                    type="button"
                    onClick={() => signOut()}
                    className="h-8 rounded-md px-3 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                  >
                    {logoutLabel}
                  </button>
                </>
              ) : (
                configured && (
                  <Link
                    to="/auth"
                    className="h-8 rounded-md px-4 text-sm leading-8 text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                  >
                    {authLabel}
                  </Link>
                )
              )}
              <Link
                to={primaryCta}
                className="h-8 rounded-md px-4 text-sm leading-8 text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                {t.header.start}
              </Link>
              <Link
                to={tryHref}
                state={user ? undefined : { from: "/app/practice/beginner-01" }}
                className="h-8 rounded-md bg-purple-500 px-5 text-sm leading-8 text-white shadow transition-colors hover:bg-purple-600"
              >
                {t.header.tryFree}
              </Link>
            </div>
            <button
              type="button"
              aria-label={t.header.menu}
              className="-mr-[11px] flex size-11 items-center justify-center text-gray-600 transition-colors hover:text-gray-900 md:hidden dark:text-gray-400 dark:hover:text-white"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="size-[22px]" /> : <Menu className="size-[22px]" />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-gray-200 bg-white px-4 py-4 md:hidden dark:border-gray-800 dark:bg-[#0f0f10]">
          <ul className="space-y-3">
            {navLinks.map((link) => (
              <li key={link.href + link.label}>
                <NavLink href={link.href} label={link.label} onClick={() => setMenuOpen(false)} />
              </li>
            ))}
            <li className="flex flex-col gap-2 pt-2">
              {user ? (
                <>
                  <Link
                    to="/app"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-md bg-purple-500 py-2 text-center text-sm text-white"
                  >
                    {t.app.enterApp}
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      signOut()
                      setMenuOpen(false)
                    }}
                    className="rounded-md border border-gray-300 py-2 text-sm dark:border-gray-600"
                  >
                    {logoutLabel}
                  </button>
                </>
              ) : (
                configured && (
                  <Link
                    to="/auth"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-md border border-gray-300 py-2 text-center text-sm dark:border-gray-600"
                  >
                    {authLabel}
                  </Link>
                )
              )}
              <div className="flex gap-2">
                <Link
                  to={primaryCta}
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 rounded-md border border-gray-300 py-2 text-center text-sm dark:border-gray-600"
                >
                  {t.header.start}
                </Link>
                <Link
                  to={tryHref}
                  state={user ? undefined : { from: "/app/practice/beginner-01" }}
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 rounded-md bg-purple-500 py-2 text-center text-sm text-white"
                >
                  {t.header.tryFree}
                </Link>
              </div>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}

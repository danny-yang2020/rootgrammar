import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { detectLocale, messages, type Locale, type Messages } from "../i18n/messages"

interface LocaleContextValue {
  locale: Locale
  t: Messages
  setLocale: (locale: Locale) => void
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(detectLocale)
  const t = messages[locale]

  useEffect(() => {
    localStorage.setItem("locale", locale)
    document.documentElement.lang = locale === "zh" ? "zh-CN" : "en"
    document.title = t.meta.title
    const desc = document.querySelector('meta[name="description"]')
    if (desc) desc.setAttribute("content", t.meta.description)
  }, [locale, t])

  const setLocale = (next: Locale) => setLocaleState(next)

  return (
    <LocaleContext.Provider value={{ locale, t, setLocale }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider")
  return ctx
}

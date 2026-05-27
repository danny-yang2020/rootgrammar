import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

export type Theme = "light" | "dark" | "system"

interface ThemeContextValue {
  theme: Theme
  resolved: "light" | "dark"
  setTheme: (t: Theme) => void
  toggle: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function getSystemTheme(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

function resolveTheme(theme: Theme): "light" | "dark" {
  return theme === "system" ? getSystemTheme() : theme
}

function applyTheme(resolved: "light" | "dark") {
  document.documentElement.classList.toggle("dark", resolved === "dark")
  document.documentElement.style.colorScheme = resolved
  const meta = document.querySelector('meta[name="theme-color"]')
  meta?.setAttribute("content", resolved === "dark" ? "#0a0a0b" : "#f5f5f4")
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    const stored = localStorage.getItem("theme") as Theme | null
    if (stored === "light" || stored === "dark" || stored === "system") return stored
    return "system"
  })
  const [resolved, setResolved] = useState<"light" | "dark">(() => resolveTheme(theme))

  useEffect(() => {
    const next = resolveTheme(theme)
    setResolved(next)
    applyTheme(next)
    localStorage.setItem("theme", theme)
  }, [theme])

  useEffect(() => {
    if (theme !== "system") return
    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    const handler = () => {
      const next = getSystemTheme()
      setResolved(next)
      applyTheme(next)
    }
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [theme])

  const setTheme = (t: Theme) => setThemeState(t)
  const toggle = () =>
    setThemeState((prev) => {
      const current = resolveTheme(prev)
      return current === "dark" ? "light" : "dark"
    })

  return (
    <ThemeContext.Provider value={{ theme, resolved, setTheme, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider")
  return ctx
}

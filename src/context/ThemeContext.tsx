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

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => (localStorage.getItem("theme") as Theme) || "system")
  const [resolved, setResolved] = useState<"light" | "dark">("light")

  useEffect(() => {
    const resolvedTheme = theme === "system" ? getSystemTheme() : theme
    setResolved(resolvedTheme)
    document.documentElement.classList.toggle("dark", resolvedTheme === "dark")
    localStorage.setItem("theme", theme)
    const meta = document.querySelector('meta[name="theme-color"]')
    meta?.setAttribute("content", resolvedTheme === "dark" ? "#0a0a0b" : "#f5f5f4")
  }, [theme])

  useEffect(() => {
    if (theme !== "system") return
    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    const handler = () => setResolved(getSystemTheme())
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [theme])

  const setTheme = (t: Theme) => setThemeState(t)
  const toggle = () => setThemeState((prev) => {
    const current = prev === "system" ? getSystemTheme() : prev
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

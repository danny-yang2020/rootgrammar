import { Monitor, Moon, Sun } from "lucide-react"
import { useLocale } from "../context/LocaleContext"
import { useTheme, type Theme } from "../context/ThemeContext"

const options: { value: Theme; icon: typeof Sun }[] = [
  { value: "light", icon: Sun },
  { value: "dark", icon: Moon },
  { value: "system", icon: Monitor },
]

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const { locale } = useLocale()

  const labels: Record<Theme, string> =
    locale === "zh"
      ? { light: "浅色", dark: "深色", system: "系统" }
      : { light: "Light", dark: "Dark", system: "System" }

  return (
    <div
      className="flex rounded-lg border border-stone-200 bg-stone-100/80 p-0.5 dark:border-white/10 dark:bg-zinc-800/80"
      role="group"
      aria-label={locale === "zh" ? "主题" : "Theme"}
    >
      {options.map(({ value, icon: Icon }) => {
        const active = theme === value
        return (
          <button
            key={value}
            type="button"
            title={labels[value]}
            onClick={() => setTheme(value)}
            className={`flex size-8 items-center justify-center rounded-md transition-colors ${
              active
                ? "bg-white text-purple-600 shadow-sm dark:bg-zinc-700 dark:text-purple-300"
                : "text-stone-500 hover:text-stone-800 dark:text-gray-400 dark:hover:text-white"
            }`}
          >
            <Icon className="size-4" />
            <span className="sr-only">{labels[value]}</span>
          </button>
        )
      })}
    </div>
  )
}

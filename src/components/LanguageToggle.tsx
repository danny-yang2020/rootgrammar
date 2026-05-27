import { useLocale } from "../context/LocaleContext"
import type { Locale } from "../i18n/messages"

const options: { value: Locale; label: string }[] = [
  { value: "en", label: "EN" },
  { value: "zh", label: "中文" },
]

export function LanguageToggle() {
  const { locale, setLocale } = useLocale()

  return (
    <div
      className="flex rounded-md border border-stone-200 p-0.5 dark:border-gray-700"
      role="group"
      aria-label="Language"
    >
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => setLocale(opt.value)}
          className={`cursor-pointer rounded px-2 py-1 text-xs font-medium transition-colors ${
            locale === opt.value
              ? "bg-purple-500 text-white"
              : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

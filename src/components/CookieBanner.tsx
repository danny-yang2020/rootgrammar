import { useState } from "react"
import { useLocale } from "../context/LocaleContext"

export function CookieBanner() {
  const { t } = useLocale()
  const [visible, setVisible] = useState(() => !localStorage.getItem("cookie-consent"))

  if (!visible) return null

  const accept = (value: string) => {
    localStorage.setItem("cookie-consent", value)
    setVisible(false)
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 bg-white p-4 shadow-lg dark:border-gray-800 dark:bg-zinc-900 sm:px-6">
      <div className="mx-auto flex max-w-4xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {t.cookie.text}{" "}
          <a href="#" className="text-purple-600 underline dark:text-purple-400">
            {t.cookie.learnMore}
          </a>
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => accept("reject")}
            className="cursor-pointer rounded-lg px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            {t.cookie.reject}
          </button>
          <button
            type="button"
            onClick={() => accept("accept")}
            className="cursor-pointer rounded-lg bg-purple-500 px-4 py-2 text-sm text-white transition-colors hover:bg-purple-600"
          >
            {t.cookie.accept}
          </button>
        </div>
      </div>
    </div>
  )
}

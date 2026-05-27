import { Link } from "react-router-dom"
import { useLocale } from "../context/LocaleContext"

export function CTA() {
  const { t } = useLocale()

  return (
    <section className="flex flex-col items-center justify-center py-16 lg:py-32">
      <h2 className="text-center text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white lg:text-6xl xl:text-7xl">
        {t.cta.title}
      </h2>
      <Link
        to="/practice/beginner-01"
        className="mt-10 inline-flex h-9 items-center justify-center rounded-lg bg-purple-500 px-6 py-2.5 text-sm font-medium text-white shadow transition-colors hover:bg-purple-600"
      >
        {t.cta.button}
      </Link>
    </section>
  )
}

import { useEffect, useRef, useState } from "react"
import { CheckCheck, Clock, Flame, Users } from "lucide-react"
import { useLocale } from "../context/LocaleContext"
import { useCountUp } from "../hooks/useCountUp"

const iconMap = {
  users: Users,
  clock: Clock,
  check: CheckCheck,
  flame: Flame,
}

const iconColor = {
  users: "text-purple-400",
  clock: "text-emerald-400",
  check: "text-amber-400",
  flame: "text-rose-400",
}

function StatValue({
  value,
  suffix,
  animate,
}: {
  value: number
  suffix: string
  animate: boolean
}) {
  const count = useCountUp(value, 1800, animate)
  return (
    <>
      <span className="inline-block tabular-nums">{count.toLocaleString()}</span>
      {suffix}
    </>
  )
}

export function Stats() {
  const { locale, t } = useLocale()
  const ref = useRef<HTMLDListElement>(null)
  const [animate, setAnimate] = useState(false)

  const statItems = [
    { icon: "users" as const, label: t.stats.users, value: locale === "en" ? 700 : 70, suffix: t.stats.wan },
    { icon: "clock" as const, label: t.stats.hours, value: locale === "en" ? 1 : 100, suffix: locale === "en" ? "M+" : t.stats.wan },
    { icon: "check" as const, label: t.stats.completions, value: locale === "en" ? 45 : 4500, suffix: locale === "en" ? "M+" : t.stats.wan },
    { icon: "flame" as const, label: t.stats.avgSession, value: 42, suffix: t.stats.minutes },
  ]

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <dl ref={ref} className="mt-12 grid grid-cols-2 gap-2 px-2 md:grid-cols-4 md:gap-4 md:px-0">
      {statItems.map((stat, i) => {
        const Icon = iconMap[stat.icon]
        return (
          <div
            key={stat.label}
            className={`stat-card flex flex-col items-center rounded-lg border border-gray-200/60 px-2 py-3 md:rounded-xl md:px-4 md:py-5 dark:border-gray-700/60 ${
              animate ? "stat-card-visible" : "opacity-0"
            }`}
            style={{ "--stat-delay": `${i * 100}ms` } as React.CSSProperties}
          >
            <Icon className={`mb-1 size-4 md:mb-2 md:size-5 ${iconColor[stat.icon]}`} />
            <dt className="order-last mt-0.5 text-[11px] text-gray-500 md:mt-1 md:text-xs dark:text-gray-400">{stat.label}</dt>
            <dd className="text-sm font-bold text-gray-900 md:text-2xl dark:text-white">
              <StatValue value={stat.value} suffix={stat.suffix} animate={animate} />
            </dd>
          </div>
        )
      })}
    </dl>
  )
}

import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"

export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      type="button"
      aria-label="回到顶部"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-8 right-8 z-40 flex size-12 cursor-pointer items-center justify-center rounded-full bg-white shadow-lg ring-4 ring-purple-500/25 transition-all hover:w-36 hover:rounded-full dark:bg-[#1a1a1c] dark:ring-purple-500/30"
    >
      <ArrowUp className="size-5 text-gray-900 dark:text-white" />
      <span className="sr-only">回到顶部</span>
    </button>
  )
}

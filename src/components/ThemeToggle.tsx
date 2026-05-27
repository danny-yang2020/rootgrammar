import { Moon, Sun } from "lucide-react"
import { useTheme } from "../context/ThemeContext"

export function ThemeToggle() {
  const { resolved, toggle } = useTheme()

  return (
    <button
      type="button"
      aria-label={resolved === "dark" ? "切换到浅色模式" : "切换到深色模式"}
      onClick={toggle}
      className="flex size-9 cursor-pointer items-center justify-center rounded-md text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
    >
      {resolved === "dark" ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
    </button>
  )
}

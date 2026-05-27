import { Outlet } from "react-router-dom"
import { AppHeader } from "../components/app/AppHeader"

export function AppLayout() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 dark:bg-[#0a0a0b] dark:text-gray-300">
      <AppHeader />
      <Outlet />
    </div>
  )
}

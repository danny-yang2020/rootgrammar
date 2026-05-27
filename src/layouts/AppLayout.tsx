import { Outlet } from "react-router-dom"
import { AppHeader } from "../components/app/AppHeader"

export function AppLayout() {
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-gray-300">
      <AppHeader />
      <Outlet />
    </div>
  )
}

import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useLocale } from "../context/LocaleContext"

export function RequireAuth() {
  const { user, loading } = useAuth()
  const location = useLocation()
  const { locale } = useLocale()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a0b] text-gray-400">
        {locale === "zh" ? "加载中…" : "Loading…"}
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/auth" replace state={{ from: location.pathname }} />
  }

  return <Outlet />
}

import type { ReactNode } from "react"
import { Header } from "./Header"
import { CookieBanner } from "./CookieBanner"
import { BackToTop } from "./BackToTop"

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-slate-600 transition-colors dark:bg-[#0f0f10] dark:text-slate-300">
      <Header />
      {children}
      <CookieBanner />
      <BackToTop />
    </div>
  )
}

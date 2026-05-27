import { Outlet } from "react-router-dom"
import { SiteLayout } from "../components/SiteLayout"

export function MarketingLayout() {
  return (
    <SiteLayout>
      <Outlet />
    </SiteLayout>
  )
}

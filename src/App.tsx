import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { ThemeProvider } from "./context/ThemeContext"
import { LocaleProvider } from "./context/LocaleContext"
import { AuthProvider } from "./context/AuthContext"
import { ProgressProvider } from "./context/ProgressContext"
import { MarketingLayout } from "./layouts/MarketingLayout"
import { AppLayout } from "./layouts/AppLayout"
import { RequireAuth } from "./routes/RequireAuth"
import { RedirectLearn, RedirectPractice } from "./routes/LegacyRedirects"
import { HomePage } from "./pages/HomePage"
import { AuthPage } from "./pages/AuthPage"
import { AppHomePage } from "./pages/app/AppHomePage"
import { CoursesPage } from "./pages/app/CoursesPage"
import { AppPracticePage } from "./pages/app/AppPracticePage"

function App() {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <AuthProvider>
          <ProgressProvider>
            <BrowserRouter>
              <Routes>
                {/* Marketing site */}
                <Route element={<MarketingLayout />}>
                  <Route path="/" element={<HomePage />} />
                </Route>

                <Route path="/auth" element={<AuthPage />} />

                {/* Legacy URLs → new structure */}
                <Route path="/learn" element={<RedirectLearn />} />
                <Route path="/practice/:lessonId" element={<RedirectPractice />} />

                {/* Product app (login required) */}
                <Route element={<RequireAuth />}>
                  <Route path="/app" element={<AppLayout />}>
                    <Route index element={<AppHomePage />} />
                    <Route path="courses" element={<CoursesPage />} />
                  </Route>
                  <Route path="/app/practice/:lessonId" element={<AppPracticePage />} />
                </Route>

                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </BrowserRouter>
          </ProgressProvider>
        </AuthProvider>
      </LocaleProvider>
    </ThemeProvider>
  )
}

export default App

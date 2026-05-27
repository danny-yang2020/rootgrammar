import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ThemeProvider } from "./context/ThemeContext"
import { LocaleProvider } from "./context/LocaleContext"
import { AuthProvider } from "./context/AuthContext"
import { ProgressProvider } from "./context/ProgressContext"
import { HomePage } from "./pages/HomePage"
import { LearnPage } from "./pages/LearnPage"
import { PracticePage } from "./pages/PracticePage"
import { AuthPage } from "./pages/AuthPage"

function App() {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <AuthProvider>
          <ProgressProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/learn" element={<LearnPage />} />
                <Route path="/practice/:lessonId" element={<PracticePage />} />
                <Route path="/auth" element={<AuthPage />} />
              </Routes>
            </BrowserRouter>
          </ProgressProvider>
        </AuthProvider>
      </LocaleProvider>
    </ThemeProvider>
  )
}

export default App

import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ThemeProvider } from "./context/ThemeContext"
import { LocaleProvider } from "./context/LocaleContext"
import { ProgressProvider } from "./context/ProgressContext"
import { HomePage } from "./pages/HomePage"
import { LearnPage } from "./pages/LearnPage"
import { PracticePage } from "./pages/PracticePage"

function App() {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <ProgressProvider>
          <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/practice/:lessonId" element={<PracticePage />} />
          </Routes>
          </BrowserRouter>
        </ProgressProvider>
      </LocaleProvider>
    </ThemeProvider>
  )
}

export default App

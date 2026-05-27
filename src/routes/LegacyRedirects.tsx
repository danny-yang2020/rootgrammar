import { Navigate, useParams } from "react-router-dom"

export function RedirectLearn() {
  return <Navigate to="/app/courses" replace />
}

export function RedirectPractice() {
  const { lessonId } = useParams<{ lessonId: string }>()
  return <Navigate to={`/app/practice/${lessonId ?? ""}`} replace />
}

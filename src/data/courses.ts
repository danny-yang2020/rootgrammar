import type { Course, Lesson } from "../engine/types"
import { beginner01 } from "./lessons/beginner-01"
import { beginner02 } from "./lessons/beginner-02"
import { intermediate01 } from "./lessons/intermediate-01"

export const lessons: Record<string, Lesson> = {
  "beginner-01": beginner01,
  "beginner-02": beginner02,
  "intermediate-01": intermediate01,
}

export const courses: Course[] = [
  {
    id: "beginner",
    title: "零基础入门",
    titleEn: "Beginner Basics",
    description: "从单词到短句，建立连词成句的基本节奏。",
    descriptionEn: "From words to short sentences — build your typing rhythm.",
    level: "beginner",
    tags: ["免费", "入门"],
    tagsEn: ["Free", "Starter"],
    lessonIds: ["beginner-01", "beginner-02"],
    free: true,
  },
  {
    id: "intermediate",
    title: "中级场景",
    titleEn: "Real-world Scenarios",
    description: "旅行、职场等真实场景句型练习。",
    descriptionEn: "Travel, work, and everyday situations.",
    level: "intermediate",
    tags: ["场景", "进阶"],
    tagsEn: ["Scenarios", "Intermediate"],
    lessonIds: ["intermediate-01"],
    free: true,
  },
  {
    id: "daily",
    title: "每日一句",
    titleEn: "Daily Sentence",
    description: "精选地道表达，每天 5 分钟保持手感。",
    descriptionEn: "One idiomatic sentence a day — 5 minutes to stay sharp.",
    level: "beginner",
    tags: ["即将上线"],
    tagsEn: ["Coming soon"],
    lessonIds: [],
    free: true,
  },
]

export function getLesson(id: string): Lesson | undefined {
  return lessons[id]
}

export function getCourseLessons(courseId: string): Lesson[] {
  const course = courses.find((c) => c.id === courseId)
  if (!course) return []
  return course.lessonIds.map((id) => lessons[id]).filter(Boolean)
}

export const levelLabels = {
  beginner: "初级",
  intermediate: "中级",
  advanced: "高级",
} as const

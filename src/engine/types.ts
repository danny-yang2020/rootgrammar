export interface WordToken {
  en: string
  ipa?: string
  pos?: string
  cn?: string
}

export interface Sentence {
  id: string
  chinese: string
  /** Shown as the main prompt when UI language is English */
  promptEn?: string
  words: WordToken[]
}

export interface Lesson {
  id: string
  courseId: string
  title: string
  titleEn?: string
  description?: string
  descriptionEn?: string
  sentences: Sentence[]
}

export interface Course {
  id: string
  title: string
  titleEn?: string
  description: string
  descriptionEn?: string
  level: "beginner" | "intermediate" | "advanced"
  tags: string[]
  tagsEn?: string[]
  lessonIds: string[]
  free: boolean
}

export type PracticePhase = "typing" | "word-flash" | "sentence-done" | "lesson-done"

export interface PracticeStats {
  score: number
  combo: number
  maxCombo: number
  correctWords: number
  totalWords: number
  mistakes: number
}

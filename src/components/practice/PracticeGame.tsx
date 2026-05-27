import { useCallback, useEffect, useRef, useState } from "react"
import { Flame, Keyboard } from "lucide-react"
import type { Lesson } from "../../engine/types"
import { usePractice } from "../../engine/usePractice"
import { usePracticeSounds } from "../../hooks/usePracticeSounds"
import { useLocale } from "../../context/LocaleContext"
import { pickLocalized } from "../../i18n/helpers"

const posColors: Record<string, string> = {
  代: "bg-rose-500/80",
  动: "bg-violet-500/80",
  形: "bg-emerald-500/80",
  名: "bg-sky-500/80",
  介: "bg-amber-500/80",
  副: "bg-orange-500/80",
  叹: "bg-pink-500/80",
  冠: "bg-slate-500/80",
  助: "bg-indigo-500/80",
  数: "bg-teal-500/80",
}

interface PracticeGameProps {
  lesson: Lesson
  onLessonComplete: (score: number, accuracy: number) => void
  onExit: () => void
}

export function PracticeGame({ lesson, onLessonComplete, onExit }: PracticeGameProps) {
  const { locale, t } = useLocale()
  const inputRef = useRef<HTMLInputElement>(null)
  const [recorded, setRecorded] = useState(false)
  const { playType, playCorrect, playWrong, playSentence } = usePracticeSounds()
  const lessonTitle = pickLocalized(locale, lesson.title, lesson.titleEn)
  const {
    sentenceIndex,
    wordIndex,
    input,
    setInput,
    phase,
    shake,
    flashCorrect,
    stats,
    progress,
    currentSentence,
    totalSentences,
    totalWordsInLesson,
    submitWord,
    nextSentence,
    restart,
  } = usePractice({ lesson })

  useEffect(() => {
    if (phase === "lesson-done" && !recorded) {
      const accuracy = Math.round((stats.correctWords / totalWordsInLesson) * 100)
      onLessonComplete(stats.score, accuracy)
      setRecorded(true)
    }
  }, [phase, recorded, stats, totalWordsInLesson, onLessonComplete])

  useEffect(() => {
    inputRef.current?.focus()
  }, [sentenceIndex, wordIndex, phase])

  useEffect(() => {
    if (phase !== "sentence-done") return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault()
        playSentence()
        nextSentence()
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [phase, nextSentence, playSentence])

  const handleSubmit = useCallback(() => {
    if (phase === "sentence-done") {
      playSentence()
      nextSentence()
      return
    }
    if (phase !== "typing") return

    const result = submitWord()
    if (result === "correct") playCorrect()
    else if (result === "wrong") playWrong()
  }, [phase, submitWord, nextSentence, playCorrect, playWrong, playSentence])

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
      e.preventDefault()
      handleSubmit()
      return
    }
    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      playType()
    }
  }

  if (phase === "lesson-done") {
    const accuracy = Math.round((stats.correctWords / totalWordsInLesson) * 100)
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
        <div className="mb-2 text-6xl">🎉</div>
        <h2 className="text-3xl font-bold text-white md:text-4xl">{t.practice.lessonDone}</h2>
        <p className="mt-3 text-lg text-gray-400">{lessonTitle}</p>
        <dl className="mt-8 grid grid-cols-3 gap-6 text-center">
          <div>
            <dt className="text-sm text-gray-500">{t.practice.score}</dt>
            <dd className="text-3xl font-bold text-amber-400 tabular-nums">{stats.score.toLocaleString()}</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">{t.practice.accuracy}</dt>
            <dd className="text-3xl font-bold text-emerald-400 tabular-nums">{accuracy}%</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">{t.practice.maxCombo}</dt>
            <dd className="text-3xl font-bold text-purple-400 tabular-nums">{stats.maxCombo}</dd>
          </div>
        </dl>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              setRecorded(false)
              restart()
            }}
            className="rounded-lg border border-gray-600 px-6 py-3 text-base text-gray-200 transition-colors hover:bg-gray-800"
          >
            {t.practice.again}
          </button>
          <button
            type="button"
            onClick={onExit}
            className="rounded-lg bg-purple-500 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-purple-600"
          >
            {t.practice.backToCourses}
          </button>
        </div>
      </div>
    )
  }

  if (!currentSentence) return null

  return (
    <div className={`flex min-h-[70vh] flex-col ${shake ? "animate-shake" : ""}`}>
      <div className="flex items-center justify-between border-b border-white/5 px-4 py-3 text-sm text-gray-400">
        <span className="flex items-center gap-2">
          <Keyboard className="size-4" />
          {t.practice.keyboardHint} ({wordIndex + 1}/{currentSentence.words.length})
        </span>
        <div className="flex items-center gap-4 text-base">
          {stats.combo > 1 && (
            <span className="flex items-center gap-1 font-semibold text-orange-400">
              <Flame className="size-4" />
              {stats.combo}x
            </span>
          )}
          <span className="font-semibold text-amber-400 tabular-nums">{stats.score.toLocaleString()}</span>
        </div>
      </div>

      <div className="h-1.5 bg-gray-800">
        <div
          className="h-full bg-emerald-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-4 py-8">
        <p className="mb-8 text-sm text-gray-500 md:text-base">
          {locale === "en"
            ? `${t.practice.sentenceProgress} ${sentenceIndex + 1} / ${totalSentences}`
            : `${t.practice.sentenceProgress} ${sentenceIndex + 1} / ${totalSentences} 句`}
        </p>

        <div className="flex max-w-full flex-wrap items-end justify-center gap-3 md:gap-4">
          {currentSentence.words.map((word, i) => {
            const done = i < wordIndex
            const active = i === wordIndex
            const pos = word.pos ?? "名"
            return (
              <div
                key={`${word.en}-${i}`}
                className={`flex flex-col items-center gap-1.5 transition-opacity ${
                  i > wordIndex && phase === "typing" ? "opacity-30" : "opacity-100"
                }`}
              >
                {word.ipa && (
                  <span className="rounded bg-teal-500/20 px-2 py-0.5 font-mono text-xs text-teal-300 md:text-sm">
                    {word.ipa}
                  </span>
                )}
                <span
                  className={`text-2xl font-semibold md:text-4xl ${
                    done ? "text-emerald-400" : active ? "text-white" : "text-gray-500"
                  } ${active && flashCorrect ? "text-emerald-300" : ""}`}
                >
                  {done ? word.en : active ? input || "＿" : "···"}
                </span>
                <div className="flex flex-col items-center gap-1">
                  <span
                    className={`rounded px-2 py-0.5 text-xs font-medium text-white md:text-sm ${posColors[pos] ?? "bg-gray-600"}`}
                  >
                    {pos}
                  </span>
                  {word.cn && <span className="text-sm text-gray-500 md:text-base">{word.cn}</span>}
                </div>
              </div>
            )
          })}
        </div>

        {phase === "typing" && (
          <form
            className="mt-10 w-full max-w-md"
            onSubmit={(e) => {
              e.preventDefault()
              handleSubmit()
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleInputKeyDown}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              enterKeyHint="done"
              className="w-full border-b-2 border-purple-500/50 bg-transparent py-3 text-center text-2xl text-white outline-none focus:border-purple-400 md:text-3xl"
              placeholder=""
              aria-label={t.practice.inputLabel}
            />
          </form>
        )}

        {phase === "sentence-done" && (
          <div className="mt-10 text-center">
            <p className="text-xl font-semibold text-emerald-400 md:text-2xl">{t.practice.perfect}</p>
            <button
              type="button"
              onClick={() => {
                playSentence()
                nextSentence()
              }}
              className="mt-5 rounded-lg bg-purple-500 px-10 py-3 text-base font-medium text-white hover:bg-purple-600"
            >
              {sentenceIndex >= totalSentences - 1 ? t.practice.seeResults : t.practice.next}
            </button>
            <p className="mt-3 text-sm text-gray-500">{t.practice.ready}</p>
          </div>
        )}

        <p className="mt-12 max-w-2xl text-center text-xl text-gray-200 md:text-2xl">
          {locale === "en" && currentSentence.promptEn
            ? currentSentence.promptEn
            : currentSentence.chinese}
        </p>
      </div>
    </div>
  )
}

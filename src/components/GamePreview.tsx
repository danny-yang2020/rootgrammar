const words = [
  { en: "I", ipa: "/aɪ/", pos: "代", cn: "我", color: "bg-rose-500/80" },
  { en: "like", ipa: "/laɪk/", pos: "动", cn: "喜欢", color: "bg-violet-500/80" },
  { en: "to", ipa: "/tuː/", pos: "介", cn: "去", color: "bg-amber-500/80" },
  { en: "eat", ipa: "/iːt/", pos: "动", cn: "吃", color: "bg-violet-500/80" },
  { en: "fresh", ipa: "/freʃ/", pos: "形", cn: "新鲜的", color: "bg-emerald-500/80" },
  { en: "apples", ipa: "/ˈæplz/", pos: "名", cn: "苹果", color: "bg-sky-500/80" },
  { en: "every", ipa: "/ˈevri/", pos: "形", cn: "每个", color: "bg-emerald-500/80" },
  { en: "morning", ipa: "/ˈmɔːnɪŋ/", pos: "名", cn: "早晨", color: "bg-sky-500/80" },
]

export function GamePreview() {
  return (
    <div className="flex min-h-[clamp(480px,65vh,680px)] flex-col overflow-hidden rounded-2xl border border-gray-200/60 bg-[#0a0a0b] shadow-2xl dark:border-gray-700/60">
      <div className="flex items-center justify-between border-b border-white/5 px-4 py-3 text-xs text-gray-400">
        <span>感受一下连词成句的魅力 · 用键盘输入英文，按回车确认 (9/9)</span>
        <span className="font-semibold text-amber-400 tabular-nums">10,500</span>
      </div>
      <div className="h-1 bg-gray-800">
        <div className="h-full w-full bg-emerald-500" />
      </div>
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-8">
        <div className="flex flex-wrap items-end justify-center gap-3 md:gap-4">
          {words.map((w) => (
            <div key={w.en} className="flex flex-col items-center gap-1">
              <span className="rounded bg-teal-500/20 px-1.5 py-0.5 font-mono text-[10px] text-teal-300">{w.ipa}</span>
              <span className="text-2xl font-medium text-white md:text-3xl">{w.en}</span>
              <div className="flex flex-col items-center gap-0.5">
                <span className={`rounded px-1.5 py-0.5 text-[10px] font-medium text-white ${w.color}`}>{w.pos}</span>
                <span className="text-[11px] text-gray-400">{w.cn}</span>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-10 text-center text-sm text-gray-300 md:text-base">
          我喜欢每天早上吃新鲜的苹果。
        </p>
      </div>
      <div className="border-t border-white/5 px-4 py-2 text-center text-[11px] text-gray-500">
        输入框已就绪 · 按 Enter 提交答案
      </div>
    </div>
  )
}

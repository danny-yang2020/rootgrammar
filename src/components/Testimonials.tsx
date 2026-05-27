import { testimonials } from "../data/content"

export function Testimonials() {
  return (
    <section className="pt-24">
      <h2 className="scroll-reveal text-center text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white lg:text-4xl xl:text-5xl">
        听听他们怎么说
      </h2>
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 lg:mt-16">
        {testimonials.map((t, i) => (
          <blockquote
            key={t.name}
            className="scroll-reveal flex flex-col justify-between rounded-2xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-800/60 dark:bg-zinc-900 lg:p-8"
            style={{ transitionDelay: `${(i % 3) * 100}ms` }}
          >
            <div>
              <span className="inline-block rounded-full bg-purple-50 px-2.5 py-0.5 text-[11px] font-medium text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                {t.tag}
              </span>
            </div>
            <p className="mt-3 text-base leading-relaxed text-gray-700 dark:text-gray-200 lg:text-lg">{t.quote}</p>
            <div className="mt-8 flex items-center gap-3">
              <img src={t.avatar} alt={t.name} width={40} height={40} loading="lazy" className="size-10 rounded-full object-cover" />
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{t.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{t.role}</p>
              </div>
            </div>
          </blockquote>
        ))}
      </div>
    </section>
  )
}

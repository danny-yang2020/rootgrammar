import { ChevronRight } from "lucide-react"
import { faqs } from "../data/content"

export function FAQ() {
  return (
    <div className="mt-24 bg-gray-100 py-16 dark:bg-zinc-900 lg:py-24">
      <div className="mx-auto max-w-[1300px] px-4 sm:px-6 lg:px-[30px]">
        <section id="faq" className="overflow-hidden text-gray-600">
          <div className="mx-auto my-5 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white lg:text-4xl xl:text-5xl">
              常见问题
            </h2>
          </div>
          <div className="mx-auto max-w-3xl divide-y divide-gray-200 py-10 dark:divide-gray-800">
            {faqs.map((faq) => (
              <details key={faq.question} className="group" open={faq.open}>
                <summary className="flex cursor-pointer list-none items-center justify-between py-5 [&::-webkit-details-marker]:hidden">
                  <span className="text-base font-medium text-gray-900 dark:text-gray-300 lg:text-lg">{faq.question}</span>
                  <ChevronRight className="icon size-6 shrink-0 text-gray-500 transition-transform duration-300 group-open:rotate-90 dark:text-gray-400" />
                </summary>
                <div className="mb-4 overflow-hidden text-gray-600 dark:text-gray-400">
                  <p className="py-2 text-sm lg:text-base">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

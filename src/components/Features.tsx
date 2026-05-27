import { useState } from "react"
import { features } from "../data/content"

function ImageCarousel({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0)
  const hasMultiple = images.length > 1

  return (
    <div className="relative">
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-lg">
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`${alt} - ${i + 1}`}
            width={800}
            height={600}
            loading={i === 0 ? "eager" : "lazy"}
            className={`absolute inset-0 size-full object-cover transition-opacity duration-700 ease-in-out ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>
      {hasMultiple && (
        <div className="mt-3 flex justify-center gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`切换到第 ${i + 1} 张图片`}
              onClick={() => setActive(i)}
              className={`box-content size-2 rounded-full p-2 bg-clip-content transition-colors ${
                i === active ? "bg-purple-500" : "bg-gray-300 dark:bg-gray-600"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export function Features() {
  return (
    <div id="features" className="w-full pt-16 lg:pt-24">
      <h2 className="text-center text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white lg:text-4xl xl:text-5xl">
        为什么选句乐部
      </h2>
      <section className="mt-12 space-y-10 lg:mt-16 lg:space-y-20">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="scroll-reveal rounded-2xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-800/60 dark:bg-zinc-900 lg:p-8"
          >
            <div
              className={`flex flex-col gap-6 lg:items-center lg:gap-8 ${
                feature.reverse ? "lg:flex-row-reverse" : "lg:flex-row"
              }`}
            >
              <div className="shrink-0 lg:w-[25%]">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white lg:text-[28px] lg:leading-tight">
                  {feature.title}
                </h3>
                <p className="mt-5 text-base leading-relaxed text-gray-500 dark:text-gray-300 lg:text-lg">
                  {feature.description}
                </p>
              </div>
              <div className="flex-1">
                {feature.images.length > 1 ? (
                  <ImageCarousel images={feature.images} alt={feature.title} />
                ) : (
                  <img
                    src={feature.images[0]}
                    alt={feature.title}
                    width={800}
                    height={600}
                    loading="lazy"
                    className="w-full rounded-xl shadow-lg"
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}

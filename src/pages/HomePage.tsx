import { SiteLayout } from "../components/SiteLayout"
import { Hero } from "../components/Hero"
import { Stats } from "../components/Stats"
import { Features } from "../components/Features"
import { Testimonials } from "../components/Testimonials"
import { FAQ } from "../components/FAQ"
import { CTA } from "../components/CTA"
import { Footer } from "../components/Footer"
import { useScrollReveal } from "../hooks/useScrollReveal"

export function HomePage() {
  useScrollReveal()

  return (
    <SiteLayout>
      <main className="mx-auto max-w-[1300px] px-4 sm:px-6 lg:px-[30px]">
        <Hero />
        <Stats />
        <Features />
        <Testimonials />
      </main>
      <FAQ />
      <div className="flex flex-col lg:min-h-[80vh]">
        <CTA />
        <Footer />
      </div>
    </SiteLayout>
  )
}

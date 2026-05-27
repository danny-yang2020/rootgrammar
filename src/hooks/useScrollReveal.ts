import { useEffect } from "react"

export function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll(".scroll-reveal")
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    )
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

export function useStatCards() {
  useEffect(() => {
    const cards = document.querySelectorAll(".stat-card")
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("stat-card-visible")
          }
        })
      },
      { threshold: 0.2 },
    )
    cards.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

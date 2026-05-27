import type { Locale } from "./messages"

export function pickLocalized(locale: Locale, zh: string, en?: string): string {
  return locale === "en" && en ? en : zh
}

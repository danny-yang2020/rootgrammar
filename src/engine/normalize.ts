/** Normalize user input for comparison */
export function normalizeWord(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/['']/g, "'")
    .replace(/[.,!?;:"]/g, "")
}

export function wordsMatch(expected: string, actual: string): boolean {
  return normalizeWord(expected) === normalizeWord(actual)
}

export function sentenceToEnglish(words: { en: string }[]): string {
  return words.map((w) => w.en).join(" ")
}

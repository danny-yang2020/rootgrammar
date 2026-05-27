import { createHash, randomInt } from "node:crypto"

export function normalizeChinaPhone(input: string): string | null {
  const digits = input.replace(/\D/g, "")
  if (digits.length === 11 && digits.startsWith("1")) {
    return `+86${digits}`
  }
  if (digits.length === 13 && digits.startsWith("86")) {
    return `+${digits}`
  }
  if (input.startsWith("+86") && digits.length === 13) {
    return `+${digits}`
  }
  return null
}

export function generateOtp(): string {
  return String(randomInt(100000, 1000000))
}

export function hashOtp(code: string, secret: string): string {
  return createHash("sha256").update(`${secret}:${code}`).digest("hex")
}

export function phoneToSyntheticEmail(phone: string): string {
  const digits = phone.replace(/\D/g, "")
  return `p${digits}@phone.rootgrammar.local`
}

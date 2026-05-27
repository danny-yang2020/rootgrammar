import { createClient, type SupabaseClient } from "@supabase/supabase-js"

function cleanEnv(value: string | undefined): string {
  if (!value) return ""
  let v = value.trim()
  // Common mistake: pasted whole line "VITE_SUPABASE_URL=https://..."
  const urlLine = v.match(/VITE_SUPABASE_URL\s*=\s*(\S+)/i)
  if (urlLine) v = urlLine[1]
  const keyLine = v.match(/VITE_SUPABASE_(?:PUBLISHABLE_KEY|ANON_KEY)\s*=\s*(\S+)/i)
  if (keyLine) v = keyLine[1]
  return v.replace(/^["']|["']$/g, "")
}

function normalizeSupabaseUrl(raw: string | undefined): string | null {
  const v = cleanEnv(raw)
  if (!v) return null
  let candidate = v
  if (!/^https?:\/\//i.test(candidate) && candidate.includes("supabase.co")) {
    candidate = `https://${candidate.replace(/^\/+/, "")}`
  }
  try {
    const parsed = new URL(candidate)
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return null
    return parsed.origin
  } catch {
    return null
  }
}

function normalizeKey(raw: string | undefined): string | null {
  const v = cleanEnv(raw)
  if (!v || v.length < 20) return null
  return v
}

const url = normalizeSupabaseUrl(import.meta.env.VITE_SUPABASE_URL)
const key = normalizeKey(
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY,
)

export const isSupabaseConfigured = Boolean(url && key)

export const supabase: SupabaseClient | null =
  url && key ? createClient(url, key) : null

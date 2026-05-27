import type { VercelRequest, VercelResponse } from "@vercel/node"

function normalizeUrl(raw: string | undefined): string | null {
  if (!raw) return null
  let v = raw.trim().replace(/^["']|["']$/g, "")
  if (!/^https?:\/\//i.test(v) && v.includes("supabase.co")) {
    v = `https://${v.replace(/^\/+/, "")}`
  }
  try {
    const u = new URL(v)
    if (u.protocol !== "http:" && u.protocol !== "https:") return null
    return u.origin
  } catch {
    return null
  }
}

export default function handler(_req: VercelRequest, res: VercelResponse) {
  const rawUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL
  const url = normalizeUrl(rawUrl)
  const serviceKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SB_SECRET_KEY

  return res.status(200).json({
    ok: true,
    hasSupabaseUrl: Boolean(rawUrl),
    supabaseUrlValid: Boolean(url),
    supabaseUrlHint: url ?? "VITE_SUPABASE_URL 应为 https://xxxx.supabase.co（不要带引号或整行粘贴）",
    hasServiceKey: Boolean(serviceKey),
    smsDevMode: process.env.SMS_DEV_MODE === "true",
  })
}

import type { VercelRequest, VercelResponse } from "@vercel/node"

export default function handler(_req: VercelRequest, res: VercelResponse) {
  const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL
  const serviceKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SB_SECRET_KEY

  return res.status(200).json({
    ok: true,
    hasSupabaseUrl: Boolean(url),
    hasServiceKey: Boolean(serviceKey),
    smsDevMode: process.env.SMS_DEV_MODE === "true",
  })
}

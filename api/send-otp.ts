import type { VercelRequest, VercelResponse } from "@vercel/node"
import { generateOtp, hashOtp, normalizeChinaPhone } from "./_lib/phone"
import { getOtpSecret, getSupabaseAdmin } from "./_lib/supabase-admin"

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  if (!(process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL)) {
    return res.status(500).json({ error: "Vercel 缺少 VITE_SUPABASE_URL，请添加后 Redeploy" })
  }
  if (
    !process.env.SUPABASE_SERVICE_ROLE_KEY &&
    !process.env.SUPABASE_SECRET_KEY &&
    !process.env.SB_SECRET_KEY
  ) {
    return res
      .status(500)
      .json({ error: "Vercel 缺少 SUPABASE_SERVICE_ROLE_KEY（sb_secret_），请添加后 Redeploy" })
  }

  const phone = normalizeChinaPhone(String(req.body?.phone ?? ""))
  if (!phone) {
    return res.status(400).json({ error: "请输入正确的 11 位中国大陆手机号" })
  }

  const otpSecret = getOtpSecret()
  if (!otpSecret) {
    return res.status(500).json({ error: "Server misconfigured: OTP_SECRET" })
  }

  try {
    const admin = getSupabaseAdmin()

    const oneMinuteAgo = new Date(Date.now() - 60_000).toISOString()
    const { data: recent } = await admin
      .from("phone_otps")
      .select("created_at")
      .eq("phone", phone)
      .gte("created_at", oneMinuteAgo)
      .limit(1)

    if (recent && recent.length > 0) {
      return res.status(429).json({ error: "发送太频繁，请 60 秒后再试" })
    }

    const code = generateOtp()
    const codeHash = hashOtp(code, otpSecret)
    const expiresAt = new Date(Date.now() + 5 * 60_000).toISOString()

    const { error: insertError } = await admin.from("phone_otps").insert({
      phone,
      code_hash: codeHash,
      expires_at: expiresAt,
    })
    if (insertError) {
      console.error(insertError)
      return res.status(500).json({ error: "保存验证码失败，请确认已运行 supabase/schema-phone.sql" })
    }

    const devMode = process.env.SMS_DEV_MODE === "true"

    if (!devMode) {
      // Production: plug Alibaba / Tencent SMS here (see docs/SMS-CHINA.md)
      console.log(`[SMS] OTP for ${phone}: ${code} (configure SMS provider to send for real)`)
    }

    const payload: Record<string, unknown> = { ok: true, message: "验证码已发送" }
    if (devMode) {
      payload.devCode = code
      payload.devNote = "开发模式：验证码显示在页面上，上线前请关闭 SMS_DEV_MODE"
    }

    return res.status(200).json(payload)
  } catch (e) {
    console.error(e)
    const msg = e instanceof Error ? e.message : "发送失败，请稍后重试"
    return res.status(500).json({ error: msg })
  }
}

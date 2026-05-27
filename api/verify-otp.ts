import type { VercelRequest, VercelResponse } from "@vercel/node"
import { hashOtp, normalizeChinaPhone } from "./_lib/phone"
import {
  createSessionForPhoneUser,
  ensurePhoneAccount,
  getOtpSecret,
  getSupabaseAdmin,
} from "./_lib/supabase-admin"

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const phone = normalizeChinaPhone(String(req.body?.phone ?? ""))
  const code = String(req.body?.code ?? "").trim()
  if (!phone) {
    return res.status(400).json({ error: "手机号格式不正确" })
  }
  if (!/^\d{6}$/.test(code)) {
    return res.status(400).json({ error: "请输入 6 位验证码" })
  }

  const otpSecret = getOtpSecret()
  if (!otpSecret) {
    return res.status(500).json({ error: "Server misconfigured" })
  }

  try {
    const admin = getSupabaseAdmin()
    const codeHash = hashOtp(code, otpSecret)

    const { data: rows, error: fetchError } = await admin
      .from("phone_otps")
      .select("id, expires_at")
      .eq("phone", phone)
      .eq("code_hash", codeHash)
      .order("created_at", { ascending: false })
      .limit(1)

    if (fetchError || !rows?.length) {
      return res.status(400).json({ error: "验证码错误或已过期" })
    }

    if (new Date(rows[0].expires_at) < new Date()) {
      return res.status(400).json({ error: "验证码已过期，请重新获取" })
    }

    await admin.from("phone_otps").delete().eq("id", rows[0].id)

    await ensurePhoneAccount(admin, phone)
    const session = await createSessionForPhoneUser(phone)

    return res.status(200).json({
      access_token: session.access_token,
      refresh_token: session.refresh_token,
      expires_in: session.expires_in,
    })
  } catch (e) {
    console.error(e)
    const msg = e instanceof Error ? e.message : "登录失败，请稍后重试"
    return res.status(500).json({ error: msg })
  }
}

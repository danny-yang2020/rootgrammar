import { createClient, type User } from "@supabase/supabase-js"
import { phoneToSyntheticEmail } from "./phone"

export function getServiceKey(): string | undefined {
  return (
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SB_SECRET_KEY
  )
}

function getProjectUrl(): string | undefined {
  return process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL
}

function getPublishableKey(): string | undefined {
  return (
    process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
    process.env.VITE_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_ANON_KEY
  )
}

export function getOtpSecret(): string | undefined {
  return process.env.OTP_SECRET || getServiceKey()
}

export function phoneLoginPassword(phone: string): string {
  const secret = getOtpSecret()
  if (!secret) throw new Error("Missing OTP secret")
  return `${secret.slice(0, 16)}_${phone.replace(/\D/g, "")}`
}

export function getSupabaseAdmin() {
  const url = getProjectUrl()
  const serviceKey = getServiceKey()
  if (!url || !serviceKey) {
    throw new Error("Missing SUPABASE_URL or server secret key (service_role / sb_secret)")
  }
  return createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}

export async function findUserByPhone(admin: ReturnType<typeof getSupabaseAdmin>, phone: string) {
  let page = 1
  while (page <= 10) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage: 200 })
    if (error) throw error
    const users = data.users as User[]
    const found = users.find((u) => u.phone === phone)
    if (found) return found
    if (users.length < 200) break
    page += 1
  }
  return null
}

/** Create a client session after OTP verified (uses synthetic email + server-side password). */
export async function createSessionForPhoneUser(phone: string) {
  const url = getProjectUrl()
  const publishableKey = getPublishableKey()
  if (!url || !publishableKey) {
    throw new Error("缺少 VITE_SUPABASE_PUBLISHABLE_KEY，请在 Vercel 添加后 Redeploy")
  }

  const email = phoneToSyntheticEmail(phone)
  const password = phoneLoginPassword(phone)
  const client = createClient(url, publishableKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })

  const { data, error } = await client.auth.signInWithPassword({ email, password })
  if (error) {
    throw new Error(error.message)
  }
  if (!data.session) {
    throw new Error("无法创建登录会话")
  }

  return {
    access_token: data.session.access_token,
    refresh_token: data.session.refresh_token,
    expires_in: data.session.expires_in ?? 3600,
  }
}

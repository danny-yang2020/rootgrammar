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

async function listAllUsers(admin: ReturnType<typeof getSupabaseAdmin>): Promise<User[]> {
  const all: User[] = []
  let page = 1
  while (page <= 10) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage: 200 })
    if (error) throw error
    const users = data.users as User[]
    all.push(...users)
    if (users.length < 200) break
    page += 1
  }
  return all
}

export async function findUserByPhone(admin: ReturnType<typeof getSupabaseAdmin>, phone: string) {
  const digits = phone.replace(/\D/g, "")
  return (
    (await listAllUsers(admin)).find(
      (u) => u.phone === phone || u.user_metadata?.phone === phone || u.user_metadata?.phone_display === phone,
    ) ?? null
  )
}

export async function findUserBySyntheticEmail(
  admin: ReturnType<typeof getSupabaseAdmin>,
  email: string,
) {
  return (await listAllUsers(admin)).find((u) => u.email?.toLowerCase() === email.toLowerCase()) ?? null
}

/** First-time phone login: create or repair auth user, then caller signs in. */
export async function ensurePhoneAccount(admin: ReturnType<typeof getSupabaseAdmin>, phone: string) {
  const email = phoneToSyntheticEmail(phone)
  const password = phoneLoginPassword(phone)

  const url = getProjectUrl()
  const publishableKey = getPublishableKey()
  if (!url || !publishableKey) {
    throw new Error("缺少 VITE_SUPABASE_PUBLISHABLE_KEY，请在 Vercel 添加后 Redeploy")
  }

  const probe = createClient(url, publishableKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
  const { error: signInError } = await probe.auth.signInWithPassword({ email, password })
  if (!signInError) return

  const { error: createError } = await admin.auth.admin.createUser({
    email,
    email_confirm: true,
    password,
    user_metadata: { login_method: "phone", phone, phone_display: phone },
  })

  if (!createError) return

  const msg = createError.message.toLowerCase()
  const exists =
    msg.includes("already") || msg.includes("registered") || msg.includes("exists") || msg.includes("duplicate")

  if (!exists) {
    throw new Error(`创建账号失败：${createError.message}`)
  }

  const existing =
    (await findUserBySyntheticEmail(admin, email)) ?? (await findUserByPhone(admin, phone))
  if (!existing) {
    throw new Error("账号可能已存在但无法关联，请在 Supabase → Users 删除该手机相关用户后重试")
  }

  const { error: updateError } = await admin.auth.admin.updateUserById(existing.id, {
    password,
    email_confirm: true,
    user_metadata: { ...existing.user_metadata, login_method: "phone", phone, phone_display: phone },
  })
  if (updateError) {
    throw new Error(`更新账号失败：${updateError.message}`)
  }
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

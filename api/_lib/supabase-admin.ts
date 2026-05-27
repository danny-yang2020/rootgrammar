import { createClient, type User } from "@supabase/supabase-js"

export function getServiceKey(): string | undefined {
  return (
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SB_SECRET_KEY
  )
}

export function getSupabaseAdmin() {
  const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL
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

export async function createSessionForUser(
  admin: ReturnType<typeof getSupabaseAdmin>,
  userId: string,
) {
  const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL
  const serviceKey = getServiceKey()
  if (!url || !serviceKey) {
    throw new Error("Missing SUPABASE_URL or server secret key")
  }
  const res = await fetch(`${url}/auth/v1/admin/users/${userId}/sessions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${serviceKey}`,
      apikey: serviceKey,
      "Content-Type": "application/json",
    },
  })
  const body = (await res.json()) as {
    message?: string
    error_description?: string
    access_token?: string
    refresh_token?: string
    expires_in?: number
    token_type?: string
    user?: unknown
  }
  if (!res.ok) {
    throw new Error(body.message || body.error_description || "Failed to create session")
  }
  return body as {
    access_token: string
    refresh_token: string
    expires_in: number
    token_type: string
    user: unknown
  }
}

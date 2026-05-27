const API_BASE = import.meta.env.DEV ? "" : ""

export async function sendPhoneOtp(phone: string) {
  const res = await fetch(`${API_BASE}/api/send-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || "发送失败")
  return data as { ok: boolean; devCode?: string; devNote?: string; message?: string }
}

export async function verifyPhoneOtp(phone: string, code: string) {
  const res = await fetch(`${API_BASE}/api/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone, code }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || "验证失败")
  return data as { access_token: string; refresh_token: string }
}

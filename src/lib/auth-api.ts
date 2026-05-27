const API_BASE = import.meta.env.DEV ? "" : ""

async function parseResponse(res: Response) {
  const text = await res.text()
  try {
    return JSON.parse(text) as Record<string, unknown>
  } catch {
    if (text.includes("<!DOCTYPE") || text.includes("<html")) {
      throw new Error(
        "接口返回了网页而不是数据。请确认已 push 最新代码并 Redeploy（见下方说明）。",
      )
    }
    throw new Error(text.slice(0, 150) || `请求失败 (${res.status})`)
  }
}

export async function sendPhoneOtp(phone: string) {
  const res = await fetch(`${API_BASE}/api/send-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone }),
  })
  const data = await parseResponse(res)
  if (!res.ok) throw new Error(String(data.error || "发送失败"))
  return data as { ok: boolean; devCode?: string; devNote?: string; message?: string }
}

export async function verifyPhoneOtp(phone: string, code: string) {
  const res = await fetch(`${API_BASE}/api/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone, code }),
  })
  const data = await parseResponse(res)
  if (!res.ok) throw new Error(String(data.error || "验证失败"))
  return data as { access_token: string; refresh_token: string }
}

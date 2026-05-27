import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useLocale } from "../context/LocaleContext"
import { SiteLayout } from "../components/SiteLayout"

type AuthTab = "phone" | "email"

export function AuthPage() {
  const { user, signIn, signUp, signInWithPhone, sendPhoneCode, configured, loading: authLoading } = useAuth()
  const { locale } = useLocale()
  const navigate = useNavigate()
  const location = useLocation()
  const afterLogin = (location.state as { from?: string } | null)?.from ?? "/app"
  const [tab, setTab] = useState<AuthTab>(locale === "zh" ? "phone" : "email")
  const [emailMode, setEmailMode] = useState<"login" | "register">("login")
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [cooldown, setCooldown] = useState(0)
  const [devCode, setDevCode] = useState<string | null>(null)

  useEffect(() => {
    if (!authLoading && user) {
      navigate(afterLogin, { replace: true })
    }
  }, [user, authLoading, navigate, afterLogin])

  useEffect(() => {
    if (cooldown <= 0) return
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000)
    return () => clearTimeout(t)
  }, [cooldown])

  const zh = locale === "zh"

  const copy = zh
    ? {
        title: "登录 / 注册",
        phoneTab: "手机号",
        emailTab: "邮箱",
        phone: "手机号",
        phonePlaceholder: "11 位中国大陆手机号",
        otp: "验证码",
        sendCode: "获取验证码",
        resend: "秒后重发",
        phoneSubmit: "登录",
        email: "邮箱",
        password: "密码（至少 6 位）",
        emailSubmit: emailMode === "login" ? "登录" : "注册",
        emailSwitch: emailMode === "login" ? "没有账号？用邮箱注册" : "已有账号？登录",
        back: "返回首页",
        notConfigured: "请配置 Supabase（见 supabase/SETUP.md）",
        checkEmail: "注册成功！请查收邮件确认（若已关闭验证可直接登录）",
        devHint: "开发模式验证码：",
      }
    : {
        title: "Log in / Sign up",
        phoneTab: "Phone",
        emailTab: "Email",
        phone: "Phone (China +86)",
        phonePlaceholder: "11-digit mobile number",
        otp: "Verification code",
        sendCode: "Send code",
        resend: "s to resend",
        phoneSubmit: "Continue",
        email: "Email",
        password: "Password (min 6 characters)",
        emailSubmit: emailMode === "login" ? "Log in" : "Sign up",
        emailSwitch: emailMode === "login" ? "Sign up with email" : "Log in with email",
        back: "Back to home",
        notConfigured: "Configure Supabase (see supabase/SETUP.md)",
        checkEmail: "Check your email to confirm your account.",
        devHint: "Dev verification code:",
      }

  const handleSendCode = async () => {
    setMessage(null)
    setDevCode(null)
    setLoading(true)
    const { error, devCode: code } = await sendPhoneCode(phone)
    setLoading(false)
    if (error) {
      setMessage(error)
      return
    }
    setCooldown(60)
    if (code) setDevCode(code)
    setMessage(zh ? "验证码已发送" : "Code sent")
  }

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)
    setLoading(true)
    const { error } = await signInWithPhone(phone, otp)
    setLoading(false)
    if (error) {
      setMessage(error)
      return
    }
    navigate(afterLogin, { replace: true })
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)
    setLoading(true)
    const fn = emailMode === "login" ? signIn : signUp
    const { error } = await fn(email.trim(), password)
    setLoading(false)
    if (error) {
      setMessage(error)
      return
    }
    if (emailMode === "register") {
      setMessage(copy.checkEmail)
      return
    }
    navigate(afterLogin, { replace: true })
  }

  return (
    <SiteLayout>
      <div className="mx-auto max-w-md px-4 py-16">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{copy.title}</h1>
        {!configured && (
          <p className="mt-3 rounded-lg bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
            {copy.notConfigured}
          </p>
        )}

        <div className="mt-6 flex rounded-lg border border-gray-200 p-1 dark:border-gray-700">
          <button
            type="button"
            onClick={() => setTab("phone")}
            className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
              tab === "phone"
                ? "bg-purple-500 text-white"
                : "text-gray-600 hover:text-gray-900 dark:text-gray-400"
            }`}
          >
            {copy.phoneTab}
          </button>
          <button
            type="button"
            onClick={() => setTab("email")}
            className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
              tab === "email"
                ? "bg-purple-500 text-white"
                : "text-gray-600 hover:text-gray-900 dark:text-gray-400"
            }`}
          >
            {copy.emailTab}
          </button>
        </div>

        {tab === "phone" ? (
          <form onSubmit={handlePhoneSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{copy.phone}</label>
              <div className="mt-1 flex">
                <span className="inline-flex items-center rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-600 dark:border-gray-600 dark:bg-zinc-800 dark:text-gray-300">
                  +86
                </span>
                <input
                  type="tel"
                  inputMode="numeric"
                  maxLength={11}
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 11))}
                  placeholder={copy.phonePlaceholder}
                  className="w-full rounded-r-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-zinc-900 dark:text-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{copy.otp}</label>
              <div className="mt-1 flex gap-2">
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  className="flex-1 rounded-lg border border-gray-300 px-3 py-2 tracking-widest dark:border-gray-600 dark:bg-zinc-900 dark:text-white"
                />
                <button
                  type="button"
                  disabled={loading || cooldown > 0 || phone.length < 11}
                  onClick={handleSendCode}
                  className="shrink-0 rounded-lg border border-purple-500 px-3 py-2 text-sm text-purple-600 hover:bg-purple-50 disabled:opacity-50 dark:text-purple-400 dark:hover:bg-purple-900/20"
                >
                  {cooldown > 0 ? `${cooldown}${copy.resend}` : copy.sendCode}
                </button>
              </div>
            </div>
            {devCode && (
              <p className="rounded-lg bg-blue-50 p-3 text-sm text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
                {copy.devHint} <strong className="font-mono">{devCode}</strong>
              </p>
            )}
            {message && (
              <p className={`text-sm ${message.includes("成功") || message.includes("sent") ? "text-emerald-600" : "text-red-600"}`}>
                {message}
              </p>
            )}
            <button
              type="submit"
              disabled={loading || !configured || otp.length < 6}
              className="w-full rounded-lg bg-purple-500 py-2.5 text-sm font-medium text-white hover:bg-purple-600 disabled:opacity-50"
            >
              {loading ? "..." : copy.phoneSubmit}
            </button>
          </form>
        ) : (
          <form onSubmit={handleEmailSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{copy.email}</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-zinc-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{copy.password}</label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-zinc-900 dark:text-white"
              />
            </div>
            {message && (
              <p className={`text-sm ${message.includes("成功") || message.includes("created") || message.includes("Check") ? "text-emerald-600" : "text-red-600"}`}>
                {message}
              </p>
            )}
            <button
              type="submit"
              disabled={loading || !configured}
              className="w-full rounded-lg bg-purple-500 py-2.5 text-sm font-medium text-white hover:bg-purple-600 disabled:opacity-50"
            >
              {loading ? "..." : copy.emailSubmit}
            </button>
            <button
              type="button"
              className="text-sm text-purple-600 hover:underline dark:text-purple-400"
              onClick={() => {
                setEmailMode(emailMode === "login" ? "register" : "login")
                setMessage(null)
              }}
            >
              {copy.emailSwitch}
            </button>
          </form>
        )}

        <p className="mt-8">
          <Link to="/" className="text-sm text-gray-500 hover:underline">
            ← {copy.back}
          </Link>
        </p>
      </div>
    </SiteLayout>
  )
}

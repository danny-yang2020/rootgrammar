import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import type { Session, User } from "@supabase/supabase-js"
import { sendPhoneOtp, verifyPhoneOtp } from "../lib/auth-api"
import { isSupabaseConfigured, supabase } from "../lib/supabase"

interface AuthContextValue {
  user: User | null
  session: Session | null
  loading: boolean
  configured: boolean
  signUp: (email: string, password: string) => Promise<{ error: string | null }>
  signIn: (email: string, password: string) => Promise<{ error: string | null }>
  signInWithPhone: (phone: string, code: string) => Promise<{ error: string | null }>
  sendPhoneCode: (phone: string) => Promise<{ error: string | null; devCode?: string }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(isSupabaseConfigured)

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return
    }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signUp = async (email: string, password: string) => {
    if (!supabase) return { error: "Supabase not configured" }
    const { error } = await supabase.auth.signUp({ email, password })
    return { error: error?.message ?? null }
  }

  const signIn = async (email: string, password: string) => {
    if (!supabase) return { error: "Supabase not configured" }
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error: error?.message ?? null }
  }

  const sendPhoneCode = async (phone: string) => {
    try {
      const data = await sendPhoneOtp(phone)
      return { error: null, devCode: data.devCode }
    } catch (e) {
      return { error: e instanceof Error ? e.message : "发送失败" }
    }
  }

  const signInWithPhone = async (phone: string, code: string) => {
    if (!supabase) return { error: "Supabase not configured" }
    try {
      const tokens = await verifyPhoneOtp(phone, code)
      const { error } = await supabase.auth.setSession({
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
      })
      return { error: error?.message ?? null }
    } catch (e) {
      return { error: e instanceof Error ? e.message : "登录失败" }
    }
  }

  const signOut = async () => {
    if (supabase) await supabase.auth.signOut()
  }

  return (
    <AuthContext.Provider
      value={{
        user: session?.user ?? null,
        session,
        loading,
        configured: isSupabaseConfigured,
        signUp,
        signIn,
        signInWithPhone,
        sendPhoneCode,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}

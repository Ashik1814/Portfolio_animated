import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const supabaseAdmin = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: {
      getItem: (key: string) => {
        return window.sessionStorage.getItem(key)
      },
      setItem: (key: string, value: string) => {
        window.sessionStorage.setItem(key, value)
      },
      removeItem: (key: string) => {
        window.sessionStorage.removeItem(key)
      },
    },
    autoRefreshToken: false,
    persistSession: true,
    detectSessionInUrl: false,
  },
})
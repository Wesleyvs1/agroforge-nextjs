import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

let _supabase: SupabaseClient | null = null

function getSupabaseClient(): SupabaseClient {
  if (_supabase) return _supabase

  if (!supabaseUrl || !supabaseAnonKey) {
    // During Vercel static build, env vars may not be available.
    // Return a dummy client that won't crash on prerender.
    console.warn(
      '[Supabase] Env vars missing — returning placeholder client for build.',
    )
    // Create with placeholder values; pages using 'use client' will
    // get the real values at runtime from the browser bundle.
    return createClient(
      'https://placeholder.supabase.co',
      'placeholder-key',
    )
  }

  _supabase = createClient(supabaseUrl, supabaseAnonKey)
  return _supabase
}

export const supabase = getSupabaseClient()

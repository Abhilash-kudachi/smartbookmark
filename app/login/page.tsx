'use client'
import { supabase } from '@/lib/supabaseClient'

export default function Login() {
  const login = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${location.origin}/dashboard` }
    })
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-white text-black">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-2">
          Welcome to SMART-BOOKMARK
        </h1>
        <p className="text-gray-600 text-lg">
          Mark your bookmarks with title and URL easily.
        </p>
      </div>

    
      <button 
        onClick={login} 
        className="px-8 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center gap-2 shadow-lg"
      >
        Continue with Google
      </button>
    </div>
  )
}
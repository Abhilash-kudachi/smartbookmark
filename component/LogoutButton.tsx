'use client'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    
    if (error) {
      console.error('Error logging out:', error.message)
    } else {
      // Force a redirect to the login page
      router.push('/login')
      // Optional: router.refresh() to clear any cached server data
      router.refresh()
    }
  }

  return (
    <button 
      className="mb-4 text-sm underline hover:text-gray-600 transition-colors" 
      onClick={handleLogout}
    >
      Logout
    </button>
  )
}
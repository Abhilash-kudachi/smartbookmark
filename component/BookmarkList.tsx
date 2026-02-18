'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function BookmarkList() {
  const [bookmarks, setBookmarks] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)

  const load = async () => {
    // Explicitly fetching to see what happens
    const { data, error: fetchError } = await supabase
      .from('bookmarks') // Ensure this is PLURAL 'bookmarks'
      .select('*')
      .order('created_at', { ascending: false })
    
    if (fetchError) {
      console.error('FETCH ERROR:', fetchError)
      setError(fetchError.message)
    } else {
      console.log('DATA RECEIVED:', data)
      setBookmarks(data || [])
      setError(null)
    }
  }

  useEffect(() => { 
    load() 

    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes', 
        { event: '*', schema: 'public', table: 'bookmarks' }, 
        (payload) => {
          console.log('REALTIME PAYLOAD:', payload)
          load() 
        }
      )
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  const del = async (id: string) => {
    await supabase.from('bookmarks').delete().eq('id', id)
    load()
  }

  if (error) return <div className="text-red-500">Error: {error}</div>

  return (
    <div className="space-y-2 mt-4">
      {bookmarks.length === 0 ? (
        <p className="text-gray-500 italic">No bookmarks found in the database.</p>
      ) : (
        bookmarks.map((b) => (
          <div key={b.id} className="border border-gray-700 p-3 flex justify-between items-center rounded bg-gray-900/50">
            <div>
              <p className="text-white font-bold">{b.title}</p>
              <a href={b.url} target="_blank" rel="noreferrer" className="text-blue-400 text-sm">{b.url}</a>
            </div>
            <button onClick={() => del(b.id)} className="text-red-500 px-2">Delete</button>
          </div>
        ))
      )}
    </div>
  )
}
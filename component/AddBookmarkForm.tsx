'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function AddBookmarkForm() {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const add = async (e: any) => {
    e.preventDefault()
    const { data: { user } } = await supabase.auth.getUser()

    await supabase.from('bookmarks').insert({
      title,
      url,
      user_id: user?.id
    })

    setTitle('')
    setUrl('')
  }

  return (
    <form onSubmit={add} className="flex gap-2 my-4">
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" className="border p-2 flex-1" />
      <input value={url} onChange={e=>setUrl(e.target.value)} placeholder="URL" className="border p-2 flex-1" />
      <button className="bg-blue-500 text-white px-4">Add</button>
    </form>
  )
}
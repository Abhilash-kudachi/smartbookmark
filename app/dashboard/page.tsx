'use client'
import AddBookmarkForm from '@/component/AddBookmarkForm'
import BookmarkList from '@/component/BookmarkList'
import LogoutButton from '@/component/LogoutButton'

export default function Dashboard() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">My Bookmarks</h1>
      <LogoutButton />
      <AddBookmarkForm />
      <BookmarkList />
    </div>
  )
}
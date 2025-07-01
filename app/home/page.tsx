'use client'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { supabase } from '@/utils/supabase/client'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import Loading from './loading'

import { fetchPosts, addPost, deletePost } from '@/app/home/PostAction'
import { asc } from 'drizzle-orm'
import { Ellipsis } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type PostType = {
  id: string
  title: string
  content: string
  created_at: Date
  updated_at: Date
}

const HomePage = () => {
  const t = useTranslations()
  const [posts, setPosts] = useState<PostType[]>([])
  const [newPost, setNewPost] = useState({ title: '', content: '' })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserPosts = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        setPosts([])
        setLoading(false)
        return
      }

      // Fetch posts using the server action
      try {
        const data = await fetchPosts(user.id)
        setPosts(data)
      } catch (error) {
        console.error('Failed to fetch posts:', error)
      }

      setLoading(false)
    }

    fetchUserPosts()
  }, [])

  const handleAddPost = async () => {
    if (!newPost.title.trim() || !newPost.content.trim()) return
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return

    try {
      // Call the server action to add the post
      const newPostData = await addPost(newPost.title, newPost.content, user.id)
      setPosts([newPostData, ...posts])
      setNewPost({ title: '', content: '' }) // Clear inputs
    } catch (error) {
      console.error('Failed to add post:', error)
    }
  }

  const handleDeletePost = async (postId: string) => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    try {
      await deletePost(postId)
      setPosts(posts.filter(post => post.id !== postId))

    } catch (error) {
      console.error('Failed to delete post:', error)

    }
  }

  return (
    <div className="max-w-xl mx-auto py-10 px-10">
      <h1 className="text-3xl font-bold mb-6">{t('blogPosts')}</h1>

      <div className="flex flex-col gap-4 mb-6">
        <Input
          placeholder={t('postTitle')}
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        />
        <Input
          placeholder={t('postContent')}
          value={newPost.content}
          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
        />
        <Button onClick={handleAddPost}>{t('addPost')}</Button>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li
              key={post.id}
              className={cn(
                'flex items-center justify-between p-3 rounded border',
                'bg-white'
              )}
            >
              <div>
                <h2 className="text-xl font-semibold">{post.title}</h2>
                <p>{post.content}</p>
              </div>
              <DropdownMenu >
                <DropdownMenuTrigger><Ellipsis /></DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>{t('actions')}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleDeletePost(post.id)}>{t('delete')}</DropdownMenuItem>
                  <DropdownMenuItem>{t('edit')}</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default HomePage

'use client'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { supabase } from '@/utils/supabase/client'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import Loading from './loading'

import { fetchPosts, addPost, deletePost, editPost } from '@/app/home/PostAction'
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

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

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
  const [newPost, setNewPost] = useState({ title: '', content: '', image: null as File | null })
  const [loading, setLoading] = useState(true)
  const [openDialog, setOpenDialog] = useState(false)
  const [currentPost, setCurrentPost] = useState<PostType | null>(null)
  const [updatedPost, setUpdatedPost] = useState({ id: '', title: '', content: '' })

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
      const newPostData = await addPost(newPost.title, newPost.content, user.id, newPost.image)
      setPosts([newPostData, ...posts])
      setNewPost({ title: '', content: '', image: null }) // Clear inputs
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
  const handleEditPost = (post: PostType) => {
    setCurrentPost(post)
    setUpdatedPost({ id: post.id, title: post.title, content: post.content })
    setOpenDialog(true)
  }

  const handleUpdatePost = async () => {
    if (!updatedPost.title.trim() || !updatedPost.content.trim()) return

    const { data: { user } } = await supabase.auth.getUser()

    if (!user || !currentPost) return

    try {
      // Update the post using the server action
      const updated = await editPost(updatedPost.id, updatedPost.title, updatedPost.content) // You can replace this with actual update logic
      setPosts(posts.map(post => (post.id === currentPost.id ? updated : post)))
      setOpenDialog(false)
      setCurrentPost(null)
    } catch (error) {
      console.error('Failed to update post:', error)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null
    setNewPost({ ...newPost, image: file })
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
        <Input type="file" onChange={handleFileChange} />
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
                <div className='flex justify-between'>
                  <h2 className="text-xl font-semibold">{post.title}</h2>
                  <DropdownMenu >
                    <DropdownMenuTrigger><Ellipsis /></DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>{t('actions')}</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleDeletePost(post.id)}>{t('delete')}</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEditPost(post)}>{t('edit')}</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu></div>
                <p>{post.content}</p>
              </div>


            </li>
          ))}
        </ul>
      )}

      {/* Dialog for Editing the Post */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('editPost')}</DialogTitle>
            <DialogDescription>{t('updateYourPost')}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              value={updatedPost.title}
              onChange={(e) => setUpdatedPost({ ...updatedPost, title: e.target.value })}
              placeholder={t('postTitle')}
            />
            <Input
              value={updatedPost.content}
              onChange={(e) => setUpdatedPost({ ...updatedPost, content: e.target.value })}
              placeholder={t('postContent')}
            />
            <Input type="file" onChange={handleFileChange} />
          </div>
          <DialogFooter>
            <Button onClick={handleUpdatePost}>{t('update')}</Button>
            <Button variant="ghost" onClick={() => setOpenDialog(false)}>
              {t('cancel')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default HomePage

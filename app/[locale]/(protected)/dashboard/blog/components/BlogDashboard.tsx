'use client'

import { useState, useEffect } from 'react'
import { RichTextEditor } from './RichTextEditor'
import { Sidebar } from './Sidebar'
import { BlogPost, PostStatus } from '@/types/editor'
import { Menu, Sun, Moon, Bell, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { prisma } from '@/lib/db'

export function BlogDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null)
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Load posts from API
  const loadPosts = async () => {
    try {
      const response = await fetch('/api/posts')
      const data = await response.json()
      setPosts(data)
      if (data.length > 0 && !currentPost) {
        setCurrentPost(data[0])
        setTitle(data[0].title)
        setExcerpt(data[0].excerpt)
      }
    } catch (error) {
      console.error('Failed to load posts:', error)
    }
  }

  useEffect(() => {
    setMounted(true)
    loadPosts()
  }, [])

  useEffect(() => {
    if (currentPost) {
      setTitle(currentPost.title)
      setExcerpt(currentPost.excerpt)
    }
  }, [currentPost])

  const handleSave = async (data: { title: string; excerpt: string; content: string; status: PostStatus }) => {
    setIsLoading(true)
    try {
      const url = currentPost ? `/api/posts/${currentPost.id}` : '/api/posts'
      const method = currentPost ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title || 'Untitled',
          excerpt: excerpt || '',
          content: data.content,
          status: data.status,
        }),
      })

      if (response.ok) {
        await loadPosts()
        // If it's a new post, select it after creation
        if (!currentPost) {
          const newPost = await response.json()
          setCurrentPost(newPost)
        }
      }
    } catch (error) {
      console.error('Failed to save post:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleNewPost = () => {
    setCurrentPost(null)
    setTitle('')
    setExcerpt('')
  }

  const handlePostSelect = (post: BlogPost) => {
    setCurrentPost(post)
    setSidebarOpen(false)
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex h-screen">
          <div className="w-80 border-r bg-muted/30">
            <div className="border-b p-4">
              <div className="h-6 w-32 animate-pulse rounded bg-muted"></div>
            </div>
          </div>
          <div className="flex flex-1 flex-col">
            <div className="border-b bg-background p-4">
              <div className="h-6 w-48 animate-pulse rounded bg-muted"></div>
            </div>
            <div className="flex-1 p-6">
              <div className="mx-auto max-w-4xl space-y-6">
                <div className="h-32 animate-pulse rounded-lg bg-muted"></div>
                <div className="h-96 animate-pulse rounded-lg bg-muted"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      darkMode ? 'dark' : ''
    }`}>
      <div className="flex h-screen bg-background">
        <Sidebar
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          currentPost={currentPost!}
          posts={posts}
          onPostSelect={handlePostSelect}
          onNewPost={handleNewPost}
        />

        <div className="flex flex-1 flex-col overflow-hidden">
          <header className="flex items-center justify-between border-b bg-background p-4">
            <div className="flex items-center gap-3">
              <Button
                onClick={() => setSidebarOpen(true)}
                variant="ghost"
                size="sm"
                className="lg:hidden"
              >
                <Menu className="size-5" />
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-foreground">Blog Editor</h1>
                <p className="text-sm text-muted-foreground">
                  {currentPost ? `Editing: ${currentPost.title}` : 'Create new post'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
              >
                <Bell className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
              >
                        <Settings className="size-4" />
              </Button>
              <Button
                onClick={() => setDarkMode(!darkMode)}
                variant="ghost"
                size="sm"
              >
                {darkMode ? <Sun className="size-4" /> : <Moon className="size-4" />}
              </Button>
            </div>
          </header>

          <main className="flex-1 overflow-auto p-6">
            <div className="mx-auto max-w-4xl space-y-6">
              <div className="space-y-4 rounded-lg border bg-background p-6">
                <Input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Post title..."
                  className="h-auto border-none p-0 text-3xl font-bold shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <Input
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Write a brief excerpt..."
                  className="h-auto resize-none border-none p-0 text-lg shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>

              <RichTextEditor
                initialContent={currentPost?.content}
                onSave={handleSave}
                onContentChange={(content) => {
                  // Auto-save functionality can be implemented here
                }}
                isLoading={isLoading}
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
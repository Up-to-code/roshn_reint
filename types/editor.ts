export type PostStatus = 'draft' | 'published' | 'archived'

export interface BlogPost {
  id: string
  title: string
  content: string
  excerpt: string
  status: PostStatus
  createdAt: Date
  updatedAt: Date
}

export interface EditorProps {
  initialContent?: string
  onSave?: (data: { title: string; excerpt: string; content: string; status: PostStatus }) => void
  onContentChange?: (content: string) => void
  isLoading?: boolean
}

export interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
  currentPost?: BlogPost
  posts: BlogPost[]
  onPostSelect: (post: BlogPost) => void
  onNewPost: () => void
}
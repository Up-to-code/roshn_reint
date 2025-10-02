'use client'

import dynamic from 'next/dynamic'
import { EditorProps } from '@/types/editor'

function EditorSkeleton() {
  return (
    <div className="flex flex-col border rounded-lg bg-background overflow-hidden">
      <div className="p-3 border-b bg-background">
        <div className="flex flex-wrap items-center gap-1">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="h-8 w-8 bg-muted rounded-md animate-pulse" />
          ))}
        </div>
      </div>
      <div className="min-h-[500px] p-6 bg-background">
        <div className="space-y-3">
          <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
          <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
          <div className="h-4 bg-muted rounded animate-pulse w-2/3" />
          <div className="h-4 bg-muted rounded animate-pulse w-4/5" />
        </div>
      </div>
      <div className="flex justify-between items-center p-4 border-t bg-muted/50">
        <div className="h-4 w-20 bg-muted rounded animate-pulse" />
        <div className="flex gap-3">
          <div className="h-9 w-24 bg-muted rounded animate-pulse" />
          <div className="h-9 w-24 bg-muted rounded animate-pulse" />
        </div>
      </div>
    </div>
  )
}

const RichTextEditorClient = dynamic(
  () => import('./RichTextEditor.client.tsx').then(mod => mod.RichTextEditorClient),
  {
    ssr: false,
    loading: () => <EditorSkeleton />
  }
)

export function RichTextEditor(props: EditorProps) {
  return <RichTextEditorClient {...props} />
}
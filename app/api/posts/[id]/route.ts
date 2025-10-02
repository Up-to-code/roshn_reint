import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { title, content, excerpt, status } = await request.json()
    
    const post = await prisma.post.update({
      where: { id: params.id },
      data: {
        title,
        content,
        excerpt,
        status,
        updatedAt: new Date()
      }
    })
    
    return NextResponse.json(post)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 })
  }
}
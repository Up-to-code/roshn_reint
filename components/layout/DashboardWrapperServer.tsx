// FILE: components/DashboardWrapperServer.tsx
import { ReactNode } from 'react'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { prisma } from '@/lib/db' // ✅ تأكد أن المسار هذا موجود فعلاً

interface DashboardWrapperServerProps {
  children: ReactNode
}

export default async function DashboardWrapperServer({
  children,
}: DashboardWrapperServerProps) {
  // ✅ اجلب الجلسة الحالية مع تمرير الـ headers
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  // إذا المستخدم غير مسجل دخول → توجيه لصفحة الدخول
  if (!session?.user?.id) {
    redirect('/login')
  }

  // ✅ جلب بيانات المستخدم من قاعدة البيانات
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      image: true,
    },
  })

  // إذا المستخدم مش موجود في قاعدة البيانات → توجيه لصفحة الدخول
  if (!user) {
    redirect('/login')
  }

  // ✅ تحقق من صلاحية الدخول (يجب أن يكون ADMIN)
  if (user.role !== 'ADMIN') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-gray-900">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
            <svg
              className="size-10 text-red-600 dark:text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-gray-100">
            Access Denied
          </h1>
          <p className="mb-8 text-gray-600 dark:text-gray-400">
            Administrator privileges required to access this page.
          </p>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Return to Home
          </a>
        </div>
      </div>
    )
  }

  // ✅ السماح بالوصول في حالة ADMIN
  return <>{children}</>
}

// FILE: components/DashboardWrapperServer.tsx
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import { prisma } from '@/lib/db';
import { headers } from 'next/headers';

interface DashboardWrapperServerProps {
  children: ReactNode;
}

export default async function DashboardWrapperServer({ 
  children 
}: DashboardWrapperServerProps) {
  const session = await auth.api.getSession({
    headers: await headers() // you need to pass the headers object.
})

  if (!session?.user?.id) {
    redirect('/login');
  }

  // Fetch user from database to get the latest role and data
  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      image: true,
    },
  });

  // If user doesn't exist in database, redirect to login
  if (!user) {
    redirect('/login');
  }

  // Check if user has ADMIN role
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
    );
  }

  return <>{children}</>;
}
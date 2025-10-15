// FILE: components/DashboardWrapperServer.tsx
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

interface DashboardWrapperServerProps {
  children: ReactNode;
}

export default async function DashboardWrapperServer({ 
  children 
}: DashboardWrapperServerProps) {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  if (session.user?.role !== 'ADMIN') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-red-100">
            <svg className="size-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="mb-2 text-2xl font-bold text-gray-900">Access Denied</h1>
          <p className="mb-8 text-gray-600">
            Administrator privileges required.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
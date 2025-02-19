'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { Header } from '@/components/dashboard/header';
import { Sidebar } from '@/components/dashboard/sidebar';
import { ModeToggle } from '@/components/theme-toggle';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in');
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header setSidebarOpen={setSidebarOpen} />
      <div className="flex h-[calc(100vh-4rem)] pt-16">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto p-4 lg:p-6 max-w-[1600px]">
            {children}
          </div>
        </main>
      </div>
      <div className="fixed bottom-4 right-4 z-50">
        <ModeToggle />
      </div>
    </div>
  );
}
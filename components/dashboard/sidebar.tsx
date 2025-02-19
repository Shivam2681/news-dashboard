'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { 
  BarChart3, 
  FileText, 
  Home, 
  Settings, 
  Users, 
  X,
  Newspaper,
  BookOpen,
  PenTool,
  DollarSign
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const menuItems = [
  { icon: Home, label: 'Dashboard', path: '/dashboard' },
  { icon: Newspaper, label: 'News', path: '/dashboard/news' },
  { icon: BookOpen, label: 'Blog', path: '/dashboard/blog' },
  { icon: PenTool, label: 'Authors', path: '/dashboard/authors' },
  { icon: DollarSign, label: 'Payouts', path: '/dashboard/payouts' },
  { icon: BarChart3, label: 'Analytics', path: '/dashboard/analytics' },
  { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
];

export function Sidebar({ open, setOpen }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setOpen]);

  return (
    <>
      <aside
        className={cn(
          'fixed inset-y-0 left-0 w-64 bg-background border-r z-30',
          'lg:relative lg:block',
          'transform transition-transform duration-300 ease-in-out',
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
          'lg:transform-none'
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 lg:justify-center border-b">
          <span className="text-lg font-semibold">News Dashboard</span>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setOpen(false)}
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
        <ScrollArea className="h-[calc(100vh-4rem)]">
          <nav className="flex flex-col space-y-1 p-4">
            {menuItems.map((item) => (
              <Button
                key={item.path}
                variant={pathname === item.path ? 'secondary' : 'ghost'}
                className="justify-start"
                onClick={() => {
                  router.push(item.path);
                  if (window.innerWidth < 1024) {
                    setOpen(false);
                  }
                }}
              >
                <item.icon className="mr-2 h-5 w-5" />
                {item.label}
              </Button>
            ))}
          </nav>
        </ScrollArea>
      </aside>
      {open && (
        <div
          className={cn(
            "fixed inset-0 z-20 bg-background/80 backdrop-blur-sm lg:hidden",
            "transition-opacity duration-300 ease-in-out",
            open ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
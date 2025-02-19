'use client';

import { Menu, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserButton } from "@clerk/nextjs";
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useState, useCallback } from 'react';
import { useDebouncedCallback } from 'use-debounce';

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

export function Header({ setSidebarOpen }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');

  // Debounce search to avoid too many URL updates
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (term) {
      params.set('q', term);
    } else {
      params.delete('q');
    }
    router.push(`${pathname}?${params.toString()}`);
  }, 300);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  return (
    <header className="fixed top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            className="px-2 hover:bg-transparent lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open sidebar</span>
          </Button>
          <form onSubmit={onSubmit} className="flex w-full max-w-sm items-center space-x-2">
            <Input
              type="search"
              placeholder="Search articles..."
              className="h-9 md:w-[300px] lg:w-[400px]"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                handleSearch(e.target.value);
              }}
            />
            <Button type="submit" size="icon" className="h-9 w-9">
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </div>
        <UserButton afterSignOutUrl="/" />
      </div>
    </header>
  );
}
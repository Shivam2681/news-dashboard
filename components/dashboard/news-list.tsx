'use client';

import { useState, useMemo } from 'react';
import useSWR from 'swr';
import { format } from 'date-fns';
import { getTopHeadlines, NewsArticle } from '@/lib/news-service';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ExternalLink, Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { DateRange } from 'react-day-picker';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export function NewsList() {
  const [page, setPage] = useState(1);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [selectedAuthor, setSelectedAuthor] = useState('all');
  const [isFiltering, setIsFiltering] = useState(false);

  // Fetch news with date range filter applied at API level
  const { data, error, isLoading, mutate } = useSWR(
    ['news', page, isFiltering ? { dateRange } : null],
    () => {
      const params = {
        page,
        pageSize: 12,
        ...(isFiltering && dateRange?.from && {
          from: format(dateRange.from, 'yyyy-MM-dd'),
          ...(dateRange.to && { to: format(dateRange.to, 'yyyy-MM-dd') }),
        }),
      };
      return getTopHeadlines(params);
    }
  );

  // Get unique authors from the articles
  const authors = useMemo(() => {
    if (!data?.articles) return [];
    const uniqueAuthors = new Set(
      data.articles
        .map(article => article.author)
        .filter(Boolean)
    );
    return ['all', ...Array.from(uniqueAuthors)];
  }, [data?.articles]);

  // Filter articles by author on the client side
  const filteredArticles = useMemo(() => {
    if (!data?.articles) return [];
    if (selectedAuthor === 'all') return data.articles;
    return data.articles.filter(article => article.author === selectedAuthor);
  }, [data?.articles, selectedAuthor]);

  const handleApplyFilters = () => {
    setIsFiltering(true);
    setPage(1);
    mutate();
  };

  const handleResetFilters = () => {
    setDateRange(undefined);
    setSelectedAuthor('all');
    setIsFiltering(false);
    setPage(1);
    mutate();
  };

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Error</CardTitle>
          <CardDescription>Failed to load news articles</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters Section */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Articles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Author</label>
              <Select value={selectedAuthor} onValueChange={setSelectedAuthor}>
                <SelectTrigger>
                  <SelectValue placeholder="Select author" />
                </SelectTrigger>
                <SelectContent>
                  {authors.map(author => (
                    <SelectItem key={author} value={author}>
                      {author === 'all' ? 'All Authors' : author}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Date Range</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange?.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, 'LLL dd, y')} -{' '}
                          {format(dateRange.to, 'LLL dd, y')}
                        </>
                      ) : (
                        format(dateRange.from, 'LLL dd, y')
                      )
                    ) : (
                      <span>Pick a date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange?.from}
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button 
              className="flex-1" 
              onClick={handleApplyFilters}
              disabled={!dateRange?.from}
            >
              Apply Filters
            </Button>
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={handleResetFilters}
            >
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* News List Card */}
      <Card>
        <CardHeader>
          <CardTitle>Latest News</CardTitle>
          <CardDescription>
            {isFiltering 
              ? `Filtered news results ${filteredArticles.length !== data?.articles?.length 
                  ? `(${filteredArticles.length} of ${data?.articles?.length} articles)` 
                  : ''}`
              : 'Top headlines from various sources'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="space-y-2 border rounded-lg p-4">
                    <Skeleton className="h-40 w-full rounded-lg" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))
              : filteredArticles.map((article: NewsArticle, index: number) => (
                  <Card
                    key={`${article.url}-${index}`}
                    className="overflow-hidden flex flex-col"
                  >
                    {article.urlToImage && (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={article.urlToImage}
                          alt={article.title}
                          className="object-cover w-full h-full"
                          onError={(e) => {
                            e.currentTarget.src =
                              'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&auto=format&fit=crop';
                          }}
                        />
                      </div>
                    )}
                    <CardContent className="flex-1 p-4">
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {article.description}
                      </p>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="text-sm text-muted-foreground">
                          {article.author && (
                            <span className="block">By {article.author}</span>
                          )}
                          <span>
                            {format(new Date(article.publishedAt), 'MMM d, yyyy')}
                          </span>
                        </div>
                        <a
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm text-primary hover:underline"
                        >
                          Read more
                          <ExternalLink className="ml-1 h-4 w-4" />
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                ))}
          </div>
          <div className="mt-6 flex justify-center space-x-4">
            <Button
              variant="outline"
              disabled={page === 1 || isLoading}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              disabled={!filteredArticles.length || isLoading}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
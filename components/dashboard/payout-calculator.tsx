'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export function PayoutCalculator() {
  const [rates, setRates] = useState({
    news: 50,
    blog: 100,
  });

  const [counts, setCounts] = useState({
    news: 0,
    blog: 0,
  });

  const totalPayout = (rates.news * counts.news) + (rates.blog * counts.blog);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payout Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>News Article Rate ($)</Label>
          <Input
            type="number"
            value={rates.news}
            onChange={(e) => setRates({ ...rates, news: Number(e.target.value) })}
          />
        </div>
        <div className="space-y-2">
          <Label>Blog Post Rate ($)</Label>
          <Input
            type="number"
            value={rates.blog}
            onChange={(e) => setRates({ ...rates, blog: Number(e.target.value) })}
          />
        </div>
        <div className="space-y-2">
          <Label>Number of News Articles</Label>
          <Input
            type="number"
            value={counts.news}
            onChange={(e) => setCounts({ ...counts, news: Number(e.target.value) })}
          />
        </div>
        <div className="space-y-2">
          <Label>Number of Blog Posts</Label>
          <Input
            type="number"
            value={counts.blog}
            onChange={(e) => setCounts({ ...counts, blog: Number(e.target.value) })}
          />
        </div>
        <div className="pt-4 border-t">
          <div className="text-lg font-semibold">
            Total Payout: ${totalPayout}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
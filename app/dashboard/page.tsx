'use client';

import { MainDashboard } from '@/components/dashboard/main-dashboard';
import { NewsAnalytics } from '@/components/dashboard/news-analytics';
import { PayoutTable } from '@/components/dashboard/payout-table';


export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <MainDashboard />
      <div className="grid gap-6 md:grid-cols-2">
      </div>
      <div className="grid gap-8 lg:grid-cols-2">
        <NewsAnalytics />
        <PayoutTable />
      </div>
    </div>
  );
}
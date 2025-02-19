'use client';

import { PayoutCalculator } from '@/components/dashboard/payout-calculator';
import { PayoutTable } from '@/components/dashboard/payout-table';

export default function PayoutsPage() {
  return (
    <div className="space-y-6">
      <PayoutCalculator />
      <PayoutTable />
    </div>
  );
}
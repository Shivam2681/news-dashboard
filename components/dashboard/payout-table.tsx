'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import Papa from 'papaparse';

const initialData = [
  { id: 1, author: 'John Doe', articles: 15, rate: 50, total: 750 },
  { id: 2, author: 'Jane Smith', articles: 12, rate: 50, total: 600 },
  { id: 3, author: 'Mike Johnson', articles: 8, rate: 100, total: 800 },
];

export function PayoutTable() {
  const [data, setData] = useState(initialData);

  const exportPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [['Author', 'Articles', 'Rate', 'Total']],
      body: data.map(row => [row.author, row.articles, `$${row.rate}`, `$${row.total}`]),
    });
    doc.save('payouts.pdf');
  };

  const exportCSV = () => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'payouts.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Payout Details</CardTitle>
        <div className="flex space-x-2">
          <Button onClick={exportPDF} variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            PDF
          </Button>
          <Button onClick={exportCSV} variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            CSV
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Author</TableHead>
                <TableHead>Articles</TableHead>
                <TableHead>Rate</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.author}</TableCell>
                  <TableCell>{row.articles}</TableCell>
                  <TableCell>${row.rate}</TableCell>
                  <TableCell>${row.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
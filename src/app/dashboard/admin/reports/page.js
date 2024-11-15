import { Suspense } from 'react';
import ReportCharts from './ReportCharts';
import QuickStats from './QuickStats';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// This is a Server Component
export default async function AdminReportsPage() {
  // In a real application, you would fetch this data from your API
  const quickStats = {
    totalUsers: 760,
    activeCourses: 25,
    totalRevenue: 28000,
    completionRate: 68
  };

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">Admin Reports</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Suspense fallback={<Card><CardContent>Loading Monthly Revenue...</CardContent></Card>}>
          <ReportCharts reportType="monthlyRevenue" />
        </Suspense>

        <Suspense fallback={<Card><CardContent>Loading Course Enrollments...</CardContent></Card>}>
          <ReportCharts reportType="courseEnrollments" />
        </Suspense>

        <Suspense fallback={<Card><CardContent>Loading User Types Distribution...</CardContent></Card>}>
          <ReportCharts reportType="userTypes" />
        </Suspense>

        <QuickStats stats={quickStats} />
      </div>

      <div className="flex justify-end">
        <Button>Generate Full Report</Button>
      </div>
    </div>
  );
}
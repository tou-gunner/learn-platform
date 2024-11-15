import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';

export default function QuickStats({ stats }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold">Total Users</h3>
            <p className="text-3xl font-bold">{stats.totalUsers}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Active Courses</h3>
            <p className="text-3xl font-bold">{stats.activeCourses}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Total Revenue</h3>
            <p className="text-3xl font-bold">${stats.totalRevenue.toLocaleString()}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Completion Rate</h3>
            <p className="text-3xl font-bold">{stats.completionRate}%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
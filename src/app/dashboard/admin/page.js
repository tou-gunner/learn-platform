// app/dashboard/admin/page.js
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const AdminOverviewPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">10,234</p>
            <p className="text-sm text-gray-500">+5% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Active Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">156</p>
            <p className="text-sm text-gray-500">+3 new this week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">$52,389</p>
            <p className="text-sm text-gray-500">+12% from last month</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex justify-between items-center">
              <span>New user registration</span>
              <span className="text-sm text-gray-500">2 minutes ago</span>
            </li>
            <li className="flex justify-between items-center">
              <span>New course published</span>
              <span className="text-sm text-gray-500">1 hour ago</span>
            </li>
            <li className="flex justify-between items-center">
              <span>Payment received</span>
              <span className="text-sm text-gray-500">3 hours ago</span>
            </li>
          </ul>
        </CardContent>
      </Card>
      
      <div className="flex justify-end">
        <Button>Generate Full Report</Button>
      </div>
    </div>
  );
};

export default AdminOverviewPage;
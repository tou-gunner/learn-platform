import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const InstructorDashboardPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Instructor Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">1,234</p>
            <p className="text-sm text-gray-500">+15% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Active Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">12</p>
            <p className="text-sm text-gray-500">2 new this month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Total Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">$9,876</p>
            <p className="text-sm text-gray-500">+8% from last month</p>
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
              <span>New student enrolled in &quot;React Basics&quot;</span>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </li>
            <li className="flex justify-between items-center">
              <span>Completed course update for &quot;Advanced JavaScript&quot;</span>
              <span className="text-sm text-gray-500">1 day ago</span>
            </li>
            <li className="flex justify-between items-center">
              <span>Received 5-star rating for &quot;Python for Beginners&quot;</span>
              <span className="text-sm text-gray-500">3 days ago</span>
            </li>
          </ul>
        </CardContent>
      </Card>
      
      <div className="flex justify-end">
        <Button>Create New Course</Button>
      </div>
    </div>
  );
};

export default InstructorDashboardPage;
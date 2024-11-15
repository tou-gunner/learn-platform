import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const StudentDashboardPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome, Student!</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Enrolled Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">5</p>
            <p className="text-sm text-gray-500">2 in progress</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Assignments Due</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">3</p>
            <p className="text-sm text-gray-500">Next due in 2 days</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Overall Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">75%</p>
            <p className="text-sm text-gray-500">Keep it up!</p>
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
              <span>Completed lesson in &quot;React Basics&quot;</span>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </li>
            <li className="flex justify-between items-center">
              <span>Submitted assignment for &quot;Advanced JavaScript&quot;</span>
              <span className="text-sm text-gray-500">1 day ago</span>
            </li>
            <li className="flex justify-between items-center">
              <span>Enrolled in &quot;Python for Data Science&quot;</span>
              <span className="text-sm text-gray-500">3 days ago</span>
            </li>
          </ul>
        </CardContent>
      </Card>
      
      <div className="flex justify-end">
        <Link href="/dashboard/student/courses">
          <Button>Continue Learning</Button>
        </Link>
      </div>
    </div>
  );
};

export default StudentDashboardPage;
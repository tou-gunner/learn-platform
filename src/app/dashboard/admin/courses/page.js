import { Suspense } from 'react';
import CourseTable from './CourseTable';
import CourseSearch from './CourseSearch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

async function getCourses(searchTerm = '') {
  // In a real app, this would be an API call
  await new Promise(resolve => setTimeout(resolve, 1000));

  const mockCourses = [
    { id: 1, title: 'Introduction to React', instructor: 'John Doe', students: 150, status: 'active' },
    { id: 2, title: 'Advanced JavaScript', instructor: 'Jane Smith', students: 120, status: 'active' },
    { id: 3, title: 'Python for Beginners', instructor: 'Bob Johnson', students: 200, status: 'inactive' },
  ];

  if (searchTerm) {
    return mockCourses.filter(course => 
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  return mockCourses;
}

export default async function CourseManagementPage({ searchParams }) {
  const searchTerm = searchParams.search || '';
  const initialCourses = await getCourses(searchTerm);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Course Management</h1>
        <Link href="/dashboard/admin/courses/add">
          <Button>Add New Course</Button>
        </Link>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Courses</CardTitle>
        </CardHeader>
        <CardContent>
          <CourseSearch />
          <Suspense fallback={<div>Loading...</div>}>
            <CourseTable initialCourses={initialCourses} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
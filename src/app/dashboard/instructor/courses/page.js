'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Table from '@/components/ui/table';

const InstructorCoursesPage = () => {
  const [courses, setCourses] = useState([
    { id: 1, title: 'React Basics', students: 150, rating: 4.5, status: 'active' },
    { id: 2, title: 'Advanced JavaScript', students: 120, rating: 4.8, status: 'active' },
    { id: 3, title: 'Python for Beginners', students: 200, rating: 4.2, status: 'draft' },
  ]);

  const [alert, setAlert] = useState(null);

  const handleStatusChange = (courseId, newStatus) => {
    setCourses(courses.map(course => 
      course.id === courseId ? { ...course, status: newStatus } : course
    ));
    setAlert({ type: 'success', message: `Course status updated to ${newStatus}` });
  };

  const columns = [
    { header: 'Title', accessor: 'title' },
    { header: 'Students', accessor: 'students' },
    { header: 'Rating', accessor: 'rating' },
    { 
      header: 'Status', 
      accessor: 'status',
      cell: (course) => (
        <span className={`px-2 py-1 rounded text-sm ${
          course.status === 'active' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
        }`}>
          {course.status}
        </span>
      )
    },
  ];

  const actionButtons = (course) => (
    <>
      <Button
        variant="outline"
        size="sm"
        className="mr-2"
        onClick={() => handleStatusChange(course.id, course.status === 'active' ? 'draft' : 'active')}
      >
        {course.status === 'active' ? 'Unpublish' : 'Publish'}
      </Button>
      <Link href={`/dashboard/instructor/courses/${course.id}/contents`}>
        <Button variant="outline" size="sm" className="mr-2">
          View Content
        </Button>
      </Link>
      <Link href={`/dashboard/instructor/courses/${course.id}/edit`}>
        <Button variant="outline" size="sm" className="mr-2">
          Edit
        </Button>
      </Link>
    </>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Courses</h1>
        <Link href="/dashboard/instructor/courses/create">
          <Button>Create New Course</Button>
        </Link>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Course List</CardTitle>
        </CardHeader>
        <CardContent>
          {alert && (
            <Alert variant={alert.type === 'success' ? 'default' : 'destructive'} className="mb-4">
              <AlertDescription>{alert.message}</AlertDescription>
            </Alert>
          )}
          <Table 
            columns={columns}
            data={courses}
            onAction={actionButtons}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default InstructorCoursesPage;
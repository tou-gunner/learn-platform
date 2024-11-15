'use client';

import { useState } from 'react';
import Table from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Link from 'next/link';

export default function CourseTable({ initialCourses }) {
  const [courses, setCourses] = useState(initialCourses);
  const [alert, setAlert] = useState(null);

  const handleStatusChange = (courseId, newStatus) => {
    setCourses(courses.map(course => 
      course.id === courseId ? { ...course, status: newStatus } : course
    ));
    setAlert({ type: 'success', message: `Course status updated to ${newStatus}` });
  };

  const handleDeleteCourse = (courseId) => {
    setCourses(courses.filter(course => course.id !== courseId));
    setAlert({ type: 'success', message: 'Course deleted successfully' });
  };

  const columns = [
    { header: 'Title', accessor: 'title' },
    { header: 'Instructor', accessor: 'instructor' },
    { header: 'Students', accessor: 'students' },
    { 
      header: 'Status', 
      accessor: 'status',
      cell: (course) => (
        <span className={`px-2 py-1 rounded text-sm ${
          course.status === 'active' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
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
        onClick={() => handleStatusChange(course.id, course.status === 'active' ? 'inactive' : 'active')}
      >
        {course.status === 'active' ? 'Deactivate' : 'Activate'}
      </Button>
      <Link href={`/dashboard/admin/courses/${course.id}/contents`}>
        <Button variant="outline" size="sm" className="mr-2">
          View Contents
        </Button>
      </Link>
      <Link href={`/dashboard/admin/courses/${course.id}/add-content`}>
        <Button variant="outline" size="sm" className="mr-2">
          Add Content
        </Button>
      </Link>
      <Link href={`/dashboard/admin/courses/${course.id}/edit`}>
        <Button variant="outline" size="sm" className="mr-2">
          Edit
        </Button>
      </Link>
      <Button
        variant="destructive"
        size="sm"
        onClick={() => handleDeleteCourse(course.id)}
      >
        Delete
      </Button>
    </>
  );

  return (
    <>
      {alert && (
        <Alert variant={alert.type === 'success' ? 'default' : 'destructive'}>
          <AlertDescription>{alert.message}</AlertDescription>
        </Alert>
      )}
      <Table 
        columns={columns}
        data={courses}
        onAction={actionButtons}
      />
    </>
  );
}
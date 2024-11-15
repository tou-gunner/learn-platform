// app/dashboard/student/assignments/page.js
'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Table from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const AssignmentStatus = ({ status }) => {
  const statusStyles = {
    'Not Started': 'bg-gray-100 text-gray-800',
    'In Progress': 'bg-blue-100 text-blue-800',
    'Completed': 'bg-green-100 text-green-800',
    'Overdue': 'bg-red-100 text-red-800'
  };

  return (
    <Badge className={statusStyles[status]}>
      {status}
    </Badge>
  );
};

const StudentAssignmentsPage = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    // In a real application, fetch assignments from an API
    const fetchAssignments = async () => {
      // Simulating API call
      const response = await new Promise(resolve => setTimeout(() => resolve([
        { id: 1, title: "React Component Structure", course: "React Basics", dueDate: "2023-06-15", status: "Completed" },
        { id: 2, title: "State Management in React", course: "React Basics", dueDate: "2023-06-20", status: "In Progress" },
        { id: 3, title: "Async JavaScript", course: "Advanced JavaScript", dueDate: "2023-06-18", status: "Not Started" },
        { id: 4, title: "Python Data Structures", course: "Python for Data Science", dueDate: "2023-06-10", status: "Overdue" },
      ]), 1000));
      setAssignments(response);
    };

    fetchAssignments();
  }, []);

  const columns = [
    { header: "Title", accessor: "title" },
    { header: "Course", accessor: "course" },
    { 
      header: "Due Date", 
      accessor: "dueDate",
      cell: (assignment) => new Date(assignment.dueDate).toLocaleDateString()
    },
    { 
      header: "Status", 
      accessor: "status",
      cell: (assignment) => <AssignmentStatus status={assignment.status} />
    },
  ];

  const actionButtons = (assignment) => (
    <Link href={`/dashboard/student/assignments/${assignment.id}`}>
      <Button variant="outline" size="sm">View</Button>
    </Link>
  );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Assignments</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Current Assignments</CardTitle>
        </CardHeader>
        <CardContent>
          <Table 
            columns={columns}
            data={assignments}
            onAction={actionButtons}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Assignment Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Assignments</p>
              <p className="text-2xl font-bold">{assignments.length}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Completed</p>
              <p className="text-2xl font-bold">{assignments.filter(a => a.status === 'Completed').length}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">In Progress</p>
              <p className="text-2xl font-bold">{assignments.filter(a => a.status === 'In Progress').length}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Overdue</p>
              <p className="text-2xl font-bold">{assignments.filter(a => a.status === 'Overdue').length}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Link href="/dashboard/student/courses">
          <Button variant="outline">Back to Courses</Button>
        </Link>
      </div>
    </div>
  );
};

export default StudentAssignmentsPage;
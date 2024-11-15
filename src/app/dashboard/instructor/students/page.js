'use client';

import { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Table from '@/components/ui/table';

const InstructorStudentsPage = () => {
  const [students, setStudents] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', course: 'React Basics', progress: 75 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', course: 'Advanced JavaScript', progress: 90 },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', course: 'Python for Beginners', progress: 60 },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Course', accessor: 'course' },
    { 
      header: 'Progress', 
      accessor: 'progress',
      cell: (student) => (
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div className="bg-blue-600 h-2.5 rounded-full" style={{width: `${student.progress}%`}}></div>
        </div>
      )
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Students</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Student List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <Table 
            columns={columns}
            data={filteredStudents}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default InstructorStudentsPage;
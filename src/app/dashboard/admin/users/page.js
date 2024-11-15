import { Suspense } from 'react';
import UserTable from './UserTable';
import UserSearch from './UserSearch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

async function getUsers(searchTerm = '') {
  // In a real app, this would be an API call
  // For now, we'll simulate an API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  const mockUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'student', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'instructor', status: 'active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'student', status: 'inactive' },
  ];

  if (searchTerm) {
    return mockUsers.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  return mockUsers;
}

export default async function UserManagementPage({ searchParams }) {
  const searchTerm = searchParams.search || '';
  const initialUsers = await getUsers(searchTerm);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">User Management</h1>
        <Link href="/dashboard/admin/users/add">
          <Button>Add New User</Button>
        </Link>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
        </CardHeader>
        <CardContent>
          <UserSearch />
          <Suspense fallback={<div>Loading...</div>}>
            <UserTable initialUsers={initialUsers} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
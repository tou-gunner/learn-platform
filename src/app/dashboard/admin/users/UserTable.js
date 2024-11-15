'use client';

import { useState } from 'react';
import Table from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Link from 'next/link';

export default function UserTable({ initialUsers }) {
  const [users, setUsers] = useState(initialUsers);
  const [alert, setAlert] = useState(null);

  const handleStatusChange = (userId, newStatus) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
    setAlert({ type: 'success', message: `User status updated to ${newStatus}` });
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
    setAlert({ type: 'success', message: 'User deleted successfully' });
  };

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Role', accessor: 'role' },
    { 
      header: 'Status', 
      accessor: 'status',
      cell: (user) => (
        <span className={`px-2 py-1 rounded text-sm ${
          user.status === 'active' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
        }`}>
          {user.status}
        </span>
      )
    },
  ];

  const actionButtons = (user) => (
    <>
        <Link href={`/dashboard/admin/users/${user.id}/edit`}>
        <Button
            variant="outline"
            size="sm"
            className="mr-2"
        >
            Edit
        </Button>
        </Link>
        <Button
            variant="outline"
            size="sm"
            className="mr-2"
            onClick={() => handleStatusChange(user.id, user.status === 'active' ? 'inactive' : 'active')}
        >
            {user.status === 'active' ? 'Deactivate' : 'Activate'}
        </Button>
        <Button
            variant="destructive"
            size="sm"
            onClick={() => handleDeleteUser(user.id)}
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
        data={users}
        onAction={actionButtons}
      />
    </>
  );
}
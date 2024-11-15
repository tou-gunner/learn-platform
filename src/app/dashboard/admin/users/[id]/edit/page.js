'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Mock function to fetch user data
const fetchUserData = async (id) => {
  // In a real app, this would be an API call
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
  return {
    id,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'student',
  };
};

export default function EditUserPage({ params }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await fetchUserData(id);
        setFormData(userData);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load user data');
        setIsLoading(false);
      }
    };

    loadUserData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('User updated:', formData);
      setSuccess('User updated successfully!');

      // Redirect to user list after a short delay
      setTimeout(() => {
        router.push('/dashboard/admin/users');
      }, 2000);
    } catch (err) {
      setError('Failed to update user. Please try again.');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Edit User</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                <select
                  id="role"
                  name="role"
                  required
                  value={formData.role}
                  onChange={handleChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="student">Student</option>
                  <option value="instructor">Instructor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
            <div className="mt-6">
              <Button type="submit" className="w-full">
                Update User
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert>
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
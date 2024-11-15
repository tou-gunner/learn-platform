'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';

// Mock function to fetch course details
const fetchCourseDetails = async (courseId) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    id: courseId,
    title: 'Sample Course',
    description: 'This is a sample course description.',
    category: 'Web Development',
    price: 49.99,
    duration: 10,
    level: 'intermediate',
  };
};

const EditCoursePage = ({ params }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    duration: '',
    level: 'beginner',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();
  const courseId = params.id;

  useEffect(() => {
    const loadCourseDetails = async () => {
      try {
        const details = await fetchCourseDetails(courseId);
        setFormData(details);
      } catch (err) {
        setError('Failed to load course details. Please try again.');
      }
    };
    loadCourseDetails();
  }, [courseId]);

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
      
      console.log('Course updated:', courseId, formData);
      setSuccess('Course updated successfully!');

      // Redirect to course list after a short delay
      setTimeout(() => {
        router.push('/dashboard/instructor/courses');
      }, 2000);
    } catch (err) {
      setError('Failed to update course. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Edit Course</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Course Title</label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <Textarea
                  id="description"
                  name="description"
                  rows={4}
                  required
                  value={formData.description}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                <Input
                  id="category"
                  name="category"
                  type="text"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price ($)</label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  required
                  value={formData.price}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration (in hours)</label>
                <Input
                  id="duration"
                  name="duration"
                  type="number"
                  required
                  value={formData.duration}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
              <div>
                <label htmlFor="level" className="block text-sm font-medium text-gray-700">Level</label>
                <select
                  id="level"
                  name="level"
                  required
                  value={formData.level}
                  onChange={handleChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>
            <div className="mt-6">
              <Button type="submit" className="w-full">
                Update Course
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
};

export default EditCoursePage;
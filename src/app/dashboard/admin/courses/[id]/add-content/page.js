'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';

export default function AddCourseContentPage({ params }) {
  const [formData, setFormData] = useState({
    title: '',
    type: 'lesson',
    content: '',
    videoUrl: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();
  const courseId = params.id;

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
      
      console.log('Content added to course:', courseId, formData);
      setSuccess('Content added successfully!');
      
      // Reset form after successful submission
      setFormData({
        title: '',
        type: 'lesson',
        content: '',
        videoUrl: '',
      });

      // Redirect to course content list after a short delay
      setTimeout(() => {
        router.push(`/dashboard/admin/courses/${courseId}`);
      }, 2000);
    } catch (err) {
      setError('Failed to add content. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Add Course Content</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Content Title</label>
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
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">Content Type</label>
                <select
                  id="type"
                  name="type"
                  required
                  value={formData.type}
                  onChange={handleChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="lesson">Lesson</option>
                  <option value="quiz">Quiz</option>
                  <option value="assignment">Assignment</option>
                </select>
              </div>
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
                <Textarea
                  id="content"
                  name="content"
                  rows={4}
                  required
                  value={formData.content}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
              <div>
                <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-700">Video URL (optional)</label>
                <Input
                  id="videoUrl"
                  name="videoUrl"
                  type="url"
                  value={formData.videoUrl}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
            </div>
            <div className="mt-6">
              <Button type="submit" className="w-full">
                Add Content
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
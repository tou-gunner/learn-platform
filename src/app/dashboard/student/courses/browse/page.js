'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

const CourseCard = ({ course }) => (
  <Card>
    <CardHeader>
      <CardTitle>{course.title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-gray-500 mb-4">{course.description}</p>
      <p className="text-sm text-gray-500">Instructor: {course.instructor}</p>
      <p className="text-sm text-gray-500">Duration: {course.duration}</p>
      <p className="text-sm font-medium mt-2">Price: ${course.price}</p>
    </CardContent>
    <CardFooter>
        <Link href={`/courses/${course.id}`} passHref>
            <Button variant="secondary" >View Course</Button>
        </Link>
    </CardFooter>
  </Card>
);

const CourseBrowsePage = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // In a real application, fetch available courses from an API
    const fetchCourses = async () => {
      // Simulating API call
      const response = await new Promise(resolve => setTimeout(() => resolve([
        { id: 1, title: "Introduction to Machine Learning", description: "Learn the basics of machine learning algorithms", instructor: "Dr. Jane Smith", duration: "8 weeks", price: 79.99 },
        { id: 2, title: "Advanced React Patterns", description: "Master advanced React concepts and patterns", instructor: "John Doe", duration: "6 weeks", price: 89.99 },
        { id: 3, title: "Full-Stack Web Development", description: "Build complete web applications from front to back", instructor: "Alice Johnson", duration: "12 weeks", price: 129.99 },
        { id: 4, title: "Data Visualization with D3.js", description: "Create interactive data visualizations for the web", instructor: "Bob Williams", duration: "5 weeks", price: 69.99 },
      ]), 1000));
      setCourses(response);
    };

    fetchCourses();
  }, []);

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Browse Courses</h1>
      
      <div className="mb-6">
        <Input
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCourses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
      
      {filteredCourses.length === 0 && (
        <p className="text-center text-gray-500">No courses found matching your search.</p>
      )}

      <div className="flex justify-end">
        <Link href="/dashboard/student/courses">
          <Button variant="outline">Back to My Courses</Button>
        </Link>
      </div>
    </div>
  );
};

export default CourseBrowsePage;
'use client';

import { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';

const CourseCard = ({ course }) => (
  <Card>
    <CardHeader>
      <CardTitle>{course.title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-gray-500 mb-4">{course.description}</p>
      <div className="mb-2">
        <span className="text-sm font-medium">Progress:</span>
        <Progress value={course.progress} className="mt-2" />
      </div>
      <p className="text-sm text-gray-500">{course.lessonsCompleted} of {course.totalLessons} lessons completed</p>
    </CardContent>
    <CardFooter className="flex justify-between">
      <Link href={`/dashboard/student/courses/${course.id}`}>
        <Button variant="outline">View Details</Button>
      </Link>
      <Link href={`/dashboard/student/courses/${course.id}/learn`}>
        <Button>Continue Learning</Button>
      </Link>
    </CardFooter>
  </Card>
);

const StudentCoursesPage = () => {
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "React Basics",
      description: "Learn the fundamentals of React development",
      progress: 60,
      lessonsCompleted: 6,
      totalLessons: 10
    },
    {
      id: 2,
      title: "Advanced JavaScript",
      description: "Master advanced JavaScript concepts and patterns",
      progress: 30,
      lessonsCompleted: 3,
      totalLessons: 10
    },
    {
      id: 3,
      title: "Python for Data Science",
      description: "Introduction to Python for data analysis and visualization",
      progress: 10,
      lessonsCompleted: 1,
      totalLessons: 10
    },
    {
      id: 4,
      title: "Web Design Fundamentals",
      description: "Learn the basics of web design and user experience",
      progress: 0,
      lessonsCompleted: 0,
      totalLessons: 8
    }
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Courses</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
      
      <div className="flex justify-end">
        <Link href="/dashboard/student/courses/browse">
          <Button variant="outline">Browse More Courses</Button>
        </Link>
      </div>
    </div>
  );
};

export default StudentCoursesPage;
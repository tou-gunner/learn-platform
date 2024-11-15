'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';

const CourseDetailsPage = ({ params }) => {
  const [course, setCourse] = useState(null);
  const courseId = params.id;

  useEffect(() => {
    // In a real application, fetch course details from an API
    const fetchCourseDetails = async () => {
      // Simulating API call
      const response = await new Promise(resolve => setTimeout(() => resolve({
        id: courseId,
        title: "React Basics",
        description: "Learn the fundamentals of React development",
        instructor: "John Doe",
        totalLessons: 10,
        lessonsCompleted: 6,
        progress: 60,
        lessons: [
          { id: 1, title: "Introduction to React", completed: true },
          { id: 2, title: "Components and Props", completed: true },
          { id: 3, title: "State and Lifecycle", completed: true },
          { id: 4, title: "Handling Events", completed: true },
          { id: 5, title: "Conditional Rendering", completed: true },
          { id: 6, title: "Lists and Keys", completed: true },
          { id: 7, title: "Forms", completed: false },
          { id: 8, title: "Lifting State Up", completed: false },
          { id: 9, title: "Composition vs Inheritance", completed: false },
          { id: 10, title: "Thinking in React", completed: false },
        ]
      }), 1000));
      setCourse(response);
    };

    fetchCourseDetails();
  }, [courseId]);

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{course.title}</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Course Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">{course.description}</p>
          <p className="text-sm text-gray-500 mb-2">Instructor: {course.instructor}</p>
          <div className="mb-2">
            <span className="text-sm font-medium">Progress:</span>
            <Progress value={course.progress} className="mt-2" />
          </div>
          <p className="text-sm text-gray-500">{course.lessonsCompleted} of {course.totalLessons} lessons completed</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href={`/dashboard/student/courses/${course.id}/learn`}>
            <Button>Continue Learning</Button>
          </Link>
          <Link href={`/dashboard/student/courses/${course.id}/quizzes/1`}>
            <Button>Take Quiz: React Basics Quiz</Button>
          </Link>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lesson Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {course.lessons.map((lesson) => (
              <li key={lesson.id} className="flex items-center">
                <span className={`mr-2 ${lesson.completed ? 'text-green-500' : 'text-gray-400'}`}>
                  {lesson.completed ? '✓' : '○'}
                </span>
                <span className={lesson.completed ? 'text-gray-700' : 'text-gray-500'}>
                  {lesson.title}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseDetailsPage;
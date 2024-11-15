import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// This would typically come from a database or API call
async function getCourses() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return require('../../data/courses.json');
  return [
    { id: 1, title: 'Introduction to React', instructor: 'Jane Doe', level: 'Beginner', duration: '4 weeks', enrolled: 1234 },
    { id: 2, title: 'Advanced JavaScript Concepts', instructor: 'John Smith', level: 'Advanced', duration: '6 weeks', enrolled: 987 },
    { id: 3, title: 'Python for Data Science', instructor: 'Alice Johnson', level: 'Intermediate', duration: '8 weeks', enrolled: 2345 },
    { id: 4, title: 'Machine Learning Fundamentals', instructor: 'Bob Williams', level: 'Intermediate', duration: '10 weeks', enrolled: 876 },
    { id: 5, title: 'Web Development Bootcamp', instructor: 'Charlie Brown', level: 'Beginner', duration: '12 weeks', enrolled: 3456 },
    { id: 6, title: 'iOS App Development with Swift', instructor: 'Diana Prince', level: 'Intermediate', duration: '8 weeks', enrolled: 654 },
  ];
}

const CourseCard = ({ course }) => (
  <Card className="flex flex-col h-full">
    <CardHeader>
      <CardTitle>{course.title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-gray-600">Instructor: {course.instructor}</p>
      <p className="text-sm text-gray-600">Level: {course.level}</p>
      <p className="text-sm text-gray-600">Duration: {course.duration}</p>
      <p className="text-sm text-gray-600">{course.enrolled} students enrolled</p>
    </CardContent>
    <CardFooter className="mt-auto">
      <Link href={`/courses/${course.id}`} passHref>
        <Button variant="secondary" >View Course</Button>
      </Link>
    </CardFooter>
  </Card>
);

export default async function CourseListPage() {
  const courses = await getCourses();
  const session = await getServerSession(authOptions);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Available Courses</h1>
      
      {session && (
        <p className="mb-4">Welcome, {session.user.name}! Explore our courses below.</p>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
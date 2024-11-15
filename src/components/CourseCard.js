
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import Link from 'next/link';

export const CourseCard = ({ course }) => (
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
        <Button>View Course</Button>
      </Link>
    </CardFooter>
  </Card>
);
  
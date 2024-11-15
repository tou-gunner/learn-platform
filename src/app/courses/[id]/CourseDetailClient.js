'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CourseDetailClient({ course, canAccess }) {
  const { data: session } = useSession();
  const router = useRouter();

  const handlePurchase = () => {
    if (!session) {
      router.push('/auth/login');
      return;
    }
    router.push(`/payment?courseId=${course.id}`);
  };

  const handleEnroll = async () => {
    if (!session) {
      router.push('/auth/login');
      return;
    }
    // Here you would implement the enrollment logic
    console.log('Enrolling in course:', course.id);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>About this course</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{course.description}</p>
              <p className="text-sm text-gray-600">Instructor: {course.instructor}</p>
              <p className="text-sm text-gray-600">Duration: {course.duration}</p>
              <p className="text-sm text-gray-600">Level: {course.level}</p>
              <p className="text-sm text-gray-600">Enrolled students: {course.enrolledStudents}</p>
              <p className="text-sm text-gray-600">Rating: {course.rating} / 5</p>
            </CardContent>
          </Card>
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {course.lessons.map((lesson) => (
                  <li key={lesson.id} className="flex justify-between items-center">
                    <span>{lesson.title}</span>
                    <span className="text-sm text-gray-600">{lesson.duration}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardContent className="pt-6">
              <p className="text-3xl font-bold mb-4">${course.price}</p>
              {canAccess ? (
                <Button onClick={handleEnroll} className="w-full mb-4">Enroll Now</Button>
              ) : (
                <Button onClick={handlePurchase} className="w-full mb-4">Purchase Course</Button>
              )}
              <p className="text-sm text-gray-600 text-center">
                30-day money-back guarantee
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
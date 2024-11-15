'use client';

import { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';

const steps = [
  {
    title: "Create an Account",
    description: "Sign up for a new account or log in if you already have one.",
    action: "/signup"
  },
  {
    title: "Complete Your Profile",
    description: "Fill in your details and set your learning preferences.",
    action: "/dashboard/profile"
  },
  {
    title: "Browse Courses",
    description: "Explore our wide range of courses and find what interests you.",
    action: "/dashboard/student/courses/browse"
  },
  {
    title: "Enroll in a Course",
    description: "Choose a course and start your learning journey.",
    action: "/dashboard/student/courses"
  },
  {
    title: "Start Learning",
    description: "Dive into your first lesson and begin your educational adventure!",
    action: "/dashboard/student"
  }
];

export default function GetStartedPage() {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-center mb-8">Get Started with Our E-Learning Platform</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Step {currentStep + 1}: {steps[currentStep].title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-6">{steps[currentStep].description}</p>
          <Progress value={(currentStep + 1) / steps.length * 100} className="mb-4" />
          <p className="text-sm text-gray-500">Step {currentStep + 1} of {steps.length}</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={handlePrevious} disabled={currentStep === 0}>
            Previous
          </Button>
          <Link href={steps[currentStep].action}>
            <Button variant="outline">
              {currentStep === steps.length - 1 ? "Finish" : "Go to Step"}
            </Button>
          </Link>
          <Button onClick={handleNext} disabled={currentStep === steps.length - 1}>
            Next
          </Button>
        </CardFooter>
      </Card>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Quick Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {steps.map((step, index) => (
            <Link href={step.action} key={index}>
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle>{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
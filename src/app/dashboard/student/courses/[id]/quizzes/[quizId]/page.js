'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Quiz from '@/components/Quiz';
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Mock function to fetch quiz data
const fetchQuizData = async (quizId) => {
  // In a real application, this would be an API call
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
  return {
    id: quizId,
    title: "React Basics Quiz",
    questions: [
      {
        question: "What is React?",
        options: [
          "A JavaScript library for building user interfaces",
          "A programming language",
          "A database management system",
          "An operating system"
        ],
        correctAnswer: 0
      },
      {
        question: "Which of the following is used to render a list in React?",
        options: [
          "for loop",
          "map() function",
          "filter() function",
          "reduce() function"
        ],
        correctAnswer: 1
      },
      // Add more questions as needed
    ]
  };
};

export default function QuizPage({ params }) {
  const [quizData, setQuizData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { courseId, quizId } = params;

  useEffect(() => {
    const loadQuizData = async () => {
      try {
        const data = await fetchQuizData(quizId);
        setQuizData(data);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load quiz. Please try again.');
        setIsLoading(false);
      }
    };

    loadQuizData();
  }, [quizId]);

  const handleQuizComplete = (score) => {
    console.log(`Quiz completed with score: ${score}`);
    // Here you would typically send the score to your backend
    // and perhaps update the user's progress
  };

  if (isLoading) {
    return <div>Loading quiz...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{quizData.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <Quiz questions={quizData.questions} onComplete={handleQuizComplete} />
        </CardContent>
        <CardFooter>
          <Button onClick={() => router.push(`/dashboard/student/courses/${courseId}`)}>
            Back to Course
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
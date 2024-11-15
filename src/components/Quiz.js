import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';

const Quiz = ({ questions, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (answer) => {
    setAnswers({
      ...answers,
      [currentQuestionIndex]: answer,
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
      if (onComplete) {
        onComplete(calculateScore());
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    return (correctAnswers / questions.length) * 100;
  };

  if (showResults) {
    const score = calculateScore();
    return (
      <Card>
        <CardHeader>
          <CardTitle>Quiz Results</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold mb-4">Your Score: {score.toFixed(2)}%</p>
          <Progress value={score} className="w-full" />
          {questions.map((question, index) => (
            <div key={index} className="mt-4">
              <p className="font-semibold">{question.question}</p>
              <p className={answers[index] === question.correctAnswer ? "text-green-600" : "text-red-600"}>
                Your answer: {question.options[answers[index]]}
              </p>
              {answers[index] !== question.correctAnswer && (
                <p className="text-green-600">Correct answer: {question.options[question.correctAnswer]}</p>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle>Question {currentQuestionIndex + 1} of {questions.length}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg mb-4">{currentQuestion.question}</p>
        <RadioGroup onValueChange={handleAnswer} value={answers[currentQuestionIndex]?.toString()}>
          {currentQuestion.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <RadioGroupItem value={index.toString()} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={handlePrevious} disabled={currentQuestionIndex === 0}>Previous</Button>
        <Button onClick={handleNext}>
          {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Quiz;
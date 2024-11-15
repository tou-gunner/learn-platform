'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';

const AssignmentStatus = ({ status }) => {
  const statusStyles = {
    'Not Started': 'bg-gray-100 text-gray-800',
    'In Progress': 'bg-blue-100 text-blue-800',
    'Completed': 'bg-green-100 text-green-800',
    'Overdue': 'bg-red-100 text-red-800'
  };

  return (
    <Badge className={statusStyles[status]}>
      {status}
    </Badge>
  );
};

const AssignmentDetailPage = ({ params }) => {
  const [assignment, setAssignment] = useState(null);
  const [submission, setSubmission] = useState('');
  const [file, setFile] = useState(null);
  const assignmentId = params.id;

  useEffect(() => {
    // In a real application, fetch assignment details from an API
    const fetchAssignmentDetails = async () => {
      // Simulating API call
      const response = await new Promise(resolve => setTimeout(() => resolve({
        id: assignmentId,
        title: "React Component Structure",
        course: "React Basics",
        description: "Create a complex React component with proper structure and props management.",
        dueDate: "2023-06-15",
        status: "In Progress",
        maxScore: 100,
        currentScore: null,
      }), 1000));
      setAssignment(response);
    };

    fetchAssignmentDetails();
  }, [assignmentId]);

  const handleSubmissionChange = (e) => {
    setSubmission(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // In a real application, you would send the submission to your API here
    console.log('Submitting assignment:', { assignmentId, submission, file });
    // Update assignment status
    setAssignment({ ...assignment, status: 'Completed' });
  };

  if (!assignment) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{assignment.title}</h1>
        <AssignmentStatus status={assignment.status} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Assignment Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p><strong>Course:</strong> {assignment.course}</p>
          <p><strong>Due Date:</strong> {new Date(assignment.dueDate).toLocaleDateString()}</p>
          <p><strong>Description:</strong> {assignment.description}</p>
          {assignment.currentScore !== null && (
            <div>
              <p><strong>Score:</strong> {assignment.currentScore} / {assignment.maxScore}</p>
              <Progress value={(assignment.currentScore / assignment.maxScore) * 100} className="mt-2" />
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Submit Assignment</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="submission" className="block text-sm font-medium text-gray-700">
                Your Answer
              </label>
              <Textarea
                id="submission"
                value={submission}
                onChange={handleSubmissionChange}
                rows={6}
                className="mt-1"
                placeholder="Type your answer here..."
              />
            </div>
            <div>
              <label htmlFor="file" className="block text-sm font-medium text-gray-700">
                Attach File (optional)
              </label>
              <Input
                id="file"
                type="file"
                onChange={handleFileChange}
                className="mt-1"
              />
            </div>
            <Button type="submit" disabled={assignment.status === 'Completed'}>
              {assignment.status === 'Completed' ? 'Submitted' : 'Submit Assignment'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Link href="/dashboard/student/assignments">
          <Button variant="outline">Back to Assignments</Button>
        </Link>
      </div>
    </div>
  );
};

export default AssignmentDetailPage;
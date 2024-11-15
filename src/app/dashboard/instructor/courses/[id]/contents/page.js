'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Link from 'next/link';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// Mock function to fetch course contents
const fetchCourseContents = async (courseId) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return [
    { id: '1', title: 'Introduction', type: 'lesson', order: 1 },
    { id: '2', title: 'Basic Concepts', type: 'lesson', order: 2 },
    { id: '3', title: 'Quiz 1', type: 'quiz', order: 3 },
    { id: '4', title: 'Advanced Topics', type: 'lesson', order: 4 },
    { id: '5', title: 'Final Assignment', type: 'assignment', order: 5 },
  ];
};

export default function CourseContentsPage({ params }) {
  const [contents, setContents] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();
  const courseId = params.id;

  useEffect(() => {
    const loadContents = async () => {
      try {
        const data = await fetchCourseContents(courseId);
        setContents(data);
      } catch (err) {
        setError('Failed to load course contents. Please try again.');
      }
    };
    loadContents();
  }, [courseId]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(contents);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const updatedItems = items.map((item, index) => ({
      ...item,
      order: index + 1,
    }));

    setContents(updatedItems);
    // Here you would typically make an API call to update the order in the backend
    setSuccess('Content order updated successfully!');
  };

  const getContentTypeIcon = (type) => {
    switch (type) {
      case 'lesson':
        return '📚';
      case 'quiz':
        return '❓';
      case 'assignment':
        return '📝';
      default:
        return '📄';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Course Contents</h1>
        <Link href={`/dashboard/instructor/courses/${courseId}/add-content`}>
          <Button>Add New Content</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Contents List</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert className="mb-4">
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="contents">
              {(provided) => (
                <ul {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                  {contents.map((content, index) => (
                    <Draggable key={content.id} draggableId={content.id} index={index}>
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="flex items-center justify-between p-3 bg-white border rounded shadow-sm"
                        >
                          <div className="flex items-center space-x-3">
                            <span>{getContentTypeIcon(content.type)}</span>
                            <span>{content.title}</span>
                          </div>
                          <div className="space-x-2">
                            <Link href={`/dashboard/instructor/courses/${courseId}/contents/${content.id}/edit`}>
                              <Button variant="outline" size="sm">Edit</Button>
                            </Link>
                            <Button variant="destructive" size="sm">Delete</Button>
                          </div>
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </CardContent>
      </Card>
    </div>
  );
}
// app/dashboard/student/courses/[courseId]/learn/page.js
'use client';

import { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import VideoPlayer from '@/components/VideoPlayer';
import { mockLearningPageData } from '@/data/learningPageData';

export default function LearningPage({ params }) {
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [newNote, setNewNote] = useState('');
  const [showCaptions, setShowCaptions] = useState(false);
  const courseData = mockLearningPageData; // In a real app, you'd fetch this based on params.courseId

  const currentModule = courseData.modules[currentModuleIndex];
  const currentLesson = currentModule.lessons[currentLessonIndex];

  const handleNextLesson = () => {
    if (currentLessonIndex < currentModule.lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
    } else if (currentModuleIndex < courseData.modules.length - 1) {
      setCurrentModuleIndex(currentModuleIndex + 1);
      setCurrentLessonIndex(0);
    }
  };

  const handlePreviousLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
    } else if (currentModuleIndex > 0) {
      setCurrentModuleIndex(currentModuleIndex - 1);
      setCurrentLessonIndex(courseData.modules[currentModuleIndex - 1].lessons.length - 1);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    // Implement search logic here
  };

  const handleAddNote = () => {
    // Implement note-adding logic here
    console.log('New note:', newNote);
    setNewNote('');
  };

  const handleAddBookmark = (time) => {
    // Implement bookmark-adding logic here
    console.log('New bookmark at:', time);
  };

  const handleDownload = (resource) => {
    // Implement download logic here
    console.log('Downloading:', resource.title);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{courseData.courseTitle}</h1>
      
      <div className="flex justify-between items-center">
        <Input 
          type="text" 
          placeholder="Search in course content..." 
          value={searchTerm} 
          onChange={handleSearch}
          className="max-w-xs"
        />
        <div>
          {courseData.badges.map(badge => (
            <Badge key={badge.id} variant="secondary" className="ml-2">
              {badge.title}
            </Badge>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{currentModule.title} - {currentLesson.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="content">
            <TabsList>
              <TabsTrigger value="content">Lesson Content</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="discussion">Discussion</TabsTrigger>
            </TabsList>
            <TabsContent value="content">
              {currentLesson.type === 'video' ? (
                <div>
                  <VideoPlayer 
                    src={currentLesson.content.videoUrl} 
                    onTimeUpdate={(time) => console.log('Video time:', time)}
                    onAddBookmark={handleAddBookmark}
                    captions={currentLesson.content.captions}
                    showCaptions={showCaptions}
                  />
                  <div className="mt-4">
                    <Button onClick={() => setShowCaptions(!showCaptions)}>
                      {showCaptions ? 'Hide' : 'Show'} Captions
                    </Button>
                    {showCaptions && (
                      <div className="mt-2 p-2 bg-gray-100 rounded">
                        {currentLesson.content.captions.map((caption, index) => (
                          <p key={index}>{caption.text}</p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="prose max-w-none">
                  <p>{currentLesson.content.body}</p>
                </div>
              )}
            </TabsContent>
            <TabsContent value="resources">
              <ul>
                {currentLesson.resources.map(resource => (
                  <li key={resource.id} className="flex justify-between items-center mb-2">
                    <span>{resource.title}</span>
                    <Button onClick={() => handleDownload(resource)}>Download</Button>
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="notes">
              <div className="space-y-4">
                <div>
                  <Textarea 
                    placeholder="Add a new note..." 
                    value={newNote} 
                    onChange={(e) => setNewNote(e.target.value)}
                  />
                  <Button onClick={handleAddNote} className="mt-2">Add Note</Button>
                </div>
                <ul>
                  {currentLesson.notes.map(note => (
                    <li key={note.id} className="bg-gray-100 p-2 rounded">
                      <p>{note.content}</p>
                      <small>{new Date(note.timestamp).toLocaleString()}</small>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="discussion">
              <div className="space-y-4">
                {courseData.discussions
                  .filter(discussion => discussion.lessonId === currentLesson.id)
                  .map(discussion => (
                    <div key={discussion.id} className="bg-gray-100 p-2 rounded">
                      <p><strong>{discussion.user}:</strong> {discussion.content}</p>
                      <small>{new Date(discussion.timestamp).toLocaleString()}</small>
                      {discussion.replies.map(reply => (
                        <div key={reply.id} className="ml-4 mt-2">
                          <p><strong>{reply.user}:</strong> {reply.content}</p>
                          <small>{new Date(reply.timestamp).toLocaleString()}</small>
                        </div>
                      ))}
                    </div>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button onClick={handlePreviousLesson} disabled={currentModuleIndex === 0 && currentLessonIndex === 0}>
          Previous Lesson
        </Button>
        <Button onClick={handleNextLesson} disabled={currentModuleIndex === courseData.modules.length - 1 && currentLessonIndex === currentModule.lessons.length - 1}>
          Next Lesson
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Course Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={(courseData.progress.completedLessons / courseData.progress.totalLessons) * 100} className="mb-2" />
          <p className="text-sm text-gray-500">
            {courseData.progress.completedLessons} of {courseData.progress.totalLessons} lessons completed
          </p>
        </CardContent>
        <CardFooter>
          {courseData.certificates.map(cert => (
            <Button key={cert.id} onClick={() => window.open(cert.url, '_blank')}>
              View Certificate: {cert.title}
            </Button>
          ))}
        </CardFooter>
      </Card>
    </div>
  );
}
// app/lib/mockData/learningPageData.js

export const mockLearningPageData = {
    courseId: "course-123",
    courseTitle: "Introduction to React",
    modules: [
      {
        id: "module-1",
        title: "Getting Started with React",
        lessons: [
          {
            id: "lesson-1-1",
            title: "What is React?",
            type: "video",
            content: {
              videoUrl: "https://example.com/videos/intro-to-react.mp4",
              duration: 600, // 10 minutes
              transcript: "In this lesson, we'll cover the basics of React...",
              captions: [
                { start: 0, end: 5, text: "Welcome to Introduction to React" },
                { start: 5, end: 10, text: "React is a JavaScript library for building user interfaces" },
                // ... more captions
              ],
            },
            resources: [
              { id: "resource-1-1", title: "React Documentation", type: "link", url: "https://reactjs.org/docs/getting-started.html" },
              { id: "resource-1-2", title: "Lesson Slides", type: "pdf", url: "https://example.com/slides/intro-to-react.pdf" },
            ],
            completed: true,
            bookmarks: [
              { id: "bookmark-1-1", time: 120, note: "Important definition of React" },
              { id: "bookmark-1-2", time: 300, note: "Key features of React" },
            ],
            notes: [
              { id: "note-1-1", content: "React uses a virtual DOM for efficient updates", timestamp: "2023-06-10T14:30:00Z" },
              { id: "note-1-2", content: "Components are the building blocks of React applications", timestamp: "2023-06-10T14:35:00Z" },
            ],
          },
          // ... other lessons
        ],
        quiz: {
          id: "quiz-1",
          title: "Module 1 Quiz",
          questions: [
            {
              id: "q1-1",
              type: "multiple-choice",
              question: "What is React?",
              options: [
                "A JavaScript library for building user interfaces",
                "A programming language",
                "A database management system",
                "An operating system",
              ],
              correctAnswer: 0,
            },
            {
              id: "q1-2",
              type: "true-false",
              question: "React can only be used for web development.",
              correctAnswer: false,
            },
          ],
          completed: false,
        },
      },
      // ... other modules
    ],
    progress: {
      completedLessons: 2,
      totalLessons: 5,
      completedQuizzes: 0,
      totalQuizzes: 1,
      completedAssignments: 0,
      totalAssignments: 1,
    },
    discussions: [
      {
        id: "discussion-1",
        lessonId: "lesson-1-1",
        user: "Alice",
        content: "Can someone explain the virtual DOM concept in more detail?",
        timestamp: "2023-06-11T10:00:00Z",
        replies: [
          {
            id: "reply-1",
            user: "Bob",
            content: "The virtual DOM is a lightweight copy of the actual DOM. React uses it to...",
            timestamp: "2023-06-11T10:30:00Z",
          },
        ],
      },
    ],
    certificates: [
      {
        id: "cert-1",
        title: "React Fundamentals",
        issueDate: "2023-07-01T00:00:00Z",
        url: "https://example.com/certificates/react-fundamentals.pdf",
      },
    ],
    badges: [
      {
        id: "badge-1",
        title: "Quick Starter",
        description: "Completed first module within 24 hours",
        dateEarned: "2023-06-09T00:00:00Z",
      },
    ],
  };
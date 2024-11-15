import CourseDetailClient from './CourseDetailClient';

async function getCourse(id) {
  // This would be replaced with an actual API call
  const courses = require('../../../data/courses.json');
  return courses.find((e) => e.id == id);
  return {
    id,
    title: 'Introduction to React',
    instructor: 'Jane Doe',
    description: 'Learn the fundamentals of React, including components, state, and props.',
    duration: '6 weeks',
    level: 'Beginner',
    price: 49.99,
    enrolledStudents: 1234,
    rating: 4.7,
    lessons: [
      { id: 1, title: 'React Basics', duration: '1 hour' },
      { id: 2, title: 'Components and Props', duration: '1.5 hours' },
      { id: 3, title: 'State and Lifecycle', duration: '2 hours' },
      // ... more lessons
    ]
  };
}

export default async function CourseDetailPage({ params }) {
  const course = await getCourse(params.id);

  return <CourseDetailClient course={course} />;
}

export async function generateMetadata({ params }) {
  const course = await getCourse(params.id);
  return {
    title: course.title,
    description: course.description,
  };
}
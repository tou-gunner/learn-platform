import { NextResponse } from 'next/server';

export async function POST(request, { params }) {
  // Logic to enroll a user in a course
  return NextResponse.json({ message: 'Enrolled in course', courseId: params.id });
}

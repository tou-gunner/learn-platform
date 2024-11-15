import { NextResponse } from 'next/server';

export async function GET(request) {
  // Logic to fetch all courses
  return NextResponse.json({ courses: [] });
}

export async function POST(request) {
  // Logic to create a new course
  const data = await request.json();
  return NextResponse.json({ message: 'Course created', course: data }, { status: 201 });
}

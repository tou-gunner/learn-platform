import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  // Logic to fetch a specific course
  return NextResponse.json({ course: { id: params.id } });
}

export async function PUT(request, { params }) {
  // Logic to update a specific course
  const data = await request.json();
  return NextResponse.json({ message: 'Course updated', course: { id: params.id, ...data } });
}

export async function DELETE(request, { params }) {
  // Logic to delete a specific course
  return NextResponse.json({ message: 'Course deleted', id: params.id });
}

import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  // Logic to fetch a specific user
  return NextResponse.json({ user: { id: params.id } });
}

export async function PUT(request, { params }) {
  // Logic to update a specific user
  const data = await request.json();
  return NextResponse.json({ message: 'User updated', user: { id: params.id, ...data } });
}

export async function DELETE(request, { params }) {
  // Logic to delete a specific user
  return NextResponse.json({ message: 'User deleted', id: params.id });
}

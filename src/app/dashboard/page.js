import { redirect } from 'next/navigation';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/login');
  }

  switch (session.user.role) {
    case 'student':
      redirect('/dashboard/student');
    case 'instructor':
      redirect('/dashboard/instructor');
    case 'admin':
      redirect('/dashboard/admin');
    default:
      redirect('/');
  }
}
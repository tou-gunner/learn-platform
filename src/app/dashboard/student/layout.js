import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const StudentDashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-primary">Student Dashboard</h1>
        </div>
        <nav className="mt-6">
          <ul className="space-y-2">
            <li>
              <Link href="/dashboard/student" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">
                Overview
              </Link>
            </li>
            <li>
              <Link href="/dashboard/student/courses" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">
                My Courses
              </Link>
            </li>
            <li>
              <Link href="/dashboard/student/assignments" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">
                My Assignments
              </Link>
            </li>
            <li>
              <Link href="/dashboard/student/progress" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">
                Progress
              </Link>
            </li>
            <li>
              <Link href="/dashboard/student/certificates" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">
                Certificates
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default StudentDashboardLayout;
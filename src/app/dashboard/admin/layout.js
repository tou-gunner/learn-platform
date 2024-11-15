// app/dashboard/admin/layout.js
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const AdminDashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-primary">Admin Dashboard</h1>
        </div>
        <nav className="mt-6">
          <ul className="space-y-2">
            <li>
              <Link href="/dashboard/admin" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">
                Overview
              </Link>
            </li>
            <li>
              <Link href="/dashboard/admin/users" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">
                User Management
              </Link>
            </li>
            <li>
              <Link href="/dashboard/admin/courses" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">
                Course Management
              </Link>
            </li>
            <li>
              <Link href="/dashboard/admin/reports" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">
                Reports
              </Link>
            </li>
            <li>
              <Link href="/dashboard/admin/settings" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">
                Settings
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

export default AdminDashboardLayout;
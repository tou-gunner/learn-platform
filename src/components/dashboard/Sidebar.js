'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { 
  Laptop, 
  Users, 
  BarChart, 
  BookOpen, 
  FileText, 
  Settings, 
  LogOut 
} from 'lucide-react';

const SidebarLink = ({ href, children, icon: Icon }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
      isActive
        ? 'bg-gray-200 text-gray-900'
        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
    }`}>
      {Icon && <Icon className="mr-3 h-6 w-6" />}
      {children}
    </Link>
  );
};

const Sidebar = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const studentLinks = [
    { href: '/dashboard/student', label: 'Dashboard', icon: Laptop },
    { href: '/dashboard/student/courses', label: 'My Courses', icon: BookOpen },
    { href: '/dashboard/student/progress', label: 'My Progress', icon: BarChart },
  ];

  const instructorLinks = [
    { href: '/dashboard/instructor', label: 'Dashboard', icon: Laptop },
    { href: '/dashboard/instructor/courses', label: 'My Courses', icon: BookOpen },
    { href: '/dashboard/instructor/analytics', label: 'Analytics', icon: BarChart },
  ];

  const adminLinks = [
    { href: '/dashboard/admin', label: 'Dashboard', icon: Laptop },
    { href: '/dashboard/admin/users', label: 'Users', icon: Users },
    { href: '/dashboard/admin/courses', label: 'Courses', icon: BookOpen },
  ];

  const links = session?.user.role === 'student' 
    ? studentLinks 
    : session?.user.role === 'instructor'
    ? instructorLinks
    : adminLinks;

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-20 p-2 rounded-md bg-gray-200"
        onClick={toggleSidebar}
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div className={`fixed inset-y-0 left-0 z-10 w-64 bg-white shadow-lg transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <div className="flex items-center justify-center h-16 bg-gray-900">
          <span className="text-white text-xl font-semibold">LearnHub</span>
        </div>

        <nav className="mt-5">
          <div className="px-2 space-y-1">
            {links.map((link) => (
              <SidebarLink key={link.href} href={link.href} icon={link.icon}>
                {link.label}
              </SidebarLink>
            ))}
          </div>
        </nav>

        <div className="absolute bottom-0 w-full">
          <div className="px-2 space-y-1">
            <SidebarLink href="/settings" icon={Settings}>
              Settings
            </SidebarLink>
            <button
              onClick={() => signOut()}
              className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-md"
            >
              <LogOut className="mr-3 h-6 w-6" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
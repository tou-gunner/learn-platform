
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const Navigation = () => {
  const router = useRouter();

  const isActive = (pathname) => router.pathname === pathname;

  return (
    <nav className="bg-gray-100 p-4">
      <ul className="flex space-x-4">
        <li>
          <Link href="/dashboard" className={`${isActive('/dashboard') ? 'text-blue-600 font-bold' : 'text-gray-600'} hover:text-blue-600`}>
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/courses" className={`${isActive('/courses') ? 'text-blue-600 font-bold' : 'text-gray-600'} hover:text-blue-600`}>
            Courses
          </Link>
        </li>
        <li>
          <Link href="/profile" className={`${isActive('/profile') ? 'text-blue-600 font-bold' : 'text-gray-600'} hover:text-blue-600`}>
            Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
};
  
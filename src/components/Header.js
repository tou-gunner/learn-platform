'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { Button } from './ui/button';

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary_accent"><Image width={30} height={30} src="/static/icons/logo.png" alt="logo" className="inline-block" /> {process.env.NEXT_PUBLIC_APP_NAME}</Link>
        <div className="space-x-4">
          <Link href="/pricing" className="font-bold text-gray-600 hover:text-secondary">
            Pricing
          </Link>
          <Link href="/courses" className="font-bold text-gray-600 hover:text-secondary">
            Courses
          </Link>
          {session ? (
            <>
              <Link href="/dashboard" className="font-bold text-gray-600 hover:text-secondary">
                Dashboard
              </Link>
              <Button onClick={() => signOut()}>Sign Out</Button>
            </>
          ) : (
            <Link href="/auth/login" passHref>
              <Button className="px-4 py-2">Sign In</Button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};
  
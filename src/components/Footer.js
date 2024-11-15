
import React from 'react';
import Link from 'next/link';

export const Footer = () => (
  <footer className="bg-gray-100 mt-auto">
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap justify-between">
        <div className="w-full md:w-1/4 mb-4 md:mb-0">
          <h2 className="text-lg font-semibold mb-4">LearnHub</h2>
          <p className="text-gray-600">Empowering learners worldwide</p>
        </div>
        <div className="w-full md:w-1/4 mb-4 md:mb-0">
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="/courses" className="text-gray-600 hover:text-blue-600">Courses</Link></li>
            <li><Link href="/about" className="text-gray-600 hover:text-blue-600">About Us</Link></li>
            <li><Link href="/contact" className="text-gray-600 hover:text-blue-600">Contact</Link></li>
          </ul>
        </div>
        <div className="w-full md:w-1/4 mb-4 md:mb-0">
          <h3 className="text-lg font-semibold mb-4">Legal</h3>
          <ul className="space-y-2">
            <li><Link href="/terms" className="text-gray-600 hover:text-blue-600">Terms of Service</Link></li>
            <li><Link href="/privacy" className="text-gray-600 hover:text-blue-600">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-gray-200 text-center">
        <p className="text-gray-600">&copy; {new Date().getFullYear()} LearnHub. All rights reserved.</p>
      </div>
    </div>
  </footer>
);
  
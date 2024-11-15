import React from 'react';
import Link from 'next/link';
import { Search, Book, Users, Award } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const FeaturedCourse = ({ title, instructor, rating, students }) => (
  <div className="flex flex-col bg-white rounded-lg shadow-md p-4">
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 mb-2">by {instructor}</p>
    <div className="flex items-center justify-between">
      <span className="text-yellow-500">★★★★☆ {rating}</span>
      <span className="text-gray-600">{students} students</span>
    </div>
    <div className="flex-grow" ></div>
    <div className="w-full text-right mt-2">
      <Link href={`/courses/1`} passHref>
        <Button variant="secondary" >View Course</Button>
      </Link>
    </div>
  </div>
);

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
    <Icon className="w-12 h-12 text-blue-500 mb-4" />
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <main>
        {/* Hero Section */}
        <section className="bg-blue-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">Unlock Your Potential with LearnHub</h2>
            <p className="text-xl mb-8">Discover courses taught by industry experts and take your skills to the next level</p>
            <div className="max-w-md mx-auto">
              <div className="flex bg-white rounded-md overflow-hidden">
                <input type="text" placeholder="What do you want to learn?" className="flex-grow p-3 text-gray-800 focus:outline-none" />
                <button className="bg-yellow-500 text-white p-3">
                  <Search className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Courses Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Featured Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeaturedCourse title="Introduction to Machine Learning" instructor="Dr. Jane Smith" rating="4.8" students="12,345" />
              <FeaturedCourse title="Web Development Bootcamp" instructor="John Doe" rating="4.7" students="8,901" />
              <FeaturedCourse title="Digital Marketing Mastery" instructor="Emily Johnson" rating="4.9" students="6,789" />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-gray-200 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Why Choose LearnHub?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard 
                icon={Book}
                title="Expert-led Courses"
                description="Learn from industry professionals and gain real-world skills"
              />
              <FeatureCard 
                icon={Users}
                title="Collaborative Learning"
                description="Engage with peers and instructors in our vibrant community"
              />
              <FeatureCard 
                icon={Award}
                title="Recognized Certificates"
                description="Earn certificates to showcase your newly acquired skills"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
            <p className="text-xl mb-8">Join thousands of learners and advance your career today</p>
            <a href="/get-started" className="bg-yellow-500 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-yellow-600">Get Started</a>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">LearnHub</h3>
              <p className="text-gray-400">Empowering learners worldwide</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Courses</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">All Courses</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Web Development</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Data Science</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Business</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Press</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p className="text-gray-400">&copy; 2024 LearnHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
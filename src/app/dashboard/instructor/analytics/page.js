'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

const InstructorAnalyticsPage = () => {
  const [enrollmentData, setEnrollmentData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [coursePerformanceData, setCoursePerformanceData] = useState([]);

  useEffect(() => {
    // Simulated API calls
    setEnrollmentData([
      { month: 'Jan', enrollments: 50 },
      { month: 'Feb', enrollments: 80 },
      { month: 'Mar', enrollments: 120 },
      { month: 'Apr', enrollments: 100 },
      { month: 'May', enrollments: 150 },
      { month: 'Jun', enrollments: 180 },
    ]);

    setRevenueData([
      { month: 'Jan', revenue: 500 },
      { month: 'Feb', revenue: 800 },
      { month: 'Mar', revenue: 1200 },
      { month: 'Apr', revenue: 1000 },
      { month: 'May', revenue: 1500 },
      { month: 'Jun', revenue: 1800 },
    ]);

    setCoursePerformanceData([
      { name: 'React Basics', students: 150, rating: 4.5 },
      { name: 'Advanced JavaScript', students: 120, rating: 4.8 },
      { name: 'Python for Beginners', students: 200, rating: 4.2 },
    ]);
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Analytics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Enrollment Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={enrollmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="enrollments" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#82ca9d" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Course Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={coursePerformanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="students" fill="#8884d8" name="Students" />
              <Bar yAxisId="right" dataKey="rating" fill="#82ca9d" name="Rating" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default InstructorAnalyticsPage;
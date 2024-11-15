'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

// Mock data (replace with API calls in a real application)
const revenueData = [
  { month: 'Jan', revenue: 4000 },
  { month: 'Feb', revenue: 3000 },
  { month: 'Mar', revenue: 5000 },
  { month: 'Apr', revenue: 4500 },
  { month: 'May', revenue: 6000 },
  { month: 'Jun', revenue: 5500 },
];

const courseEnrollmentData = [
  { name: 'React Basics', students: 120 },
  { name: 'Advanced JavaScript', students: 80 },
  { name: 'Python for Beginners', students: 150 },
  { name: 'Data Science Fundamentals', students: 100 },
  { name: 'Web Development Bootcamp', students: 200 },
];

const userTypeData = [
  { name: 'Students', value: 700 },
  { name: 'Instructors', value: 50 },
  { name: 'Admins', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

export default function ReportCharts({ reportType }) {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        switch (reportType) {
          case 'monthlyRevenue':
            setData(revenueData);
            break;
          case 'courseEnrollments':
            setData(courseEnrollmentData);
            break;
          case 'userTypes':
            setData(userTypeData);
            break;
          default:
            setError('Invalid report type');
        }
      } catch (err) {
        setError('Failed to load report data. Please try again.');
      }
    };

    fetchData();
  }, [reportType]);

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  const renderChart = () => {
    switch (reportType) {
      case 'monthlyRevenue':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Monthly Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        );
      case 'courseEnrollments':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Course Enrollments</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="students" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        );
      case 'userTypes':
        return (
          <Card>
            <CardHeader>
              <CardTitle>User Types Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return renderChart();
}
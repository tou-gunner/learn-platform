'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const ProgressCard = ({ title, value, description }) => (
  <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <Progress value={value} className="mb-2" />
      <p className="text-sm text-gray-500">{description}</p>
    </CardContent>
  </Card>
);

const StudentProgressPage = () => {
  const [progressData, setProgressData] = useState(null);

  useEffect(() => {
    // In a real application, fetch progress data from an API
    const fetchProgressData = async () => {
      // Simulating API call
      const response = await new Promise(resolve => setTimeout(() => resolve({
        overallProgress: 68,
        coursesCompleted: 3,
        totalCourses: 5,
        averageScore: 85,
        learningStreak: 15,
        skillProgress: [
          { skill: "React", progress: 75 },
          { skill: "JavaScript", progress: 90 },
          { skill: "Python", progress: 60 },
          { skill: "Data Science", progress: 40 },
        ],
        recentAchievements: [
          "Completed React Basics course",
          "Achieved 100% score in JavaScript quiz",
          "Started learning Data Science",
        ],
      }), 1000));
      setProgressData(response);
    };

    fetchProgressData();
  }, []);

  if (!progressData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Progress</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProgressCard
          title="Overall Progress"
          value={progressData.overallProgress}
          description={`${progressData.overallProgress}% of your learning goals completed`}
        />
        <ProgressCard
          title="Courses Completed"
          value={(progressData.coursesCompleted / progressData.totalCourses) * 100}
          description={`${progressData.coursesCompleted} out of ${progressData.totalCourses} courses completed`}
        />
        <ProgressCard
          title="Average Score"
          value={progressData.averageScore}
          description={`Your average score across all quizzes and assignments`}
        />
        <ProgressCard
          title="Learning Streak"
          value={(progressData.learningStreak / 30) * 100}
          description={`${progressData.learningStreak} day streak. Keep it up!`}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Skill Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {progressData.skillProgress.map((skill) => (
              <div key={skill.skill}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">{skill.skill}</span>
                  <span className="text-sm text-gray-500">{skill.progress}%</span>
                </div>
                <Progress value={skill.progress} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            {progressData.recentAchievements.map((achievement, index) => (
              <li key={index} className="text-sm text-gray-600">{achievement}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentProgressPage;
import React, { useState } from 'react';
import { TrendingUp, Calendar, Target, Award, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

const Analytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const periods = [
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'year', label: 'This Year' }
  ];

  const stats = {
    week: {
      routinesCompleted: 18,
      habitsCompleted: 45,
      completionRate: 86,
      totalTime: '12h 30m'
    },
    month: {
      routinesCompleted: 72,
      habitsCompleted: 180,
      completionRate: 82,
      totalTime: '52h 15m'
    },
    year: {
      routinesCompleted: 864,
      habitsCompleted: 2160,
      completionRate: 78,
      totalTime: '625h'
    }
  };

  const currentStats = stats[selectedPeriod as keyof typeof stats];

  const weeklyData = [
    { day: 'Mon', routines: 4, habits: 8 },
    { day: 'Tue', routines: 3, habits: 7 },
    { day: 'Wed', routines: 4, habits: 8 },
    { day: 'Thu', routines: 2, habits: 6 },
    { day: 'Fri', routines: 3, habits: 8 },
    { day: 'Sat', routines: 2, habits: 4 },
    { day: 'Sun', routines: 0, habits: 4 }
  ];

  const topCategories = [
    { name: 'Health & Fitness', completed: 45, total: 56, color: 'bg-green-500' },
    { name: 'Work & Productivity', completed: 32, total: 40, color: 'bg-blue-500' },
    { name: 'Learning', completed: 28, total: 35, color: 'bg-purple-500' },
    { name: 'Personal Care', completed: 22, total: 28, color: 'bg-orange-500' },
    { name: 'Social', completed: 15, total: 21, color: 'bg-pink-500' }
  ];

  const achievements = [
    { 
      title: '30-Day Streak Master', 
      description: 'Completed habits for 30 consecutive days',
      date: '2 days ago',
      icon: '🔥'
    },
    { 
      title: 'Morning Warrior', 
      description: 'Completed morning routine 20 times',
      date: '1 week ago',
      icon: '🌅'
    },
    { 
      title: 'Consistency Champion', 
      description: 'Maintained 80%+ completion rate for a month',
      date: '2 weeks ago',
      icon: '⭐'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Analytics
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Track your progress and insights
        </p>
      </div>

      {/* Period Selector */}
      <div className="flex gap-2 mb-8">
        {periods.map((period) => (
          <button
            key={period.id}
            onClick={() => setSelectedPeriod(period.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedPeriod === period.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            {period.label}
          </button>
        ))}
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Routines</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {currentStats.routinesCompleted}
                </p>
                <p className="text-xs text-green-600">+12% from last period</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Habits</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {currentStats.habitsCompleted}
                </p>
                <p className="text-xs text-green-600">+8% from last period</p>
              </div>
              <Target className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Success Rate</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {currentStats.completionRate}%
                </p>
                <p className="text-xs text-red-600">-2% from last period</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Time Spent</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {currentStats.totalTime}
                </p>
                <p className="text-xs text-green-600">+15% from last period</p>
              </div>
              <BarChart3 className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Weekly Activity Chart */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyData.map((day) => (
                  <div key={day.day} className="flex items-center gap-4">
                    <div className="w-8 text-sm font-medium text-gray-600 dark:text-gray-400">
                      {day.day}
                    </div>
                    <div className="flex-1 flex gap-2">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-600">Routines</span>
                          <span className="text-xs font-medium">{day.routines}</span>
                        </div>
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-500 rounded-full"
                            style={{ width: `${(day.routines / 4) * 100}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-600">Habits</span>
                          <span className="text-xs font-medium">{day.habits}</span>
                        </div>
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-green-500 rounded-full"
                            style={{ width: `${(day.habits / 8) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Categories */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Top Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topCategories.map((category) => (
                  <div key={category.name}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {category.name}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {category.completed}/{category.total}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${category.color} rounded-full`}
                        style={{ width: `${(category.completed / category.total) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Achievements */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-yellow-600" />
            Recent Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {achievements.map((achievement) => (
              <div key={achievement.title} className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-2xl">{achievement.icon}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {achievement.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    {achievement.description}
                  </p>
                  <Badge variant="secondary" className="text-xs">
                    {achievement.date}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
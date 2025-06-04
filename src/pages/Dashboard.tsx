import React from 'react';
import { Plus, Calendar, Target, TrendingUp, Check } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Progress } from '../components/ui/progress';

const Dashboard = () => {
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const todayRoutines = [
    { id: 1, name: 'Morning Workout', time: '7:00 AM', completed: true, category: 'Health' },
    { id: 2, name: 'Read for 30 minutes', time: '8:30 AM', completed: false, category: 'Learning' },
    { id: 3, name: 'Team Meeting', time: '10:00 AM', completed: false, category: 'Work' },
    { id: 4, name: 'Meditate', time: '7:00 PM', completed: false, category: 'Wellness' },
  ];

  const habits = [
    { id: 1, name: 'Drink 8 glasses of water', streak: 12, completed: false },
    { id: 2, name: 'Take vitamins', streak: 8, completed: true },
    { id: 3, name: 'Journal writing', streak: 5, completed: false },
  ];

  const completedRoutines = todayRoutines.filter(r => r.completed).length;
  const totalRoutines = todayRoutines.length;
  const progressPercentage = (completedRoutines / totalRoutines) * 100;

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Good morning! 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-300">{today}</p>
      </div>

      {/* Today's Progress */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            Today's Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium">
              {completedRoutines} of {totalRoutines} routines completed
            </span>
            <span className="text-sm text-gray-600">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </CardContent>
      </Card>

      {/* Today's Routines */}
      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-green-600" />
            Today's Routines
          </CardTitle>
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Add Routine
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {todayRoutines.map((routine) => (
              <div
                key={routine.id}
                className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                  routine.completed
                    ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800'
                    : 'bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <button
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      routine.completed
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'border-gray-300 hover:border-green-500'
                    }`}
                  >
                    {routine.completed && <Check className="h-4 w-4" />}
                  </button>
                  <div>
                    <h3 className={`font-medium ${routine.completed ? 'line-through text-gray-500' : ''}`}>
                      {routine.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {routine.time} • {routine.category}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Habits Tracker */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-purple-600" />
            Habits
          </CardTitle>
          <Button size="sm" variant="outline" className="gap-2">
            <Plus className="h-4 w-4" />
            Add Habit
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {habits.map((habit) => (
              <div
                key={habit.id}
                className="flex items-center justify-between p-4 rounded-lg bg-gray-50 border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
              >
                <div className="flex items-center gap-3">
                  <button
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      habit.completed
                        ? 'bg-purple-500 border-purple-500 text-white'
                        : 'border-gray-300 hover:border-purple-500'
                    }`}
                  >
                    {habit.completed && <Check className="h-4 w-4" />}
                  </button>
                  <div>
                    <h3 className={`font-medium ${habit.completed ? 'line-through text-gray-500' : ''}`}>
                      {habit.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      🔥 {habit.streak} day streak
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
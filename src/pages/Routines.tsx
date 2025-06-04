import React, { useState } from 'react';
import { Plus, Clock, Calendar, Edit, Trash2, Play } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

const Routines = () => {
  const [activeTab, setActiveTab] = useState('all');

  const routines = [
    {
      id: 1,
      name: 'Morning Routine',
      category: 'Morning',
      time: '7:00 AM',
      duration: '45 min',
      tasks: ['Workout', 'Shower', 'Breakfast', 'Review goals'],
      color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
      frequency: 'Daily'
    },
    {
      id: 2,
      name: 'Work Focus Session',
      category: 'Work',
      time: '9:00 AM',
      duration: '2 hours',
      tasks: ['Clear desk', 'Review priorities', 'Deep work block', 'Take notes'],
      color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      frequency: 'Weekdays'
    },
    {
      id: 3,
      name: 'Evening Wind Down',
      category: 'Evening',
      time: '9:00 PM',
      duration: '30 min',
      tasks: ['Tidy up', 'Read', 'Journal', 'Prepare for tomorrow'],
      color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      frequency: 'Daily'
    },
    {
      id: 4,
      name: 'Weekend Planning',
      category: 'Planning',
      time: '10:00 AM',
      duration: '1 hour',
      tasks: ['Review week', 'Plan activities', 'Grocery list', 'Meal prep'],
      color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      frequency: 'Weekly'
    }
  ];

  const categories = ['all', 'Morning', 'Work', 'Evening', 'Planning'];

  const filteredRoutines = activeTab === 'all' 
    ? routines 
    : routines.filter(routine => routine.category === activeTab);

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Routines
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage your daily and weekly routines
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create Routine
        </Button>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveTab(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            {category === 'all' ? 'All Routines' : category}
          </button>
        ))}
      </div>

      {/* Routines Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {filteredRoutines.map((routine) => (
          <Card key={routine.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg mb-2">{routine.name}</CardTitle>
                  <Badge className={routine.color}>{routine.category}</Badge>
                </div>
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-600">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Time and Duration */}
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {routine.time}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {routine.duration}
                  </div>
                  <div>
                    {routine.frequency}
                  </div>
                </div>

                {/* Tasks */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Tasks ({routine.tasks.length})
                  </h4>
                  <div className="space-y-1">
                    {routine.tasks.slice(0, 3).map((task, index) => (
                      <div key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                        {task}
                      </div>
                    ))}
                    {routine.tasks.length > 3 && (
                      <div className="text-sm text-gray-500 dark:text-gray-500">
                        +{routine.tasks.length - 3} more tasks
                      </div>
                    )}
                  </div>
                </div>

                {/* Start Button */}
                <Button className="w-full gap-2">
                  <Play className="h-4 w-4" />
                  Start Routine
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRoutines.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Calendar className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No routines found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Create your first routine to get started
          </p>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Create Routine
          </Button>
        </div>
      )}
    </div>
  );
};

export default Routines;
import { useState } from 'react'
import { Plus, Trash2, CheckCircle2, Circle, Flame } from 'lucide-react'
import { useRoutines } from '../contexts/RoutineContext'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import AddHabitModal from '../components/AddHabitModal'

const Habits = () => {
  const { habits, deleteHabit, toggleHabitComplete } = useRoutines()
  const [showAddModal, setShowAddModal] = useState(false)

  const today = new Date().toISOString().split('T')[0]
  
  const isHabitCompletedToday = (habitId: string) => {
    const habit = habits.find(h => h.id === habitId)
    return habit?.completions.some(c => c.date === today) || false
  }

  const getDayName = (dayIndex: number) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    return days[dayIndex]
  }

  return (
    <div className="p-4 max-w-md mx-auto space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Habits</h1>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Habit
        </Button>
      </div>

      {/* Habits List */}
      <div className="space-y-4">
        {habits.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                No habits yet. Create your first habit to build consistency!
              </p>
              <Button onClick={() => setShowAddModal(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Habit
              </Button>
            </CardContent>
          </Card>
        ) : (
          habits.map((habit) => {
            const isCompletedToday = isHabitCompletedToday(habit.id)
            return (
              <Card key={habit.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => toggleHabitComplete(habit.id)}
                        className="text-gray-400 hover:text-green-600 transition-colors"
                      >
                        {isCompletedToday ? (
                          <CheckCircle2 className="h-6 w-6 text-green-600" />
                        ) : (
                          <Circle className="h-6 w-6" />
                        )}
                      </button>
                      <div className="flex-1">
                        <CardTitle className={`text-lg ${
                          isCompletedToday 
                            ? 'text-gray-500 dark:text-gray-400' 
                            : 'text-gray-900 dark:text-white'
                        }`}>
                          {habit.title}
                        </CardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: habit.color }}
                          />
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {habit.targetDays.map(day => getDayName(day)).join(', ')}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteHabit(habit.id)}
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                {habit.description && (
                  <CardContent className="pt-0 pb-3">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {habit.description}
                    </p>
                  </CardContent>
                )}

                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Flame className="h-4 w-4 text-orange-500" />
                      <span className="text-sm font-medium">
                        {habit.currentStreak} day streak
                      </span>
                    </div>
                    <Badge variant="secondary">
                      Best: {habit.longestStreak}
                    </Badge>
                  </div>
                  
                  {/* Last 7 days visualization */}
                  <div className="flex items-center space-x-1 mt-3">
                    {Array.from({ length: 7 }, (_, i) => {
                      const date = new Date()
                      date.setDate(date.getDate() - (6 - i))
                      const dateStr = date.toISOString().split('T')[0]
                      const isCompleted = habit.completions.some(c => c.date === dateStr)
                      const isTargetDay = habit.targetDays.includes(date.getDay())
                      
                      return (
                        <div
                          key={i}
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                            isCompleted 
                              ? 'bg-green-500 text-white' 
                              : isTargetDay
                              ? 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
                          }`}
                        >
                          {date.getDate()}
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>

      <AddHabitModal 
        isOpen={showAddModal} 
        onClose={() => setShowAddModal(false)} 
      />
    </div>
  )
}

export default Habits
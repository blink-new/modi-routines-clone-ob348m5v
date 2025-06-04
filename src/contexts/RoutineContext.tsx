import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Task {
  id: number;
  title: string;
  isCompleted: boolean;
}

interface Routine {
  id: number;
  title: string;
  description?: string;
  category: string;
  time?: string;
  tasks: Task[];
  isCompleted: boolean;
}

interface Habit {
  id: number;
  name: string;
  category: string;
  streak: number;
  bestStreak: number;
  completedToday: boolean;
}

interface RoutineContextType {
  routines: Routine[];
  habits: Habit[];
  addRoutine: (routine: Omit<Routine, 'id'>) => void;
  addHabit: (habit: Omit<Habit, 'id'>) => void;
  toggleRoutine: (id: number) => void;
  toggleHabit: (id: number) => void;
  deleteRoutine: (id: number) => void;
  deleteHabit: (id: number) => void;
  toggleRoutineComplete: (id: number) => void;
  toggleTaskComplete: (routineId: number, taskId: number) => void;
}

const RoutineContext = createContext<RoutineContextType | undefined>(undefined);

export const useRoutineContext = () => {
  const context = useContext(RoutineContext);
  if (!context) {
    throw new Error('useRoutineContext must be used within a RoutineProvider');
  }
  return context;
};

// Export alias for useRoutines
export const useRoutines = useRoutineContext;

interface RoutineProviderProps {
  children: ReactNode;
}

export const RoutineProvider: React.FC<RoutineProviderProps> = ({ children }) => {
  const [routines, setRoutines] = useState<Routine[]>([
    {
      id: 1,
      title: 'Morning Workout',
      description: 'Start the day with energy',
      category: 'Health',
      time: '7:00 AM',
      tasks: [
        { id: 1, title: 'Warm-up', isCompleted: false },
        { id: 2, title: 'Cardio', isCompleted: false },
        { id: 3, title: 'Strength training', isCompleted: false },
        { id: 4, title: 'Cool down', isCompleted: false }
      ],
      isCompleted: false
    },
    {
      id: 2,
      title: 'Team Meeting',
      description: 'Daily standup with the team',
      category: 'Work',
      time: '10:00 AM',
      tasks: [
        { id: 5, title: 'Review agenda', isCompleted: false },
        { id: 6, title: 'Join call', isCompleted: false },
        { id: 7, title: 'Take notes', isCompleted: false },
        { id: 8, title: 'Follow up', isCompleted: false }
      ],
      isCompleted: false
    }
  ]);

  const [habits, setHabits] = useState<Habit[]>([
    {
      id: 1,
      name: 'Drink 8 glasses of water',
      category: 'Health',
      streak: 12,
      bestStreak: 28,
      completedToday: false
    },
    {
      id: 2,
      name: 'Read for 30 minutes',
      category: 'Learning',
      streak: 8,
      bestStreak: 15,
      completedToday: true
    }
  ]);

  const addRoutine = (routine: Omit<Routine, 'id'>) => {
    const newRoutine = {
      ...routine,
      id: Date.now(),
      isCompleted: false,
      tasks: routine.tasks || []
    };
    setRoutines(prev => [...prev, newRoutine]);
  };

  const addHabit = (habit: Omit<Habit, 'id'>) => {
    const newHabit = {
      ...habit,
      id: Date.now(),
      completedToday: false
    };
    setHabits(prev => [...prev, newHabit]);
  };

  const toggleRoutine = (id: number) => {
    setRoutines(prev =>
      prev.map(routine =>
        routine.id === id
          ? { ...routine, isCompleted: !routine.isCompleted }
          : routine
      )
    );
  };

  const toggleRoutineComplete = (id: number) => {
    setRoutines(prev =>
      prev.map(routine =>
        routine.id === id
          ? { ...routine, isCompleted: !routine.isCompleted }
          : routine
      )
    );
  };

  const toggleTaskComplete = (routineId: number, taskId: number) => {
    setRoutines(prev =>
      prev.map(routine =>
        routine.id === routineId
          ? {
              ...routine,
              tasks: routine.tasks.map(task =>
                task.id === taskId
                  ? { ...task, isCompleted: !task.isCompleted }
                  : task
              )
            }
          : routine
      )
    );
  };

  const toggleHabit = (id: number) => {
    setHabits(prev =>
      prev.map(habit =>
        habit.id === id
          ? { 
              ...habit, 
              completedToday: !habit.completedToday,
              streak: !habit.completedToday ? habit.streak + 1 : Math.max(0, habit.streak - 1),
              bestStreak: !habit.completedToday ? Math.max(habit.bestStreak, habit.streak + 1) : habit.bestStreak
            }
          : habit
      )
    );
  };

  const deleteRoutine = (id: number) => {
    setRoutines(prev => prev.filter(routine => routine.id !== id));
  };

  const deleteHabit = (id: number) => {
    setHabits(prev => prev.filter(habit => habit.id !== id));
  };

  const value: RoutineContextType = {
    routines,
    habits,
    addRoutine,
    addHabit,
    toggleRoutine,
    toggleHabit,
    deleteRoutine,
    deleteHabit,
    toggleRoutineComplete,
    toggleTaskComplete
  };

  return (
    <RoutineContext.Provider value={value}>
      {children}
    </RoutineContext.Provider>
  );
};

export default RoutineProvider;
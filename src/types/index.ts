export interface Routine {
  id: string
  title: string
  description?: string
  category: string
  time?: string
  tasks: Task[]
  isCompleted: boolean
  completedAt?: Date
  createdAt: Date
}

export interface Task {
  id: string
  title: string
  isCompleted: boolean
  completedAt?: Date
}

export interface Habit {
  id: string
  title: string
  description?: string
  color: string
  targetDays: number[]
  currentStreak: number
  longestStreak: number
  completions: HabitCompletion[]
  createdAt: Date
}

export interface HabitCompletion {
  id: string
  date: string
  completedAt: Date
}

export interface ProgressData {
  date: string
  routinesCompleted: number
  totalRoutines: number
  habitsCompleted: number
  totalHabits: number
}
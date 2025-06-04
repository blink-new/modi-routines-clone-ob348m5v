import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Checkbox } from './ui/checkbox'
import { useRoutines } from '../contexts/RoutineContext'

interface AddHabitModalProps {
  isOpen: boolean
  onClose: () => void
}

const AddHabitModal = ({ isOpen, onClose }: AddHabitModalProps) => {
  const { addHabit } = useRoutines()
  
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [color, setColor] = useState('#3B82F6')
  const [targetDays, setTargetDays] = useState<number[]>([])

  const days = [
    { value: 0, label: 'Sunday' },
    { value: 1, label: 'Monday' },
    { value: 2, label: 'Tuesday' },
    { value: 3, label: 'Wednesday' },
    { value: 4, label: 'Thursday' },
    { value: 5, label: 'Friday' },
    { value: 6, label: 'Saturday' },
  ]

  const colors = [
    '#3B82F6', '#EF4444', '#10B981', '#F59E0B',
    '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16'
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title.trim() || targetDays.length === 0) return

    addHabit({
      title: title.trim(),
      description: description.trim(),
      color,
      targetDays
    })

    // Reset form
    setTitle('')
    setDescription('')
    setColor('#3B82F6')
    setTargetDays([])
    onClose()
  }

  const toggleDay = (day: number) => {
    setTargetDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day].sort()
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Habit</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter habit title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional description"
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label>Color</Label>
            <div className="flex space-x-2">
              {colors.map(c => (
                <button
                  key={c}
                  type="button"
                  className={`w-8 h-8 rounded-full border-2 ${
                    color === c ? 'border-gray-400' : 'border-gray-200'
                  }`}
                  style={{ backgroundColor: c }}
                  onClick={() => setColor(c)}
                />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Target Days *</Label>
            <div className="space-y-2">
              {days.map(day => (
                <div key={day.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`day-${day.value}`}
                    checked={targetDays.includes(day.value)}
                    onCheckedChange={() => toggleDay(day.value)}
                  />
                  <Label htmlFor={`day-${day.value}`}>{day.label}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex space-x-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Add Habit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddHabitModal
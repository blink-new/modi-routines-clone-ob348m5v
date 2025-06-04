import { useState } from 'react';
import { X } from 'lucide-react';
import { useRoutines } from '../contexts/RoutineContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface AddRoutineModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Task {
  id: number;
  title: string;
  isCompleted: boolean;
}

const AddRoutineModal: React.FC<AddRoutineModalProps> = ({ isOpen, onClose }) => {
  const { addRoutine } = useRoutines();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Personal');
  const [time, setTime] = useState('');
  const [taskTitle, setTaskTitle] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = () => {
    if (taskTitle.trim()) {
      setTasks([...tasks, { 
        id: Date.now(), 
        title: taskTitle.trim(), 
        isCompleted: false 
      }]);
      setTaskTitle('');
    }
  };

  const handleRemoveTask = (taskId: number) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      addRoutine({
        title: title.trim(),
        description: description.trim(),
        category,
        time: time.trim(),
        tasks,
        isCompleted: false
      });
      handleClose();
    }
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
    setCategory('Personal');
    setTime('');
    setTaskTitle('');
    setTasks([]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Routine</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Morning Workout"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Start the day with energy..."
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Personal">Personal</SelectItem>
                <SelectItem value="Work">Work</SelectItem>
                <SelectItem value="Health">Health</SelectItem>
                <SelectItem value="Learning">Learning</SelectItem>
                <SelectItem value="Social">Social</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="time">Time</Label>
            <Input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          <div>
            <Label>Tasks</Label>
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  placeholder="Add a task..."
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTask();
                    }
                  }}
                />
                <Button type="button" onClick={handleAddTask} size="sm">
                  Add
                </Button>
              </div>
              {tasks.length > 0 && (
                <div className="space-y-1 mt-2">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded"
                    >
                      <span className="text-sm">{task.title}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTask(task.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              Add Routine
            </Button>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddRoutineModal;
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { format } from "date-fns"
import { cn } from "@/lib/utils";

interface Todo {
  title: string;
  description: string;
  status: string;
  dueDate: Date | null;
}

interface EditTodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  todo: Todo | null;
  onSave: (updatedTodo: Todo) => void;
}

const EditTodoModal: React.FC<EditTodoModalProps> = ({ isOpen, onClose, todo, onSave }) => {
  const [editedTodo, setEditedTodo] = useState<Todo | null>(todo);

  useEffect(() => {
    setEditedTodo(todo);
    console.log("Setted: ", editedTodo);    
  }, [todo]);

  if (!editedTodo) return null;

  const handleSave = () => {
    onSave(editedTodo);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Todo</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          {/* Title Input */}
          <Input
            value={editedTodo.title}
            onChange={(e) => setEditedTodo({ ...editedTodo, title: e.target.value })}
            placeholder="Title"
          />

          {/* Description Input */}
          <Textarea
            value={editedTodo.description}
            onChange={(e) => setEditedTodo({ ...editedTodo, description: e.target.value })}
            placeholder="Description"
          />

          {/* Status Selection */}
          <RadioGroup
            value={editedTodo.status}
            onValueChange={(value) => setEditedTodo({ ...editedTodo, status: value })}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="pending" id="pending" />
              <Label htmlFor="pending">Pending</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="completed" id="completed" />
              <Label htmlFor="completed">Completed</Label>
            </div>
          </RadioGroup>

          {/* Due Date Picker */}
          {/* <Calendar
            selected={editedTodo.dueDate || undefined}
            onSelect={(date: any) => setEditedTodo({ ...editedTodo, dueDate: date })}
          /> */}
          <div className="flex flex-col mb-3">
        <Label className="mb-2 mt-3">Due Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] pl-3 text-left font-normal",
                !editedTodo.dueDate && "text-muted-foreground"
              )}
            >
              {editedTodo.dueDate ? format(editedTodo.dueDate, "PPP") : <span>Pick a date</span>}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={editedTodo.dueDate}
              onSelect={(date: any) => setEditedTodo({ ...editedTodo, dueDate: date })}
              disabled={(date) =>
                date > new Date() || date < new Date("1900-01-01")
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

          {/* Save Button */}
          <Button onClick={handleSave} className="w-full">
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditTodoModal;

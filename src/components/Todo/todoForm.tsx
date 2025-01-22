import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { FaPlus } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { format } from "date-fns"
import { Todo } from "@/types/todo";

interface TodoFormProps {
  onAdd: (todo: Omit<Todo, "id" | "createdAt" | "updatedAt">) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(false);
  const [dueDate, setDueDate] = useState<Date | null>(null);

  const handleAddTodo = () => {
    if (!title.trim()) return;
    onAdd({
      title,
      description,
      status,
      dueDate: dueDate ? dueDate.toISOString() : undefined,
    });
    setTitle("");
    setDescription("");
    setStatus(false);
    setDueDate(null);
  };

  return (
    <div className="p-4 bg-white border-b">
      <Input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-3"
      />

      <Textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="mb-3"
      />

      {/* Status Radio Buttons */}
      <RadioGroup
        value={status.toString()}
        onValueChange={(val) => setStatus(val === "true")}
        className="mb-3"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="false" id="pending" />
          <Label htmlFor="pending">Pending</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="true" id="completed" />
          <Label htmlFor="completed">Completed</Label>
        </div>
      </RadioGroup>

      {/* Calendar Dropdown */}
      <div className="flex flex-col mb-3">
        <Label className="mb-2 mt-3">Due Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] pl-3 text-left font-normal",
                !dueDate && "text-muted-foreground"
              )}
            >
              {dueDate ? format(dueDate, "PPP") : <span>Pick a date</span>}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={dueDate}
              onSelect={(date) => setDueDate(date)}
              disabled={(date) =>
                date > new Date() || date < new Date("1900-01-01")
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <Button
        onClick={handleAddTodo}
        className="flex items-center rounded-full w-10 h-10"
      >
        <FaPlus />
      </Button>
    </div>
  );
};

export default TodoForm;

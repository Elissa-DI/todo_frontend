import React from "react";
import TodoForm from "./todoForm";
import { useTodos } from "@/hooks/useTodos";
import { useToast } from "@/hooks/use-toast";

interface AddTodoModalProps {
  onClose: () => void;
}

const AddTodoModal: React.FC<AddTodoModalProps> = ({ onClose }) => {
  const { addTodo } = useTodos();
  const { toast } = useToast();

  const handleAddTodo = async (todo: { title: string; description: string; dueDate?: string }) => {
    try {
      await addTodo(todo); // Call the addTodo function
      toast({
        title: "Todo Created",
        description: `The todo "${todo.title}" has been added successfully!`,
      });
      onClose(); // Close the modal after success
    } catch (error) {
      toast({
        title: "Failed to add todo. Please try again.",
        variant: "destructive",
      });
      console.error(error)
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Add New Todo</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✖
          </button>
        </div>
        <TodoForm onAdd={handleAddTodo} />
      </div>
    </div>
  );
};

export default AddTodoModal;

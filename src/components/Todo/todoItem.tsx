import { useState } from "react";
import { FaEdit, FaTrash, FaCheckSquare, FaRegSquare } from "react-icons/fa";
import EditTodoModal from "./editTodoModal";
import { Todo } from "@/types/todo";

interface TodoItemProps {
  todos: Todo[];
  onEdit: (id: string, updates: Partial<Todo>) => void;
  onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todos, onEdit, onDelete }) => {
  const [selectedTodos, setSelectedTodos] = useState<string[]>([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const toggleSelect = (id: string) => {
    setSelectedTodos((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
    setEditModalOpen(true);
  };

  return (
    <div className="p-4">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="flex items-center justify-between p-3 bg-gray-100 rounded-lg shadow mb-2"
        >
          {/* Select Checkbox */}
          <button onClick={() => toggleSelect(todo.id)}>
            {selectedTodos.includes(todo.id) ? (
              <FaCheckSquare className="text-blue-500" />
            ) : (
              <FaRegSquare className="text-gray-500" />
            )}
          </button>

          {/* Todo Content */}
          <div className="flex-1 ml-3">
            <h3 className="text-md font-semibold">{todo.title}</h3>
            <p className="text-sm text-gray-500">{todo.description}</p>
            <p className="text-xs text-gray-400">
              Due: {todo.dueDate ? new Date(todo.dueDate).toDateString() : "No due date"}
            </p>
            <p className={`text-xs font-semibold ${todo.status ? "text-green-500" : "text-orange-500"}`}>
              Status: {todo.status ? "Completed" : "Pending"}
            </p>
          </div>

          {/* Edit & Delete Icons */}
          {selectedTodos.includes(todo.id) && (
            <div className="flex space-x-3">
              <button onClick={() => handleEdit(todo)}>
                <FaEdit className="text-blue-500" />
              </button>
              <button onClick={() => onDelete(todo.id)}>
                <FaTrash className="text-red-500" />
              </button>
            </div>
          )}
        </div>
      ))}

      {/* Edit Modal */}
      {editingTodo && (
        <EditTodoModal
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          todo={editingTodo}
          onSave={(updates) => {
            onEdit(editingTodo.id, updates);
            setEditModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default TodoItem;

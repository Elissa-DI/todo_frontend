import { useTodos } from "@/hooks/useTodos";
import TodoHeader from "@/components/Todo/header";
import TodoItem from "@/components/Todo/todoItem";

const Todos = () => {
  const { todos, editTodo, removeTodo } = useTodos();

  return (
    <div className="p-4">
      <TodoHeader />
      <TodoItem todos={todos} onEdit={editTodo} onDelete={removeTodo} />
    </div>
  );
};

export default Todos;

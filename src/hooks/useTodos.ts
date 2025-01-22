/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { fetchTodos, createTodo, updateTodo, deleteTodo } from "@/services/todoService";
import { Todo } from "@/types/todo";

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        setLoading(true);
        const data = await fetchTodos();
        setTodos(data);
      } catch (err) {
        setError("Failed to fetch todos");
      } finally {
        setLoading(false);
      }
    };
    loadTodos();
  }, []);

  const addTodo = async (todo: { title: string; description: string; dueDate?: string }) => {
    try {
      const newTodo = await createTodo(todo);
      setTodos((prev) => [...prev, newTodo]);
    } catch {
      setError("Failed to add todo");
    }
  };

  const editTodo = async (id: string, updates: Partial<Todo>) => {
    try {
      const updated = await updateTodo(id, updates);
      console.log("Updated Todo:", updated);
      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch {
      setError("Failed to update todo");
    }
  };

  const removeTodo = async (id: string) => {
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch {
      setError("Failed to delete todo");
    }
  };

  return { todos, loading, error, addTodo, editTodo, removeTodo };
};

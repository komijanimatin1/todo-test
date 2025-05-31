"use client"

import axios from 'axios';
import { useEffect, useState } from 'react';

interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export default function Task() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/todos');
        if (response.data.length === 0) {
          setError("No tasks found.");
        } else {
          setTodos(response.data);
        }
      } catch (err) {
        setError("Failed to load tasks. Please check your API or server.");
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const toggleCompleted = async (id: number) => {
    try {
      await axios.put(`http://localhost:3000/todos/${id}`, {
        ...todos.find(todo => todo.id === id),
        completed: !todos.find(todo => todo.id === id)?.completed,
      });

      setTodos(prevTodos =>
        prevTodos.map(t =>
          t.id === id ? { ...t, completed: !t.completed } : t
        )
      );
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading tasks...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <>
      {todos.map((todo) => (
        <div
          key={todo.id}
          className={`p-4 rounded-md shadow-md relative transition-all duration-300 ${
            todo.completed ? "bg-gray-400" : "bg-yellow-100"
          }`}
        >
          <h2 className={`text-lg font-semibold ${todo.completed ? "line-through text-gray-700" : ""}`}>
            {todo.title}
          </h2>
          <p className={`text-gray-700 ${todo.completed ? "line-through" : ""}`}>
            <span className="font-bold">Description:</span> {todo.description}
          </p>
          <span className={`text-sm text-gray-600 ${todo.completed ? "line-through" : ""}`}>
            <span className="font-bold">Status:</span> {todo.completed ? "Completed" : "Pending"}
          </span>
          <input
            type="checkbox"
            className="absolute top-2/4 right-4"
            checked={todo.completed}
            onChange={() => toggleCompleted(todo.id)}
          />
        </div>
      ))}
    </>
  );
}

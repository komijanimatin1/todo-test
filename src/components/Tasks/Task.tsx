"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import AddTask from "../UI/Add-Button";
import EditTask from "../UI/Edit-Button";
import DeleteButton from "../UI/Delete-Button";
import ToggleSwitch from "../UI/Switch";

export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export default function Task() {

  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("http://localhost:3000/todos");
      setTodos(data);
      setError(null);
    } catch {
      setError("Failed to load tasks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading tasks...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="space-y-4">
      {/* Task List */}
      {todos.length === 0 ? <p className="text-center text-gray-500">No tasks found.</p> : todos.map((todo) => (
        <div
          key={todo.id}
          className={`p-4 rounded shadow transition-all duration-300 ${todo.completed ? "bg-gray-400 text-gray-300" : "bg-yellow-100 text-gray-700"}`}
        >
          {/* Task Details */}
          <div>
            {/* Task Title */}
            <h2 className={`text-lg font-semibold ${todo.completed ? "line-through" : ""}`}>
              Title: <span className="font-normal">{todo.title}</span>
            </h2>
            <p className={todo.completed ? "line-through" : ""}>Description: <span className="font-normal">{todo.description}</span></p>
            <p className={`${todo.completed ? "line-through" : ""}`}>Status: <span className={`font-normal `}>{todo.completed ? "Completed" : "Pending"}</span></p>
          </div>
          {/* Task Actions */}
          <div className="mt-2 px-2 flex flex-nowrap md:flex-row flex-col justify-between gap-4">
            <div className="flex md:justify-start justify-between gap-4">
              {/* Task Action Buttons */}
              <EditTask task={todo} onSuccess={fetchTodos} />
              <DeleteButton id={todo.id} setTodos={setTodos} />
            </div>
            {/* Task Toggle Switch */}
            <ToggleSwitch id={todo.id} completed={todo.completed} setTodos={setTodos} />
          </div>

        </div>
      ))}
      {/* Task Summary */}
      <div className={`flex  ${todos.length === 0 ? "justify-center" : "justify-between"}`}>
        {todos.length > 0 && <p className="text-center text-gray-500">Total Tasks: {todos.length}</p>}
        <AddTask onSuccess={fetchTodos} />
      </div>
    </div>
  );
}

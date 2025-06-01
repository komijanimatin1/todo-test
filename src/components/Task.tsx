"use client";

import { Switch } from "@headlessui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlus } from "@fortawesome/free-solid-svg-icons";
import ModalForm from "./Modal-Form";
import DeleteButton from "./Delete-Button";

export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export default function Task() {

  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<Todo | null>(null);

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
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    try {
      await axios.put(`http://localhost:3000/todos/${id}`, {
        ...todo,
        completed: !todo.completed
      });

      setTodos(prev =>
        prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleEdit = (task: Todo) => {
    setSelectedTask(task);
    setModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/todos/${id}`);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleSaveEdit = async (updatedTask: Todo) => {
    try {
      await axios.put(`http://localhost:3000/todos/${updatedTask.id}`, updatedTask);
      setTodos((prev) =>
        prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading tasks...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="space-y-4">
      {todos.map(todo => (
        <div
          key={todo.id}
          className={`p-4 relative rounded-md shadow-md transition-all duration-300  ${todo.completed ? "bg-gray-400 text-gray-300" : "bg-yellow-100 text-gray-700"
            }`}
        >
          <h2 className={`text-lg font-semibold ${todo.completed ? "line-through" : ""}`}>
            {todo.title}
          </h2>
          <p className={` ${todo.completed ? "line-through" : ""}`}>
            <span className="font-bold">Description:</span> {todo.description}
          </p>

          <div className="mt-2 flex items-center gap-2">
            <span className={`text-sm font-bold ${todo.completed ? "line-through" : ""}`}>Completed:</span>
            <Switch
              checked={todo.completed}
              onChange={() => toggleCompleted(todo.id)}
              className={`${todo.completed ? 'bg-gray-500' : 'bg-gray-200'
                } relative top-2/4 right--2/4 inline-flex h-6 w-12 items-center rounded-full transition-colors`}
            >
              <span
                className={`${todo.completed ? 'translate-x-7 bg-gray-700 border-2 border-gray-200' : 'translate-x-1 bg-white border-2 border-gray-700'
                  } inline-block h-4 w-4 transform  rounded-full transition-transform`}
              />
            </Switch>
            <div className="flex items-center gap-2 ml-4">
              <button onClick={() => handleEdit(todo)} className="text-blue-600 hover:text-blue-800">
                <FontAwesomeIcon icon={faPen} />
              </button>
              <DeleteButton id={todo.id} setTodos={setTodos} />
            </div>
            {
              modalOpen && selectedTask && (
                <ModalForm
                  onClose={() => setModalOpen(false)}
                  task={selectedTask}
                  onSave={handleSaveEdit}
                />
              )
            }
          </div>
        </div>
      ))}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">Total tasks: {todos.length}</span>
        <span className="w-8 h-8 bg-white flex justify-center items-center rounded-full transition duration-300 hover:bg-gray-400 ">
          <FontAwesomeIcon icon={faPlus} />
        </span>
      </div>
    </div>
  );
}

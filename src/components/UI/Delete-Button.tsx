"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Todo } from "../Tasks/Task";

interface DeleteButtonProps {
  id: number;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export default function DeleteButton({ id, setTodos }: DeleteButtonProps) {
  // Handle task deletion
  const handleDelete = async () => {
    try {
      // Send delete request to the server
      await axios.delete(`http://localhost:3000/todos/${id}`);
      // Update local state
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    // Delete Task Button
    <button
      onClick={handleDelete}
      className="text-red-600 hover:text-red-800"
    >
      <FontAwesomeIcon icon={faTrash} size="xl" />
    </button>
  );
}

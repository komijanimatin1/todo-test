// components/DeleteButton.tsx
"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Todo } from "./Task";

interface DeleteButtonProps {
  id: number;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export default function DeleteButton({ id, setTodos }: DeleteButtonProps) {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/todos/${id}`);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="text-red-600 hover:text-red-800"
    >
      <FontAwesomeIcon icon={faTrash} />
    </button>
  );
}

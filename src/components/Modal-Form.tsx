// ModalForm.tsx
"use client";
import { Dispatch, SetStateAction, useState, useEffect } from "react";

interface ModalFormProps {
  onClose: () => void;
  task: {
    id: number;
    title: string;
    description: string;
    completed: boolean;
  };
  onSave: (updatedTask: any) => void;
}

export default function ModalForm({ onClose, task, onSave }: ModalFormProps) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [completed, setCompleted] = useState(task.completed);

  const handleSubmit = () => {
    const updatedTask = {
      ...task,
      title,
      description,
      completed,
    };
    onSave(updatedTask);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10">
      <div className="bg-white p-6 rounded-md w-[300px] space-y-4">
        <h2 className="text-lg font-bold">Edit Task</h2>
        <input
          className="w-full border p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <textarea
          className="w-full border p-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
          <span>Completed</span>
        </div>
        <div className="flex justify-end gap-2">
          <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-1 rounded">
            Save
          </button>
          <button onClick={onClose} className="text-gray-500">Cancel</button>
        </div>
      </div>
    </div>
  );
}

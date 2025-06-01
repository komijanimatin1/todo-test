"use client";

import { Switch } from "@headlessui/react";
import axios from "axios";
import { Todo } from "./Task";

interface ToggleSwitchProps {
    id: number;
    completed: boolean;
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export default function ToggleSwitch({ id, completed, setTodos }: ToggleSwitchProps) {

    const toggleCompleted = async () => {
        try {
            await axios.patch(`http://localhost:3000/todos/${id}`, {
                completed: !completed,
            });


            setTodos(prev =>
                prev.map(t => t.id === id ? { ...t, completed: !completed } : t)
            );
        } catch (error) {
            console.error("Error toggling completion:", error);
        }
    };

    return (
        <Switch
            checked={completed}
            onChange={toggleCompleted}
            className={`${completed ? 'bg-gray-500' : 'bg-gray-200'
                } relative inline-flex h-6 w-12 items-center rounded-full transition-colors`}
        >
            <span
                className={`${completed ? 'translate-x-7 bg-gray-700 border-2 border-gray-200' : 'translate-x-1 bg-white border-2 border-gray-700'
                    } inline-block h-4 w-4 transform rounded-full transition-transform`}
            />
        </Switch>
    );
}

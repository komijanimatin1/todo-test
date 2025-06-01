"use client";

import { useState } from "react";
import ModalForm from "../Tasks/Modal-Form";
import { Todo } from "../Tasks/Task";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
    task: Todo;
    onSuccess: () => void;
}

export default function EditTask({ task, onSuccess }: Props) {
    // Modal state
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Edit Task Button */}
            <button
                onClick={() => setOpen(true)}
                className="text-blue-600 underline text-sm"
            >
                <FontAwesomeIcon icon={faPencil} size="xl" />
            </button>

            {/* Modal Form */}
            {open && (
                <ModalForm
                    defaultValues={task}
                    taskId={task.id}
                    onClose={() => setOpen(false)}
                    onSuccess={onSuccess}
                    isEdit
                />
            )}
        </>
    );
}

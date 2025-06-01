"use client";

import { useState } from "react";
import ModalForm from "../Tasks/Modal-Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";

interface Props {
    onSuccess: () => void;
}

export default function AddTask({ onSuccess }: Props) {
    // Modal state
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Add Task Button */}
            <button
                onClick={() => setOpen(true)}
                className="bg-[#658c50] hover:bg-[#4a6e3a] transition-all duration-200 text-white px-4 py-1 rounded"
            >
                <FontAwesomeIcon icon={faPlus} size="xl" />
            </button>

            {/* Modal Form */}
            {open && (
                <ModalForm
                    defaultValues={{ title: "", description: "", completed: false }}
                    onClose={() => setOpen(false)}
                    onSuccess={onSuccess}
                />
            )}
        </>
    );
}

"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useEffect } from "react";

const schema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  completed: yup.boolean().default(false),
});

export type FormData = yup.InferType<typeof schema>;

interface Props {
  defaultValues?: FormData;
  taskId?: number;
  onClose: () => void;
  onSuccess: () => void;
  isEdit?: boolean;
}

export default function ModalForm({
  defaultValues,
  taskId,
  onClose,
  onSuccess,
  isEdit = false,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: defaultValues ?? {
      title: "",
      description: "",
      completed: false,
    },
  });

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      if (isEdit && taskId !== undefined) {
        // PUT request
        await axios.put(`http://localhost:3000/todos/${taskId}`, {
          ...data,
          id: taskId,
        });
      } else {
        // POST request
        await axios.post("http://localhost:3000/todos", {
          ...data,
          completed: false,
        });
      }

      onSuccess(); // refresh tasks
      onClose();
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  return (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/10"
    onClick={onClose}
  >
    <div
      className="bg-white p-6 rounded-md w-[300px] space-y-4"
      onClick={(e) => e.stopPropagation()} // جلوگیری از بستن موقع کلیک روی خود فرم
    >
      <h2 className="text-lg font-bold">{isEdit ? "Edit Task" : "Add Task"}</h2>

      <input
        className="w-full border p-2"
        {...register("title")}
        placeholder="Title"
      />
      {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}

      <textarea
        className="w-full border p-2"
        {...register("description")}
        placeholder="Description"
      />
      {errors.description && (
        <p className="text-red-500 text-sm">{errors.description.message}</p>
      )}

      {isEdit && (
        <div className="flex items-center gap-2">
          <input type="checkbox" {...register("completed")} />
          <span>Completed</span>
        </div>
      )}

      <div className="flex justify-end gap-2">
        <button
          onClick={handleSubmit(onSubmit)}
          className="bg-blue-500 text-white px-4 py-1 rounded"
        >
          {isEdit ? "Save" : "Add"}
        </button>
        <button onClick={onClose} className="text-gray-500">
          Cancel
        </button>
      </div>
    </div>
  </div>
);

}

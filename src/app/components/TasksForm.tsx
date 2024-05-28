"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";

export const taskSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

export type TaskSchema = z.infer<typeof taskSchema>;

export default function TasksForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TaskSchema>({
    resolver: zodResolver(taskSchema),
  });
  const onSubmit: SubmitHandler<TaskSchema> = async (data: TaskSchema) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/`,
        data
      );
      console.log(response.data);
      reset();
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        <h1 className="font-bold text-lg">Add task</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="title" className="text-white text-xs">
          Title:
        </label>
        <input
          {...register("title", {
            required: "Title is required",
            minLength: {
              value: 3,
              message: "Title must be at least 3 characters",
            },
          })}
          type="text"
          className="bg-slate-400 rounded-md p-2 w-full mb-2 block text-slate-900"
        />
        {errors.title && (
          <span className="text-red-500 text-xs">{`${errors.title.message}`}</span>
        )}
        <label htmlFor="description" className="text-white text-xs">
          Description:
        </label>
        <textarea
          {...register("description", {
            required: "Description is required",
            minLength: {
              value: 10,
              message: "Description must be at least 10 characters",
            },
          })}
          className="bg-slate-400 rounded-md p-2 w-full mb-2 block text-slate-900"
        ></textarea>
        {errors.description && (
          <span className="text-red-500 text-xs">{`${errors.description.message}`}</span>
        )}
        <button
          type="submit"
          className="bg-indigo-500 text-white rounded-md p-2 block w-full"
          disabled={isSubmitting}
        >
          Add task
        </button>
      </form>
    </div>
  );
}

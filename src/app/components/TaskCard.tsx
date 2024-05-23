"use client";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

type Task = {
  id: string;
  title: string;
  description: string;
  done: boolean;
};

export default function TaskCard(task: Task) {
  const router = useRouter();
  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this task?")) {
      try {
        const response = await axios.delete(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/${id}`
        );
        console.log(response);
        if (response.status === 204) {
          router.refresh();
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  const handleTaskdone = async (id: string) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/${id}/done/`
      );
      console.log(response);
      if (response.status === 200) {
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="bg-slate-500 px-4 py-3 mb-2 rounded-md text-slate-200 flex justify-between items-center">
      <div>
        <h1 className="text-lg font-bold">
          {task.title}

          {task.done && <span>✅</span>}
        </h1>
        <p>{task.description}</p>
      </div>
      <div className="flex gap-x-4">
        <button className="bg-orange-500 p-2 rounded-md text-white">
          Edit
        </button>
        <button
          onClick={() => handleTaskdone(task.id)}
          className={
            "p-2 rounded-md text-white" +
            (task.done ? " bg-green-500" : " bg-gray-600")
          }
        >
          done/undone
        </button>

        <button
          onClick={() => handleDelete(task.id)}
          className="bg-red-500 p-2 rounded-md text-white"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

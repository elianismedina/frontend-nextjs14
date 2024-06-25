"use client";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Task = {
  id: string;
  title: string;
  description: string;
  done: boolean;
};

export default function TaskCard(task: Task) {
  const router = useRouter();
  const [edit, setEdit] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const [newDescription, setNewDescription] = useState(task.description);

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
  const handleUpdate = async (id: string) => {
    try {
      const body = {
        title: newTitle,
        description: newDescription,
      };

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/${id}/`,
        body
      );
      console.log(response);
      const data = await response.data;
      setNewTitle(data.title);
      setNewDescription(data.description);
      setEdit(false);
      if (response.status === 200) {
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="bg-slate-500 px-4 py-3 mb-2 rounded-md text-slate-200 flex flex-col justify-between w-96 ml-12">
      <div className="flex flex-col">
        {!edit ? (
          <h1 className="text-lg font-bold">
            {newTitle}

            {task.done && <span>✅</span>}
          </h1>
        ) : (
          <input
            type="text"
            placeholder={task.title}
            className="p-2 bg-slate-500 border-none outline-none text-green-400"
            onChange={(e) => setNewTitle(e.target.value)}
          />
        )}
        {!edit ? (
          <p>{newDescription}</p>
        ) : (
          <textarea
            placeholder={task.description}
            className="p-2 bg-slate-500 border-none outline-none text-green-400 w-full"
            rows={1}
            onChange={(e) => setNewDescription(e.target.value)}
          />
        )}
      </div>
      <div className="flex flex-row gap-2 mt-4">
        {edit && (
          <button
            className="bg-green-500 p-2 rounded-md text-white"
            onClick={() => handleUpdate(task.id)}
          >
            Save
          </button>
        )}
        <button
          className="bg-orange-500 p-2 rounded-md text-white"
          onClick={() => setEdit(!edit)}
        >
          Edit
        </button>
        <button
          onClick={() => handleTaskdone(task.id)}
          className={
            "p-2 rounded-md text-white" +
            (task.done ? " bg-green-500" : " bg-gray-600")
          }
        >
          {task.done ? "Mark Undone" : "Mark Done"}
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

import React from "react";
import axios from "axios";
import TaskCard from "./TaskCard";

async function loadTasks() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/`
    );
    const tasks = await response.data;
    return tasks;
  } catch (error) {
    console.error(error);
  }
}
type Task = {
  id: string;
  title: string;
  description: string;
  done: boolean;
};

export default async function TasksList(task: Task) {
  const tasks = await loadTasks();
  console.log(tasks);

  return (
    <div className="bg-slate-700 p-4 w-screen rounded-md flex flex-col gap-4 items-center justify-center">
      <h1 className="text-white text-lg font-bold mb-4">Tasks</h1>
      {tasks.map((task: Task) => (
        <TaskCard
          key={task.id}
          id={task.id}
          title={task.title}
          description={task.description}
          done={task.done}
        />
      ))}
    </div>
  );
}

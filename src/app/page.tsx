import TasksForm from "./components/TasksForm";
import TasksList from "./components/TasksList";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div>
      <h1 className="p-4 text-2xl font-bold">Tasks app</h1>
      <div className="grid grid-cols-2 gap-8 p-8">
        <TasksForm />
        <TasksList />
      </div>
    </div>
  );
}

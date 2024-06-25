import TasksForm, { taskSchema } from "./components/TasksForm";
import TasksList from "./components/TasksList";

export const dynamic = "force-dynamic";
type Task = {
  id: string;
  title: string;
  description: string;
  done: boolean;
};

export default function Home() {
  return (
    <div >
      <h1 className="p-4 text-2xl font-bold text-center">Tasks app</h1>
      <div className="grid grid-cols-1 gap-6 p-6">
        <TasksForm />
        <TasksList id={""} title={""} description={""} done={false} />
      </div>
    </div>
  );
}

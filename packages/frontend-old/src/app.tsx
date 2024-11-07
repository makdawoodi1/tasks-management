import { Provider } from "react-redux";
import { store } from "store";
import TaskList from "./components/task-list";
import TaskForm from "components/task-form";
import { Toaster } from "components/ui/toaster";
import { ClipboardList } from "lucide-react";

export default function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto py-8">
          <header className="mb-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <ClipboardList className="h-10 w-10 text-primary" />
              <h1 className="text-4xl font-bold">Task Manager</h1>
            </div>
            <p className="text-red-500">
              Organize your tasks efficiently
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-4">Tasks</h2>
                <TaskList />
              </div>
            </div>
            <div>
              <div className="sticky top-8">
                <h2 className="text-2xl font-semibold mb-4">Create New Task</h2>
                <div className="bg-card rounded-lg shadow-lg p-6">
                  <TaskForm />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Toaster />
      </div>
    </Provider>
  );
}

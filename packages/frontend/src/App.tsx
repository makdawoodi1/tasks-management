import { Provider } from "react-redux";
import { store } from "@/store";
import TaskList from "./components/task-list";
import TaskForm from "@/components/task-form";
import { Toaster } from "@/components/ui/toaster";
import { ClipboardList } from "lucide-react";

export default function App() {
  return (
    <Provider store={store}>
      <div className="mx-auto min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center justify-center py-8">
          <header className="mb-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <ClipboardList className="h-10 w-10 text-primary" />
              <h1 className="text-4xl font-bold">Task Manager</h1>
            </div>
            <p className="text-gray-300">Organize your tasks efficiently</p>
          </header>

          <div className="flex flex-col items-center justify-center max-w-[500px]">
            <div className="flex justify-center w-full">
              <div className="mb-6 sticky top-8">
                <TaskForm />
              </div>
            </div>
            <div className="w-full">
              <TaskList />
            </div>
          </div>
        </div>
        <Toaster />
      </div>
    </Provider>
  );
}

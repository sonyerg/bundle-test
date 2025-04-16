import { TaskProvider } from "./context/TaskContext";
import TaskManager from "./components/TaskManager";

function App() {
  return (
    <TaskProvider>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Task Management App</h1>
        <TaskManager />
      </div>
    </TaskProvider>
  );
}

export default App;

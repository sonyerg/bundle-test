import { useTaskContext } from "../context/TaskContext";

const TaskManager = () => {
  const { taskId, status, loading, startTask } = useTaskContext();

  return (
    <div>
      <button 
        onClick={startTask} 
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
      >
        {loading ? "Starting task..." : "Start Task"}
      </button>

      {taskId && (
        <div className="mt-4">
          <p className="text-gray-700">Task ID: <span className="font-mono">{taskId}</span></p>
          <p className="text-gray-700">
            Status:{" "}
            <span
              className={
                status === "complete"
                  ? "text-green-600 font-semibold"
                  : status === "processing"
                  ? "text-yellow-600 font-semibold"
                  : "text-gray-500 font-semibold"
              }
            >
              {status}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default TaskManager; 
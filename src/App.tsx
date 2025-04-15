import { useEffect, useState } from "react";

type TaskStatus = "pending" | "processing" | "complete";

function App() {
  const [status, setStatus] = useState<TaskStatus | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [taskId, setTaskId] = useState<string | null>(null);

  const simulateApiCall = (): void => {
    setLoading(true);

    setTimeout(() => {
      const fakeId = `task_${Math.floor(Math.random() * 1000)}`;
      setTaskId(fakeId);
      setStatus("pending");
    }, 1500);
  };

  const fetchTaskStatus = async (id: string): Promise<TaskStatus> => {
    return new Promise((r) => {
      setTimeout(() => {
        const random = Math.random();
        if (random < 0.6) r("processing");
        else r("complete");
      }, 300);
    });
  };

  useEffect(() => {
    if (!taskId || status === "complete") return;

    const interval = setInterval(async () => {
      const currentStatus = await fetchTaskStatus();
      setStatus(currentStatus);
      if (currentStatus === "complete") {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [status, taskId]);

  return (
    <div className="p-6 max-w-md mx-auto border shadow rounded">
      <button
        onClick={simulateApiCall}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {loading ? "Starting task..." : "Start Task"}
      </button>

      {taskId && (
        <div className="mt-4">
          <p className="font-medium text-gray-700">Task ID: {taskId}</p>
          <p className="text-sm mt-1">
            Status:{" "}
            <span
              className={
                status === "complete"
                  ? "text-green-600"
                  : status === "processing"
                  ? "text-yellow-600"
                  : "text-gray-500"
              }
            >
              {status}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}

export default App;

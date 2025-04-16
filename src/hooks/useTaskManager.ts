import { useState, useEffect } from 'react';

type TaskStatus = "pending" | "processing" | "complete";

export const useTaskManager = () => {
  const [taskId, setTaskId] = useState<string | null>(null);
  const [status, setStatus] = useState<TaskStatus | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const startTask = (): void => {
    setLoading(true);

    setTimeout(() => {
      const fakeId = `task_${Math.floor(Math.random() * 1000)}`;
      setTaskId(fakeId);
      setStatus("pending");
      setLoading(false);
    }, 1500);
  };

  const fetchTaskStatus = async (id: string | null): Promise<TaskStatus> => {
    return new Promise((r) => {
      console.log("task id:", id);
      setTimeout(() => {
        const random = Math.random();
        if (random < 0.7) r("processing");
        else r("complete");
      }, 300);
    });
  };

  useEffect(() => {
    if (status === "complete" || status === null) return;

    const interval = setInterval(async () => {
      const currentStatus = await fetchTaskStatus(taskId);
      setStatus(currentStatus);
      if (currentStatus === "complete") {
        clearInterval(interval);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [status, taskId]);

  return {
    taskId,
    status,
    loading,
    startTask
  };
}; 
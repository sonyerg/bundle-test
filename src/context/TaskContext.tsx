import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type TaskStatus = "pending" | "processing" | "complete";

interface TaskContextType {
  taskId: string | null;
  status: TaskStatus | null;
  loading: boolean;
  startTask: () => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
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

  return (
    <TaskContext.Provider value={{ taskId, status, loading, startTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
}; 
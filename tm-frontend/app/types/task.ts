export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";

export type PriorityLevel = "LOW" | "MEDIUM" | "HIGH";

export type TaskItem = {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  deadline: string | null;
  priority: PriorityLevel;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export type TaskList = {
  message: string;
  data: {
    tasks: TaskItem[];
    totalPage: number;
    totalTask: number;
    page: number;
  };
};

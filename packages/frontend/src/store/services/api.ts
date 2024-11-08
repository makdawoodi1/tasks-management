import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Task, TaskStatus } from "@/types/tasks";
import { API_BASE_URL } from "@/config";

type CreateTaskDto = {
  title: string;
  description: string;
};

type UpdateTaskStatusDto = {
  id: string;
  status: TaskStatus;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ["Task"],
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], void>({
      query: () => "/tasks",
      providesTags: ["Task"],
    }),
    createTask: builder.mutation<Task, CreateTaskDto>({
      query: (task) => ({
        url: "/tasks",
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["Task"],
    }),
    updateTaskStatus: builder.mutation<Task, UpdateTaskStatusDto>({
      query: ({ id, status }) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Task"],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskStatusMutation,
} = api;

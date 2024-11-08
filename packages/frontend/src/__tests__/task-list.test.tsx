import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { api } from '@/store/services/api';
import TaskList from '@/components/task-list';
import { TaskStatus } from '@/types/tasks';

const mockTasks = [
  {
    id: '1',
    title: 'Test Task',
    description: 'Test Description',
    status: TaskStatus.PENDING,
    createdAt: new Date().toISOString(),
  },
];

// Create a mock store
const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

// Mock the API hook
vi.mock('@/store/services/api', () => ({
  useGetTasksQuery: () => ({
    data: mockTasks,
    isLoading: false,
    error: null,
  }),
  useUpdateTaskStatusMutation: () => [vi.fn()],
}));

describe('TaskList', () => {
  it('renders task list correctly', () => {
    render(
      <Provider store={store}>
        <TaskList />
      </Provider>
    );

    expect(screen.getByText('Tasks')).toBeInTheDocument();
    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('pending')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    vi.mock('@/store/services/api', () => ({
      useGetTasksQuery: () => ({
        data: null,
        isLoading: true,
        error: null,
      }),
    }));

    render(
      <Provider store={store}>
        <TaskList />
      </Provider>
    );

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('shows error state', () => {
    vi.mock('@/store/services/api', () => ({
      useGetTasksQuery: () => ({
        data: null,
        isLoading: false,
        error: 'Error fetching tasks',
      }),
    }));

    render(
      <Provider store={store}>
        <TaskList />
      </Provider>
    );

    expect(screen.getByText('Failed to fetch tasks.')).toBeInTheDocument();
  });
});
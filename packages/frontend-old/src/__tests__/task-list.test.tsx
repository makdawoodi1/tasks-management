import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import tasksReducer, { fetchTasks } from 'store/features/tasks/tasks-slice';
import TaskList from 'components/task-list';
import { TaskStatus } from 'types/tasks';

const mockTasks = [
  {
    id: '1',
    title: 'Test Task',
    description: 'Test Description',
    status: TaskStatus.PENDING,
    createdAt: new Date().toISOString(),
  },
];

jest.mock('@/lib/features/tasks/tasksSlice', () => ({
  ...jest.requireActual('@/lib/features/tasks/tasksSlice'),
  fetchTasks: jest.fn(),
}));

describe('TaskList', () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        tasks: tasksReducer,
      },
      preloadedState: {
        tasks: {
          items: mockTasks,
          status: 'succeeded' as const,
          error: null,
        },
      },
    });
  });

  it('renders task list correctly', () => {
    render(
      <Provider store={store}>
        <TaskList />
      </Provider>
    );

    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('pending')).toBeInTheDocument();
  });

  it('fetches tasks on mount', () => {
    render(
      <Provider store={store}>
        <TaskList />
      </Provider>
    );

    expect(fetchTasks).toHaveBeenCalled();
  });

  it('shows loading state', () => {
    store = configureStore({
      reducer: {
        tasks: tasksReducer,
      },
      preloadedState: {
        tasks: {
          items: [],
          status: 'loading' as const,
          error: null,
        },
      },
    });

    render(
      <Provider store={store}>
        <TaskList />
      </Provider>
    );

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('shows error state', () => {
    store = configureStore({
      reducer: {
        tasks: tasksReducer,
      },
      preloadedState: {
        tasks: {
          items: [],
          status: 'failed' as const,
          error: 'Failed to fetch tasks',
        },
      },
    });

    render(
      <Provider store={store}>
        <TaskList />
      </Provider>
    );

    expect(screen.getByText(/Failed to fetch tasks/)).toBeInTheDocument();
  });
});
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from 'store/features/tasks/tasks-slice';
import CreateTaskForm from 'components/task-form';

const mockStore = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

describe('CreateTaskForm', () => {
  it('renders form fields correctly', () => {
    render(
      <Provider store={mockStore}>
        <CreateTaskForm />
      </Provider>
    );

    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Create Task/i })).toBeInTheDocument();
  });

  it('shows validation errors for empty fields', async () => {
    render(
      <Provider store={mockStore}>
        <CreateTaskForm />
      </Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: /Create Task/i }));

    await waitFor(() => {
      expect(screen.getByText(/Title must be at least 3 characters/i)).toBeInTheDocument();
      expect(screen.getByText(/Description must be at least 10 characters/i)).toBeInTheDocument();
    });
  });

  it('submits form with valid data', async () => {
    render(
      <Provider store={mockStore}>
        <CreateTaskForm />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Title/i), {
      target: { value: 'Test Task' },
    });
    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: { value: 'Test Description for the task' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Create Task/i }));

    await waitFor(() => {
      expect(screen.queryByText(/Title must be at least 3 characters/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Description must be at least 10 characters/i)).not.toBeInTheDocument();
    });
  });
});
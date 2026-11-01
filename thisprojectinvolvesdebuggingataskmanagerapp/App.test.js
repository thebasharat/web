import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from '../App';

test('renders_the_main_heading', async () => {
  render(<App />);
  await waitFor(() => {
    const heading = screen.getByText(/Task Manager/i);
    expect(heading).toBeInTheDocument();
  }, { timeout: 3000 });
});

test('renders_bootstrap_navigation', async () => {
  render(<App />);
  await waitFor(() => {
    const navbar = document.querySelector('.navbar');
    expect(navbar).toBeInTheDocument();
  }, { timeout: 3000 });
});

test('renders_all_tasks_after_loading', async () => {
  render(<App />);
  await waitFor(() => {
    expect(screen.getByText(/Complete React Assignment/i)).toBeInTheDocument();
    expect(screen.getByText(/Review Bootstrap Documentation/i)).toBeInTheDocument();
    expect(screen.getByText(/Debug Lifecycle Methods/i)).toBeInTheDocument();
    expect(screen.getByText(/Setup React Dev Tools/i)).toBeInTheDocument();
  }, { timeout: 3000 });
});

test('renders_add_new_task_button', async () => {
  render(<App />);
  await waitFor(() => {
    const addButton = screen.getByText('Add New Task');
    expect(addButton).toBeInTheDocument();
  }, { timeout: 3000 });
});

test('renders_filter_buttons', async () => {
  render(<App />);
  await waitFor(() => {
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'High' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Medium' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Low' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Completed' })).toBeInTheDocument();
  }, { timeout: 3000 });
});

test('filters_high_priority_tasks', async () => {
  render(<App />);
  await waitFor(() => {
    fireEvent.click(screen.getByRole('button', { name: 'High' }));
    expect(screen.getByText(/Complete React Assignment/i)).toBeInTheDocument();
    expect(screen.getByText(/Debug Lifecycle Methods/i)).toBeInTheDocument();
    expect(screen.queryByText(/Review Bootstrap Documentation/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Setup React Dev Tools/i)).not.toBeInTheDocument();
  }, { timeout: 3000 });
});

test('filters_medium_priority_tasks', async () => {
  render(<App />);
  await waitFor(() => {
    fireEvent.click(screen.getByRole('button', { name: 'Medium' }));
    expect(screen.getByText(/Review Bootstrap Documentation/i)).toBeInTheDocument();
    expect(screen.queryByText(/Complete React Assignment/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Debug Lifecycle Methods/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Setup React Dev Tools/i)).not.toBeInTheDocument();
  }, { timeout: 3000 });
});

test('filters_completed_tasks', async () => {
  render(<App />);
  await waitFor(() => {
    fireEvent.click(screen.getByText('Completed'));
    expect(screen.getByText(/Review Bootstrap Documentation/i)).toBeInTheDocument();
    expect(screen.queryByText(/Complete React Assignment/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Debug Lifecycle Methods/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Setup React Dev Tools/i)).not.toBeInTheDocument();
  }, { timeout: 3000 });
});

test('toggles_task_completion', async () => {
  render(<App />);
  await waitFor(() => {
    const checkbox = screen.getByLabelText(/Complete React Assignment/i);
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  }, { timeout: 3000 });
});

// Replace these 3 non-lifecycle tests:
// - renders_bootstrap_navigation
// - renders_add_new_task_button  
// - displays_priority_badges

// WITH these 3 lifecycle-focused tests:

// Test 1: Loading Spinner (componentDidMount behavior)
test('displays_loading_spinner_initially_then_removes', async () => {
  render(<App />);
  
  // Should show spinner initially (constructor sets isLoading: true)
  const spinner = document.querySelector('.spinner-border');
  expect(spinner).toBeInTheDocument();
  
  // Should remove spinner after componentDidMount (2 seconds)
  await waitFor(() => {
    const spinnerAfterMount = document.querySelector('.spinner-border');
    expect(spinnerAfterMount).not.toBeInTheDocument();
  }, { timeout: 3000 });
});

// Test 2: Add New Task (state updates trigger componentDidUpdate)
test('adds_new_task_and_updates_state', async () => {
  render(<App />);
  
  // Wait for component to mount
  await waitFor(() => {
    expect(screen.getByText('Add New Task')).toBeInTheDocument();
  }, { timeout: 3000 });
  
  // Open modal
  fireEvent.click(screen.getByText('Add New Task'));
  
  await waitFor(() => {
    const titleInput = screen.getByPlaceholderText('Enter task title...');
    const prioritySelect = screen.getByLabelText('Priority');
    
    // Fill form
    fireEvent.change(titleInput, { target: { value: 'New Lifecycle Task' } });
    fireEvent.change(prioritySelect, { target: { value: 'High' } });
    
    // Submit (triggers componentDidUpdate)
    fireEvent.click(screen.getByRole('button', { name: 'Add Task' }));
  });
  
  // Check if task was added (state updated)
  await waitFor(() => {
    expect(screen.getByText('New Lifecycle Task')).toBeInTheDocument();
  });
});

// Test 3: Delete Task (state updates trigger componentDidUpdate)
test('deletes_task_and_updates_state', async () => {
  render(<App />);
  
  // Wait for tasks to load
  await waitFor(() => {
    const deleteButtons = screen.getAllByText('Delete');
    expect(deleteButtons.length).toBe(4);
  }, { timeout: 3000 });
  
  const initialTaskCount = screen.getAllByText('Delete').length;
  
  // Delete first task (triggers componentDidUpdate)
  fireEvent.click(screen.getAllByText('Delete')[0]);
  
  // Check if task was removed (state updated)
  await waitFor(() => {
    const remainingButtons = screen.getAllByText('Delete');
    expect(remainingButtons.length).toBe(initialTaskCount - 1);
  });
});

test('displays_priority_badges', async () => {
  render(<App />);
  await waitFor(() => {
    const highBadge = document.querySelector('.badge.bg-primary');
    const mediumBadge = document.querySelector('.badge.bg-warning');
    const lowBadge = document.querySelector('.badge.bg-secondary');
    expect(highBadge).toBeInTheDocument();
    expect(mediumBadge).toBeInTheDocument();
    expect(lowBadge).toBeInTheDocument();
  }, { timeout: 3000 });
});
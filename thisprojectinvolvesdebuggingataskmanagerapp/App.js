import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [
        { id: 1, title: 'Complete React Assignment', priority: 'High', completed: false, createdAt: Date.now() },
        { id: 2, title: 'Review Bootstrap Documentation', priority: 'Medium', completed: true, createdAt: Date.now() },
        { id: 3, title: 'Debug Lifecycle Methods', priority: 'High', completed: false, createdAt: Date.now() },
        { id: 4, title: 'Setup React Dev Tools', priority: 'Low', completed: false, createdAt: Date.now() }
      ],
      filter: 'All',
      isLoading: true,
      mountTime: null,
      showModal: false,
      newTaskTitle: '',
      newTaskPriority: 'Medium'
    };

    this.nextTaskId = 5;

    // Bind all event handlers so `this` is correct when called from JSX.
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleTaskToggle = this.handleTaskToggle.bind(this);
    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handlePriorityChange = this.handlePriorityChange.bind(this);
    this.handleSubmitNewTask = this.handleSubmitNewTask.bind(this);
  }

  componentDidMount() {
    const mountTimestamp = Date.now();
    // eslint-disable-next-line no-console
    console.log(`App mounted at ${mountTimestamp}`);

    // Simulate an API call: keep the loading indicator up for 2 seconds.
    this.loadingTimer = setTimeout(() => {
      this.setState({ isLoading: false, mountTime: mountTimestamp });
    }, 2000);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.filter !== this.state.filter) {
      // eslint-disable-next-line no-console
      console.log(`Filter changed from "${prevState.filter}" to "${this.state.filter}"`);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.loadingTimer);
    // eslint-disable-next-line no-console
    console.log(`App unmounted at ${Date.now()}`);
  }

  handleFilterChange(filterType) {
    this.setState({ filter: filterType });
  }

  handleTaskToggle(taskId) {
    this.setState((prevState) => ({
      tasks: prevState.tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    }));
  }

  handleAddTask(taskData) {
    const newTask = {
      id: this.nextTaskId++,
      title: taskData.title,
      priority: taskData.priority,
      completed: false,
      createdAt: Date.now()
    };
    this.setState((prevState) => ({
      tasks: [...prevState.tasks, newTask]
    }));
  }

  handleDeleteTask(taskId) {
    this.setState((prevState) => ({
      tasks: prevState.tasks.filter((task) => task.id !== taskId)
    }));
  }

  openModal() {
    this.setState({ showModal: true, newTaskTitle: '', newTaskPriority: 'Medium' });
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  handleTitleChange(event) {
    this.setState({ newTaskTitle: event.target.value });
  }

  handlePriorityChange(event) {
    this.setState({ newTaskPriority: event.target.value });
  }

  handleSubmitNewTask() {
    if (!this.state.newTaskTitle.trim()) {
      return;
    }
    this.handleAddTask({
      title: this.state.newTaskTitle,
      priority: this.state.newTaskPriority
    });
    this.setState({ showModal: false, newTaskTitle: '', newTaskPriority: 'Medium' });
  }

  getFilteredTasks() {
    const { tasks, filter } = this.state;
    switch (filter) {
      case 'High':
      case 'Medium':
      case 'Low':
        return tasks.filter((task) => task.priority === filter);
      case 'Completed':
        return tasks.filter((task) => task.completed);
      case 'All':
      default:
        return tasks;
    }
  }

  getPriorityBadgeClass(priority) {
    switch (priority) {
      case 'High':
        return 'badge bg-primary';
      case 'Medium':
        return 'badge bg-warning';
      case 'Low':
        return 'badge bg-secondary';
      default:
        return 'badge bg-light';
    }
  }

  render() {
    const { isLoading, filter, showModal, newTaskTitle, newTaskPriority } = this.state;
    const filteredTasks = this.getFilteredTasks();
    const filterOptions = ['All', 'High', 'Medium', 'Low', 'Completed'];

    return (
      <div className="App">
        <nav className="navbar navbar-dark bg-dark px-3 d-flex justify-content-between align-items-center">
          <span className="navbar-brand mb-0 h1">Task Manager</span>
          <button type="button" className="btn btn-primary" onClick={this.openModal}>
            Add New Task
          </button>
        </nav>

        <div className="container mt-3 mb-5">
          <div className="btn-group mb-3 flex-wrap" role="group" aria-label="Task filters">
            {filterOptions.map((option) => (
              <button
                key={option}
                type="button"
                className={`btn ${filter === option ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => this.handleFilterChange(option)}
              >
                {option}
              </button>
            ))}
          </div>

          {isLoading && (
            <div className="d-flex align-items-center gap-2 mb-3">
              <div className="spinner-border spinner-border-sm text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <span className="text-muted">Syncing tasks...</span>
            </div>
          )}

          {filteredTasks.length === 0 ? (
            <div className="alert alert-info" role="alert">
              No tasks match this filter.
            </div>
          ) : (
            <div className="row">
              {filteredTasks.map((task) => (
                <div className="col-md-6 mb-3" key={task.id}>
                  <div className="card h-100">
                    <div className="card-body d-flex justify-content-between align-items-start">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id={`task-check-${task.id}`}
                          checked={task.completed}
                          onChange={() => this.handleTaskToggle(task.id)}
                        />
                        <label
                          className={`form-check-label ${task.completed ? 'text-decoration-line-through text-muted' : ''}`}
                          htmlFor={`task-check-${task.id}`}
                        >
                          {task.title}
                        </label>
                      </div>
                      <span className={this.getPriorityBadgeClass(task.priority)}>
                        {task.priority}
                      </span>
                    </div>
                    <div className="card-footer bg-white border-top-0">
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => this.handleDeleteTask(task.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {showModal && (
          <div
            className="modal d-block"
            tabIndex="-1"
            role="dialog"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add New Task</h5>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={this.closeModal}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="taskTitleInput" className="form-label">Task Title</label>
                    <input
                      type="text"
                      id="taskTitleInput"
                      className="form-control"
                      placeholder="Enter task title..."
                      value={newTaskTitle}
                      onChange={this.handleTitleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="taskPrioritySelect" className="form-label">Priority</label>
                    <select
                      id="taskPrioritySelect"
                      className="form-select"
                      value={newTaskPriority}
                      onChange={this.handlePriorityChange}
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={this.closeModal}>
                    Cancel
                  </button>
                  <button type="button" className="btn btn-primary" onClick={this.handleSubmitNewTask}>
                    Add Task
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
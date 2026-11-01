import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      employees: [
        'John Doe',
        'Jane Smith',
        'Mike Johnson',
        'Emily Davis',
        'James Brown',
        'Jennifer Wilson',
        'Paul Garcia',
        'Laura Martinez'
      ],
      filteredEmployees: [
        'John Doe',
        'Jane Smith',
        'Mike Johnson',
        'Emily Davis',
        'James Brown',
        'Jennifer Wilson',
        'Paul Garcia',
        'Laura Martinez'
      ]
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.filterEmployees = this.filterEmployees.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.filterEmployees();
    }
  }

  handleSearch(event) {
    this.setState({ query: event.target.value });
  }

  filterEmployees() {
    const { query, employees } = this.state;
    const filtered = employees.filter((name) =>
      name.toLowerCase().includes(query.toLowerCase())
    );
    this.setState({ filteredEmployees: filtered });
  }

  render() {
    const { filteredEmployees, query } = this.state;

    return (
      <div className="app-container">
        <h1 className="heading">Employee Directory</h1>
        <div className="search-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="Search employees..."
            value={query}
            onChange={this.handleSearch}
          />
        </div>
        <ul className="employee-list">
          {filteredEmployees.map((name, index) => (
            <li key={index} className="employee-item">
              {name}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
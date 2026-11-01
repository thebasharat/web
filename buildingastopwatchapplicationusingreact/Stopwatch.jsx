import React, { Component } from 'react';
import '../App.css';

class Stopwatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      isRunning: false,
      laps: []
    };
    this.timer = null;

    this.handleStart = this.handleStart.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleAddLap = this.handleAddLap.bind(this);
    this.formatTime = this.formatTime.bind(this);
  }

  componentDidMount() {
    // Timer is started/stopped reactively in componentDidUpdate,
    // nothing needs to run automatically on mount.
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isRunning !== this.state.isRunning) {
      if (this.state.isRunning) {
        this.timer = setInterval(() => {
          this.setState((prevState) => ({ time: prevState.time + 10 }));
        }, 10);
      } else {
        clearInterval(this.timer);
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  formatTime(ms) {
    const centiseconds = Math.floor((ms % 1000) / 10);
    const totalSeconds = Math.floor(ms / 1000);
    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60);
    const pad = (num) => String(num).padStart(2, '0');
    return `${pad(minutes)}:${pad(seconds)}.${pad(centiseconds)}`;
  }

  handleStart() {
    this.setState({ isRunning: true });
  }

  handleStop() {
    this.setState((prevState) => ({
      isRunning: false,
      laps: [...prevState.laps, prevState.time]
    }));
  }

  handleReset() {
    clearInterval(this.timer);
    this.setState({ time: 0, isRunning: false, laps: [] });
  }

  handleAddLap() {
    this.setState((prevState) => ({
      laps: [...prevState.laps, prevState.time]
    }));
  }

  render() {
    const { time, isRunning, laps } = this.state;

    return (
      <div className="stopwatch-card">
        <h2 className="stopwatch-title">Stopwatch</h2>
        <div className="stopwatch-time">{this.formatTime(time)}</div>

        <div className="stopwatch-buttons">
          <button
            className="btn btn-start"
            onClick={this.handleStart}
            disabled={isRunning}
          >
            Start
          </button>
          <button
            className="btn btn-stop"
            onClick={this.handleStop}
            disabled={!isRunning}
          >
            Stop
          </button>
          <button
            className="btn btn-reset"
            onClick={this.handleReset}
            disabled={isRunning}
          >
            Reset
          </button>
        </div>

        <button
          className="btn btn-lap"
          onClick={this.handleAddLap}
          disabled={!isRunning}
        >
          Add Lap
        </button>

        {laps.length > 0 && (
          <ul className="lap-list">
            {laps.map((lap, index) => (
              <li key={index} className="lap-item">
                Lap {index + 1}: {this.formatTime(lap)}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default Stopwatch;
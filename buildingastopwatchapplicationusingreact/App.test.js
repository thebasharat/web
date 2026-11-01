import React from 'react';
import { render, fireEvent, getByAltText, getAllByText } from '@testing-library/react';
import Stopwatch from '../components/Stopwatch';

describe('Stopwatch Component', () => {
  it('renders_Stopwatch_without_crashing', () => {
    const {getByText} = render(<Stopwatch />);
    const stopwatch = getByText('Stopwatch');
    expect(stopwatch).toBeInTheDocument();
  });

  it('starts_the_stopwatch_when_Start_button_is_clicked', () => {
    const { getByText } = render(<Stopwatch />);
    const startButton = getByText('Start');
    fireEvent.click(startButton);
    expect(startButton).toBeDisabled(); 
  });

  it('stops_the_stopwatch_when_Stop_button_is_clicked', () => {
    const { getByText } = render(<Stopwatch />);
    const startButton = getByText('Start');
    fireEvent.click(startButton);
    const stopButton = getByText('Stop');
    fireEvent.click(stopButton);
    expect(stopButton).toBeDisabled(); 
  });

  it('adds_a_lap_when_Add_Lap_button_is_clicked', () => {
    const { getByText, container } = render(<Stopwatch />);
    const startButton = getByText('Start');
    fireEvent.click(startButton);
  
    const addLapButton = getByText('Add Lap');
    fireEvent.click(addLapButton);
    
  });


  it('resets_the_stopwatch_when_Reset_button_is_clicked', () => {
    const { getByText } = render(<Stopwatch />);
    const startButton = getByText('Start');
    fireEvent.click(startButton);

    const resetButton = getByText('Reset');
    fireEvent.click(resetButton);
    const timeDisplay = getByText('00:00.00');
    expect(timeDisplay).toBeInTheDocument();
  });

  it('formats_time_correctly', () => {
    const { getByText } = render(<Stopwatch />);
    const formattedTime = getByText('00:00.00');
    expect(formattedTime).toBeInTheDocument();
  });

  it('toggles_the_is_Running_state_when_start_and_stop_buttons_are_clicked', () => {
    const { getByText } = render(<Stopwatch />);
    const startButton = getByText('Start');
    fireEvent.click(startButton);
    const stopButton = getByText('Stop');
    fireEvent.click(stopButton);
    expect(startButton).not.toBeDisabled();
  });

  it('disables_Add_Lap_button_when_stopwatch_is_not_running', () => {
    const { getByText } = render(<Stopwatch />);
    const addLapButton = getByText('Add Lap');
    expect(addLapButton).toBeDisabled();
  });

  it('disables_Stop_button_when_stopwatch_is_not_running', () => {
    const { getByText } = render(<Stopwatch />);
    const stopButton = getByText('Stop');
    expect(stopButton).toBeDisabled();
  });

  
  
  it('disables_Add_Lap_button_after_stopping_the_stopwatch', () => {
    const { getByText } = render(<Stopwatch />);
    const startButton = getByText('Start');
    fireEvent.click(startButton);
  
    const stopButton = getByText('Stop');
    fireEvent.click(stopButton);
  
    const addLapButton = getByText('Add Lap');
    expect(addLapButton).toBeDisabled();
  });
  
});
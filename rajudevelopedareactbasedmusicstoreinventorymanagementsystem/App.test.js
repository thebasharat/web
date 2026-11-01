import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import MusicStore from '../components/MusicStore';

// Mocking window.alert
beforeAll(() => {
  global.alert = jest.fn();
});

afterEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  global.alert.mockRestore();
});

// Test 1: Check if main heading is rendered
test('renders_MusicStore_heading_is_present', () => {
  render(<MusicStore />);
  expect(screen.getByText('Music Store Inventory')).toBeInTheDocument();
});

// Test 2: Check if initial inventory items are displayed
test('displays_initial_inventory_items_are_present', () => {
  render(<MusicStore />);
  expect(screen.getByText('Acoustic Guitar')).toBeInTheDocument();
  expect(screen.getByText('Electric Keyboard')).toBeInTheDocument();
  expect(screen.getByText('Drum Set')).toBeInTheDocument();
});

// Test 3: Check alert when trying to add item with empty fields
test('displays_alert_if_fields_are_empty_when_adding_new_item', async () => {
  render(<MusicStore />);
  fireEvent.click(screen.getByText('Add Item'));
  await waitFor(() => {
    expect(global.alert).toHaveBeenCalledWith('Please fill in all fields');
  });
});

// Test 4: Add a new item successfully
test('adds_a_new_item_successfully', () => {
  render(<MusicStore />);

  // Fill in the form fields
  fireEvent.change(screen.getByPlaceholderText('Instrument / Album Name'), { target: { value: 'Violin' } });
  fireEvent.change(screen.getByPlaceholderText('Quantity'), { target: { value: '8' } });
  fireEvent.change(screen.getByPlaceholderText('Price ($)'), { target: { value: '200' } });

  // Click add item button
  fireEvent.click(screen.getByText('Add Item'));

  // Verify the new item appears
  expect(screen.getByText('Violin')).toBeInTheDocument();
  expect(screen.getByText('8')).toBeInTheDocument();
  expect(screen.getByText('$200.00')).toBeInTheDocument();
});

// Test 5: Check if Add Item button is rendered
test('renders_Add_Item_button', () => {
  render(<MusicStore />);
  const addItemButton = screen.getByText('Add Item');
  expect(addItemButton).toBeInTheDocument();
});

// Test 6: Bootstrap CSS classes are applied correctly
test('bootstrap_classes_are_applied_correctly', () => {
  const { container } = render(<MusicStore />);
  
  // ✅ Container
  const containerDiv = container.querySelector('.container');
  expect(containerDiv).toHaveClass('container', 'my-4');

  // ✅ Table
  const table = container.querySelector('.table');
  expect(table).toHaveClass('table', 'table-bordered', 'table-hover', 'shadow-sm');

  // ✅ Table header color
  const thead = container.querySelector('.table-warning');
  expect(thead).toBeInTheDocument();

  // ✅ Button class
  const button = screen.getByText('Add Item');
  expect(button).toHaveClass('btn', 'btn-warning', 'w-100', 'fw-bold');
});

// Test 7: Form inputs are cleared after successfully adding an item
test('form_inputs_are_cleared_after_adding_item', () => {
  render(<MusicStore />);
  
  const nameInput = screen.getByPlaceholderText('Instrument / Album Name');
  const quantityInput = screen.getByPlaceholderText('Quantity');
  const priceInput = screen.getByPlaceholderText('Price ($)');
  
  fireEvent.change(nameInput, { target: { value: 'Flute' } });
  fireEvent.change(quantityInput, { target: { value: '12' } });
  fireEvent.change(priceInput, { target: { value: '50' } });
  
  // Verify before submit
  expect(nameInput.value).toBe('Flute');
  expect(quantityInput.value).toBe('12');
  expect(priceInput.value).toBe('50');
  
  // Click add item button
  fireEvent.click(screen.getByText('Add Item'));
  
  // Verify cleared after submit
  expect(nameInput.value).toBe('');
  expect(quantityInput.value).toBe('');
  expect(priceInput.value).toBe('');
});

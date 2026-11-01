import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import FoodOrder from '../components/FoodOrder';

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
test('renders_Food_Order_Management_heading_is_present', () => {
  render(<FoodOrder />);
  expect(screen.getByText('Food Order Management')).toBeInTheDocument();
});

// Test 2: Check if initial food order items are displayed
test('displays_initial_food_order_items_is_present', () => {
  render(<FoodOrder />);
  expect(screen.getByText('Burger')).toBeInTheDocument();
  expect(screen.getByText('Pizza')).toBeInTheDocument();
  expect(screen.getByText('Pasta')).toBeInTheDocument();
});

// Test 3: Check alert when trying to add order with empty fields
test('displays_an_alert_if_all_fields_are_not_filled_when_adding_a_new_order', async () => {
  render(<FoodOrder />);
  fireEvent.click(screen.getByText('Add Order'));
  await waitFor(() => {
    expect(global.alert).toHaveBeenCalledWith('Please fill in all fields');
  });
});

// Test 4: Add a new food order successfully
test('adds_a_new_food_order_to_the_list_is_working', () => {
  render(<FoodOrder />);
  
  // Fill in the form fields
  fireEvent.change(screen.getByPlaceholderText('Food Item'), { target: { value: 'Sandwich' } });
  fireEvent.change(screen.getByPlaceholderText('Quantity'), { target: { value: '5' } });
  fireEvent.change(screen.getByPlaceholderText('Price ($)'), { target: { value: '120' } });
  
  // Click add order button
  fireEvent.click(screen.getByText('Add Order'));

  // Verify the new food order appears in the table
  expect(screen.getByText('Sandwich')).toBeInTheDocument();
  expect(screen.getByText('5')).toBeInTheDocument();
  expect(screen.getByText('120')).toBeInTheDocument();
});

// Test 5: Check if Add Order button is rendered
test('renders_Add_Order_button_is_working', () => {
  render(<FoodOrder />);
  const addOrderButton = screen.getByText('Add Order');
  expect(addOrderButton).toBeInTheDocument();
});

// Test 6: Bootstrap CSS classes are applied correctly
test('bootstrap_classes_are_applied_correctly', () => {
  const { container } = render(<FoodOrder />);
  
  // Check if Bootstrap container class is applied
  const containerDiv = container.querySelector('.container');
  expect(containerDiv).toBeInTheDocument();
  expect(containerDiv).toHaveClass('container', 'my-4');
  
  // Check if Bootstrap table classes are applied
  const table = screen.getByRole('table');
  expect(table).toHaveClass('table', 'table-striped', 'table-bordered');
  
  // Check if Bootstrap button classes are applied
  const addButton = screen.getByText('Add Order');
  expect(addButton).toHaveClass('btn', 'btn-success', 'w-100');
});

// Test 7: Form inputs are cleared after successfully adding food order
test('form_inputs_are_cleared_after_adding_food_order', () => {
  render(<FoodOrder />);
  
  // Fill in the form fields
  const itemInput = screen.getByPlaceholderText('Food Item');
  const quantityInput = screen.getByPlaceholderText('Quantity');
  const priceInput = screen.getByPlaceholderText('Price ($)');
  
  fireEvent.change(itemInput, { target: { value: 'Salad' } });
  fireEvent.change(quantityInput, { target: { value: '1' } });
  fireEvent.change(priceInput, { target: { value: '80' } });
  
  // Verify fields have values before submission
  expect(itemInput.value).toBe('Salad');
  expect(quantityInput.value).toBe('1');
  expect(priceInput.value).toBe('80');
  
  // Click add order button
  fireEvent.click(screen.getByText('Add Order'));
  
  // Verify form fields are cleared after successful addition
  expect(itemInput.value).toBe('');
  expect(quantityInput.value).toBe('');
  expect(priceInput.value).toBe('');
});
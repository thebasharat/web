import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import MedicalShop from '../components/MedicalShop';

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
test('renders_Medical_Shop_Inventory_heading_is_present', () => {
  render(<MedicalShop />);
  expect(screen.getByText('Medical Shop Inventory')).toBeInTheDocument();
});

// Test 2: Check if initial inventory items are displayed
test('displays_initial_inventory_items_is_present', () => {
  render(<MedicalShop />);
  expect(screen.getByText('Paracetamol')).toBeInTheDocument();
  expect(screen.getByText('Aspirin')).toBeInTheDocument();
  expect(screen.getByText('Band-Aid')).toBeInTheDocument();
});

// Test 3: Check alert when trying to add medicine with empty fields
test('displays_an_alert_if_all_fields_are_not_filled_when_adding_a_new_medicine', async () => {
  render(<MedicalShop />);
  fireEvent.click(screen.getByText('Add Medicine'));
  await waitFor(() => {
    expect(global.alert).toHaveBeenCalledWith('Please fill in all fields');
  });
});

// Test 4: Add a new medicine successfully
test('adds_a_new_medicine_to_the_inventory_is_working', () => {
  render(<MedicalShop />);
  
  // Fill in the form fields
  fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'Ibuprofen' } });
  fireEvent.change(screen.getByPlaceholderText('Quantity'), { target: { value: '40' } });
  fireEvent.change(screen.getByPlaceholderText('Price'), { target: { value: '1.5' } });
  
  // Click add medicine button
  fireEvent.click(screen.getByText('Add Medicine'));

  // Verify the new medicine appears in the table
  expect(screen.getByText('Ibuprofen')).toBeInTheDocument();
  expect(screen.getByText('40')).toBeInTheDocument();
  expect(screen.getByText('1.5')).toBeInTheDocument();
});

// Test 5: Check if Add Medicine button is rendered
test('renders_Add_Medicine_button_is_working', () => {
  render(<MedicalShop />);
  const addMedicineButton = screen.getByText('Add Medicine');
  expect(addMedicineButton).toBeInTheDocument();
});

// Test 6: Bootstrap CSS classes are applied correctly
test('bootstrap_classes_are_applied_correctly', () => {
  const { container } = render(<MedicalShop />);
  
  // Check if Bootstrap container class is applied
  const containerDiv = container.querySelector('.container');
  expect(containerDiv).toBeInTheDocument();
  expect(containerDiv).toHaveClass('container', 'my-4');
  
  // Check if Bootstrap table classes are applied
  const table = screen.getByRole('table');
  expect(table).toHaveClass('table', 'table-striped', 'table-bordered');
  
  // Check if Bootstrap button classes are applied
  const addButton = screen.getByText('Add Medicine');
  expect(addButton).toHaveClass('btn', 'btn-success', 'w-100');
});

// Test 7: Form inputs are cleared after successfully adding medicine
test('form_inputs_are_cleared_after_adding_medicine', () => {
  render(<MedicalShop />);
  
  // Fill in the form fields
  const nameInput = screen.getByPlaceholderText('Name');
  const quantityInput = screen.getByPlaceholderText('Quantity');
  const priceInput = screen.getByPlaceholderText('Price');
  
  fireEvent.change(nameInput, { target: { value: 'Cough Syrup' } });
  fireEvent.change(quantityInput, { target: { value: '25' } });
  fireEvent.change(priceInput, { target: { value: '5.99' } });
  
  // Verify fields have values before submission
  expect(nameInput.value).toBe('Cough Syrup');
  expect(quantityInput.value).toBe('25');
  expect(priceInput.value).toBe('5.99');
  
  // Click add medicine button
  fireEvent.click(screen.getByText('Add Medicine'));
  
  // Verify form fields are cleared after successful addition
  expect(nameInput.value).toBe('');
  expect(quantityInput.value).toBe('');
  expect(priceInput.value).toBe('');
});
import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Bookstore from '../components/Bookstore';

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
test('renders_Bookstore_Inventory_heading_is_present', () => {
  render(<Bookstore />);
  expect(screen.getByText('Bookstore Inventory')).toBeInTheDocument();
  expect(screen.getByText('Manage your book collection with ease')).toBeInTheDocument();
});

// Test 2: Check if initial inventory items are displayed
test('displays_initial_inventory_items_is_present', () => {
  render(<Bookstore />);
  expect(screen.getByText('The Great Gatsby')).toBeInTheDocument();
  expect(screen.getByText('1984')).toBeInTheDocument();
  expect(screen.getByText('To Kill a Mockingbird')).toBeInTheDocument();
});

// Test 3: Check alert when trying to add book with empty fields
test('displays_an_alert_if_all_fields_are_not_filled_when_adding_a_new_book', async () => {
  render(<Bookstore />);
  fireEvent.click(screen.getByText('Add Book'));
  await waitFor(() => {
    expect(global.alert).toHaveBeenCalledWith('Please fill in all fields');
  });
});

// Test 4: Add a new book successfully
test('adds_a_new_book_to_the_inventory_is_working', () => {
  render(<Bookstore />);
  
  // Fill in the form fields
  fireEvent.change(screen.getByPlaceholderText('Book Title'), { target: { value: 'Clean Code' } });
  fireEvent.change(screen.getByPlaceholderText('Author'), { target: { value: 'Robert C. Martin' } });
  fireEvent.change(screen.getByPlaceholderText('Stock'), { target: { value: '20' } });
  fireEvent.change(screen.getByPlaceholderText('Price ($)'), { target: { value: '30' } });
  
  // Click add book button
  fireEvent.click(screen.getByText('Add Book'));

  // Verify the new book appears
  expect(screen.getByText('Clean Code')).toBeInTheDocument();
  expect(screen.getByText(/Robert C. Martin/)).toBeInTheDocument();
  expect(screen.getByText(/20/)).toBeInTheDocument();
  expect(screen.getByText(/\$30.00/)).toBeInTheDocument();
});

// Test 5: Check if Add Book button is rendered
test('renders_Add_Book_button_is_working', () => {
  render(<Bookstore />);
  const addBookButton = screen.getByText('Add Book');
  expect(addBookButton).toBeInTheDocument();
});

// Test 6: Bootstrap CSS classes are applied correctly
test('bootstrap_classes_are_applied_correctly', () => {
  const { container } = render(<Bookstore />);
  
  // Check if Bootstrap container class is applied
  const containerDiv = container.querySelector('.container');
  expect(containerDiv).toBeInTheDocument();
  expect(containerDiv).toHaveClass('container', 'my-5');
  
  // Check if Bootstrap card is applied
  const card = container.querySelector('.card');
  expect(card).toHaveClass('card', 'shadow-sm');
  
  // Check if Bootstrap button classes are applied
  const addButton = screen.getByText('Add Book');
  expect(addButton).toHaveClass('btn', 'btn-success', 'w-100');
});

// Test 7: Form inputs are cleared after successfully adding book
test('form_inputs_are_cleared_after_adding_book', () => {
  render(<Bookstore />);
  
  // Fill in the form fields
  const titleInput = screen.getByPlaceholderText('Book Title');
  const authorInput = screen.getByPlaceholderText('Author');
  const stockInput = screen.getByPlaceholderText('Stock');
  const priceInput = screen.getByPlaceholderText('Price ($)');
  
  fireEvent.change(titleInput, { target: { value: 'Refactoring' } });
  fireEvent.change(authorInput, { target: { value: 'Martin Fowler' } });
  fireEvent.change(stockInput, { target: { value: '10' } });
  fireEvent.change(priceInput, { target: { value: '45.50' } });
  
  // Verify before submit
  expect(titleInput.value).toBe('Refactoring');
  expect(authorInput.value).toBe('Martin Fowler');
  expect(stockInput.value).toBe('10');
  expect(priceInput.value).toBe('45.50');
  
  // Click add book button
  fireEvent.click(screen.getByText('Add Book'));
  
  // Verify cleared after submit
  expect(titleInput.value).toBe('');
  expect(authorInput.value).toBe('');
  expect(stockInput.value).toBe('');
  expect(priceInput.value).toBe('');
});

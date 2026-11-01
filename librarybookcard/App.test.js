import React from 'react';
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import App from '../App';
import BookCard from '../components/BookCard';

describe("App", () => {
  test("renders_book_card_component", () => {
    render(<App />);
    const card = document.querySelector('#book-card');
    expect(card).toBeInTheDocument();
  });
});

describe("BookCard", () => {
  test("displays_book_title", () => {
    render(<BookCard bookTitle="The Alchemist" authorName="Paulo Coelho" availabilityStatus="Available" />);
    expect(screen.getByText("The Alchemist")).toBeInTheDocument();
  });

  test("displays_author_name", () => {
    render(<BookCard bookTitle="The Alchemist" authorName="Paulo Coelho" availabilityStatus="Available" />);
    expect(screen.getByText("Author: Paulo Coelho")).toBeInTheDocument();
  });

  test("displays_availability_status", () => {
    render(<BookCard bookTitle="The Alchemist" authorName="Paulo Coelho" availabilityStatus="Available" />);
    expect(screen.getByText("Status: Available")).toBeInTheDocument();
  });

  test("bookcard_accepts_different_props", () => {
    render(<BookCard bookTitle="Wings of Fire" authorName="A.P.J Abdul Kalam" availabilityStatus="Not Available" />);
    expect(screen.getByText("Wings of Fire")).toBeInTheDocument();
    expect(screen.getByText("Author: A.P.J Abdul Kalam")).toBeInTheDocument();
    expect(screen.getByText("Status: Not Available")).toBeInTheDocument();
  });

  test("validates_proptypes", () => {
    const { propTypes } = BookCard;
    expect(propTypes).toHaveProperty("bookTitle");
    expect(propTypes).toHaveProperty("authorName");
    expect(propTypes).toHaveProperty("availabilityStatus");
  });
});
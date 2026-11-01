import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom";
import App from '../App';
import PriceTag from '../components/PriceTag';

describe("App", () => {
  test("renders_price_tag_component", () => {
    render(<App />);
    const tag = document.querySelector('#price-tag');
    expect(tag).toBeInTheDocument();
  });
});

describe("PriceTag", () => {
  test("displays_product_name", () => {
    render(<PriceTag productName="Wireless Headphones" originalPrice={2000} />);
    expect(screen.getByText("Wireless Headphones")).toBeInTheDocument();
  });

  test("displays_original_price", () => {
    render(<PriceTag productName="Wireless Headphones" originalPrice={2000} />);
    expect(screen.getByText("Price: ₹2000")).toBeInTheDocument();
  });

  test("displays_apply_discount_button", () => {
    render(<PriceTag productName="Wireless Headphones" originalPrice={2000} />);
    expect(screen.getByText("Apply Discount")).toBeInTheDocument();
  });

  test("toggles_price_on_discount_click", () => {
    render(<PriceTag productName="Wireless Headphones" originalPrice={2000} />);
    const button = document.querySelector('#toggle-discount');
    fireEvent.click(button);
    expect(screen.getByText("Price: ₹1800")).toBeInTheDocument();
  });

  test("toggles_button_text_on_click", () => {
    render(<PriceTag productName="Wireless Headphones" originalPrice={2000} />);
    const button = document.querySelector('#toggle-discount');
    fireEvent.click(button);
    expect(screen.getByText("Remove Discount")).toBeInTheDocument();
  });
});
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom";
import App from '../App';
import RecipeCard from '../components/RecipeCard';

describe("App", () => {
  test("renders_page_title", () => {
    render(<App />);
    expect(screen.getByText("Recipe Book")).toBeInTheDocument();
  });

  test("renders_all_recipe_cards", () => {
    render(<App />);
    const cards = document.querySelectorAll('.recipe-card');
    expect(cards.length).toBe(3);
  });
});

describe("RecipeCard", () => {
  test("renders_recipe_name", () => {
    render(<RecipeCard recipeName="Masala Dosa" cuisine="South Indian" cookTime="30 mins" />);
    expect(screen.getByText("Masala Dosa")).toBeInTheDocument();
  });

  test("renders_recipe_cuisine", () => {
    render(<RecipeCard recipeName="Masala Dosa" cuisine="South Indian" cookTime="30 mins" />);
    expect(screen.getByText("Cuisine: South Indian")).toBeInTheDocument();
  });

  test("renders_recipe_cook_time", () => {
    render(<RecipeCard recipeName="Masala Dosa" cuisine="South Indian" cookTime="30 mins" />);
    expect(screen.getByText("Cook Time: 30 mins")).toBeInTheDocument();
  });

  test("renders_add_to_favourites_button", () => {
    render(<RecipeCard recipeName="Masala Dosa" cuisine="South Indian" cookTime="30 mins" />);
    expect(screen.getByText("Add to Favourites")).toBeInTheDocument();
  });

  test("toggles_favourite_status_on_click", () => {
    render(<RecipeCard recipeName="Masala Dosa" cuisine="South Indian" cookTime="30 mins" />);
    const button = document.querySelector('#favourite-btn');
    fireEvent.click(button);
    expect(screen.getByText("Remove from Favourites")).toBeInTheDocument();
    expect(screen.getByText("Status: Favourite")).toBeInTheDocument();
  });

  test("validates_proptypes", () => {
    const { propTypes } = RecipeCard;
    expect(propTypes).toHaveProperty("recipeName");
    expect(propTypes).toHaveProperty("cuisine");
    expect(propTypes).toHaveProperty("cookTime");
  });
});
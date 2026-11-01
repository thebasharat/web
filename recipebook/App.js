import React from 'react';
import RecipeCard from './components/RecipeCard';
import './App.css';

const recipes = [
  { id: 1, recipeName: 'Masala Dosa', cuisine: 'South Indian', cookTime: '30 mins' },
  { id: 2, recipeName: 'Butter Chicken', cuisine: 'North Indian', cookTime: '45 mins' },
  { id: 3, recipeName: 'Pav Bhaji', cuisine: 'Street Food', cookTime: '40 mins' },
];

function App() {
  return (
    <div id="app-container">
      <h1 id="page-title">Recipe Book</h1>
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipeName={recipe.recipeName}
          cuisine={recipe.cuisine}
          cookTime={recipe.cookTime}
        />
      ))}
    </div>
  );
}

export default App;
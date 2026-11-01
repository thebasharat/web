import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './RecipeCard.css';

function RecipeCard({ recipeName, cuisine, cookTime }) {
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    console.log('Favourite status changed for: ' + recipeName);
  }, [isFavourite]);

  return (
    <div className="recipe-card">
      <h2 className="recipe-name">{recipeName}</h2>
      <p className="recipe-cuisine">{`Cuisine: ${cuisine}`}</p>
      <p className="recipe-cook-time">{`Cook Time: ${cookTime}`}</p>
      <button id="favourite-btn" onClick={() => setIsFavourite(!isFavourite)}>
        {isFavourite ? 'Remove from Favourites' : 'Add to Favourites'}
      </button>
      <p id="favourite-status">
        {isFavourite ? 'Status: Favourite' : 'Status: Not a Favourite'}
      </p>
    </div>
  );
}

RecipeCard.propTypes = {
  recipeName: PropTypes.string.isRequired,
  cuisine: PropTypes.string.isRequired,
  cookTime: PropTypes.string.isRequired,
};

export default RecipeCard;
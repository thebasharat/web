
import React from 'react';
import BookCard from './components/BookCard';

function App() {
  return (
    <BookCard
      bookTitle="The Alchemist"
      authorName="Paulo Coelho"
      availabilityStatus="Available"
    />
  );
}

export default App;
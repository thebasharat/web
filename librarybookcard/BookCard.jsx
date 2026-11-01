import React from 'react';
import PropTypes from 'prop-types';
import './BookCard.css';

function BookCard({ bookTitle, authorName, availabilityStatus }) {
  return (
    <div id="book-card">
      <h2 id="book-title">{bookTitle}</h2>
      <p id="author-name">Author: {authorName}</p>
      <p id="availability-status">Status: {availabilityStatus}</p>
    </div>
  );
}

BookCard.propTypes = {
  bookTitle: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
  availabilityStatus: PropTypes.string.isRequired,
};

export default BookCard;

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Marks.css';

function Marks({ marks }) {
  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    const total = marks.reduce((sum, mark) => sum + mark.score, 0);
    setTotalScore(total);
    console.log('Visited Marks Page');
  }, [marks]);

  return (
    <div id="marks-container">
      <h1 id="marks-title">Subject Marks</h1>
      <div id="marks-list">
        {marks.map((mark) => (
          <div className="mark-item" key={mark.subject}>
            <span className="mark-subject">{mark.subject}</span>
            <span className="mark-score">{`Score: ${mark.score}`}</span>
          </div>
        ))}
      </div>
      <p id="total-score">{`Total Score: ${totalScore}`}</p>
    </div>
  );
}

Marks.propTypes = {
  marks: PropTypes.arrayOf(
    PropTypes.shape({
      subject: PropTypes.string,
      score: PropTypes.number,
    })
  ).isRequired,
};

export default Marks;
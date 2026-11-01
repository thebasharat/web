import React from 'react';

function CropList({ crops }) {
  return (
    <ul className="crop-list">
      {crops.map((crop, index) => (
        <li key={index} className="crop-item">
          {crop.name}
        </li>
      ))}
    </ul>
  );
}

export default CropList;
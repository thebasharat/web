import React, { useState } from 'react';
import CropList from './CropList';

function CropDashboard({ crops }) {
  const [cropRecords] = useState(crops);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCrops = cropRecords.filter((crop) =>
    crop.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="crop-dashboard">
      <label htmlFor="cropSearch">Search by Crop Name</label>
      <input
        type="text"
        id="cropSearch"
        placeholder="Search crops"
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <CropList crops={filteredCrops} />
    </div>
  );
}

export default CropDashboard;
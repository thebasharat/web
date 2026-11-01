import React from 'react';
import CropDashboard from './Components/CropDashboard';

const initialCrops = [
  { name: 'Tomato', type: 'Vegetables', status: 'Growing' },
  { name: 'Apple', type: 'Fruits', status: 'Planted' },
  { name: 'Wheat', type: 'Grains', status: 'Harvested' },
  { name: 'Carrot', type: 'Vegetables', status: 'Growing' },
  { name: 'Banana', type: 'Fruits', status: 'Growing' }
];

function App() {
  return (
    <div className="App">
      <h1>Crop Management System</h1>
      <CropDashboard crops={initialCrops} />
    </div>
  );
}

export default App;
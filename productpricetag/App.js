import React from 'react';
import PriceTag from './components/PriceTag';

function App() {
  return (
    <div className="App">
      <PriceTag productName="Wireless Headphones" originalPrice={2000} />
    </div>
  );
}

export default App;
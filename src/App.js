import { useState } from 'react';
import Banner from './components/banner/Banner';
import ListingsBody from './components/listings/ListingsBody';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="App">
      <Banner setSearchTerm={setSearchTerm} />
      <ListingsBody searchTerm={searchTerm} />
    </div>
  );
}

export default App;

import { useState } from 'react';
import Banner from './components/banner/Banner';
import ListingsBody from './components/listings/ListingsBody';
import { listings } from '../src/mockData';
import './App.css';

function App() {
  // For Property Name search filter
  const [searchTerm, setSearchTerm] = useState('');
  
  const listingsData = 
  searchTerm == "" ? 
  listings.sort((a, b) => a.name > b.name ? 1: -1) : 
  listings.filter(
    ({name}) => name
      .toLowerCase()
      .includes(searchTerm.toLowerCase()))
  .sort((a, b) => a.name > b.name ? 1: -1);

  // For Pagination
  const [listingsPerPage, setListingsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const numberOfListings = listingsData.length;
  const numberOfPages = Math.ceil(numberOfListings/listingsPerPage);
  const firstListingIndex = (currentPage - 1) * listingsPerPage;
  const lastListingIndex = (firstListingIndex + listingsPerPage);
  return (
    <div className="App">
      <Banner 
        listingsData={listingsData}
        setSearchTerm={setSearchTerm}
        listingsPerPage={listingsPerPage}
        setListingsPerPage={setListingsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        numberOfPages={numberOfPages}
      />
      <ListingsBody
        listingsData={listingsData}
        firstListingIndex={firstListingIndex}
        lastListingIndex={lastListingIndex}
      />
    </div>
  );
}

export default App;

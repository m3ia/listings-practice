import { useState } from 'react';
import Banner from './components/banner/Banner';
import ListingsBody from './components/listings/ListingsBody';
import { listings } from '../src/mockData';
import './App.css';


 // For Pagination
 export const getPaginationInfo = (listingsData, listingsPerPage, currentPage) => {
  const numberOfListings = listingsData.length;
  const numberOfPages = Math.ceil(numberOfListings/listingsPerPage);
  const firstListingIndex = (currentPage - 1) * listingsPerPage;
  const lastListingIndex = (firstListingIndex + listingsPerPage);

  return {numberOfListings, numberOfPages, firstListingIndex, lastListingIndex};
 }

function App() {
  // For Property Name search filter
  const [searchTerm, setSearchTerm] = useState('');
  // For Pagination
  const [listingsPerPage, setListingsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  
  const listingsData = 
  searchTerm === "" ? 
  listings.sort((a, b) => a.name > b.name ? 1: -1) : 
  listings.filter(
    ({name}) => name
      .toLowerCase()
      .includes(searchTerm.toLowerCase()))
  .sort((a, b) => a.name > b.name ? 1: -1);

  // Amenities filter
  // look for all selected amenities in the filter
    // Create Dropdown menu with the collection of all the amenities in an alphabetized set
    // based on selection, create a new array: "selectedAmenities"
  // Return properties that match those amenities
  // listingsData.filter(listing => {
  //   if (searchTerm && !doesListingNameMatch(listing, searchTerm)) {
  //     return false;
  //   } 

  //   if (unitAmenities.length > 0 && !doesListingHaveAmenitie(listing, unitAmenities)) {
  //     return false;
  //   } 

  //   // ......

  //   return true;
  // })

  // create a temporary boolean to determine if the listing needs to be filtered (true = show this property; false = filter this property out)
  // length of the preferred amenities === length of each property's unit amenities? if true
    // create a Set for the unit amenities
    // for each preferred amenity, loop through the unit amenities to see if it exists. 
        // if true, check the next one
        // if we're at the last item and they're equal, then return true
    // if true, then 

  const { numberOfPages, firstListingIndex, lastListingIndex } = getPaginationInfo(listingsData, listingsPerPage, currentPage);
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

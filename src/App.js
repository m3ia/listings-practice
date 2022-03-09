import { useState } from "react";
import Banner from "./components/banner/Banner";
import ListingsBody from "./components/listings/ListingsBody";
import { listings } from "../src/mockData";
import "./App.css";

// For Pagination
export const getPaginationInfo = (
  listingsData,
  listingsPerPage,
  currentPage
) => {
  const numberOfListings = listingsData.length;
  const numberOfPages = Math.ceil(numberOfListings / listingsPerPage);
  const firstListingIndex = (currentPage - 1) * listingsPerPage;
  const lastListingIndex = firstListingIndex + listingsPerPage;

  return {
    numberOfListings,
    numberOfPages,
    firstListingIndex,
    lastListingIndex,
  };
};

function App() {
  // For Property Name search filter
  const [searchTerm, setSearchTerm] = useState("");
  // For Pagination
  const [listingsPerPage, setListingsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const listingsData =
    searchTerm === ""
      ? listings.sort((a, b) => (a.name > b.name ? 1 : -1))
      : listings
          .filter(({ name }) =>
            name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .sort((a, b) => (a.name > b.name ? 1 : -1));

  // Amenities Dropdown Filter
  // An array of all Amenities, for Amenities Filter
  // Creates a Set of all unique, possible amenities
  const allAmenitiesSet = new Set([]);
  // Loops through all listings to access units...
  for (let i = 0; i < listingsData.length; i++) {
    // Loops through all units to access amenities...
    const listing = listingsData[i];
    const units = listing.units;
    for (let j = 0; j < units.length; j++) {
      const amenities = units[j].amenities;
      // Loops through each amenity to be added to Set
      for (let k = 0; k < amenities.length; k++) {
        const amenity = amenities[k];
        allAmenitiesSet.add(amenity);
      }
    }
  }
  // Converts the Set to an array, via https://www.geeksforgeeks.org/how-to-convert-set-to-array-in-javascript/
  const allAmenitiesArr = Array.from(allAmenitiesSet);

  const { numberOfPages, firstListingIndex, lastListingIndex } =
    getPaginationInfo(listingsData, listingsPerPage, currentPage);
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
        allAmenitiesArr={allAmenitiesArr}
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

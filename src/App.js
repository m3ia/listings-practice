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

// Filter listing units by amenities
function filterListingsByAmenities(listings, selectedAmenities) {
  if (selectedAmenities.length > 0) {
    // Filter listings based on units
    return listings
      .map((listing) => {
        // Creates a shallow copy for listing to avoid mutating unit property on original object
        let newListing = { ...listing };
        // For each unit, check if amenities contains each selected amenity
        newListing.units = newListing.units.filter((unit) => {
          let amenities = unit.amenities;
          for (let k = 0; k < selectedAmenities.length; k++) {
            // If one unit does not contain one of the selected amenities, filter out the UNIT by returning "false"
            if (!amenities.includes(selectedAmenities[k])) {
              return false;
            }
          }
          // Return true by default
          return true;
        });
        // Returns the LISTING (whether or not there are units that match the criteria)
        return newListing;
        // Filter out any listings with 0 units that match the criteria
      })
      .filter(({ units }) => units.length > 0);
  } else {
    return listings;
  }
}

// Filter By Occupancy Range
function filterListingsByOccupancyRange(listings, minFilter, maxFilter) {
  // Check for just min input && no max
  if (minFilter > 0 || maxFilter > 0) {
    return listings
      .map((listing) => {
        // Create shallow copy of listing
        let newListing = { ...listing };
        //Create shallow copy of filtered units
        newListing.units = newListing.units.filter((unit) => {
          let minRange = unit.minOccupancy;
          let maxRange = unit.maxOccupancy;
          // Checks for min input && no max
          if (minFilter > 0 && !maxFilter) {
            return minRange >= minFilter ? true : false;
            // Checks for max input && no min
          } else if (maxFilter > 0 && !minFilter) {
            return maxRange <= maxFilter ? true : false;
            // Checks for both inputs
          } else if (minFilter > 0 && maxFilter > 0) {
            return minRange >= minFilter && maxRange <= maxFilter
              ? true
              : false;
          }
        });
        return newListing;
      })
      .filter(({ units }) => units.length > 0);
  } else {
    return listings;
  }
}
function App() {
  // For Property Name search filter
  const [inputName, setInputName] = useState("");
  // For Pagination
  const [listingsPerPage, setListingsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  // For amenities filter selection
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  // For occupancy range filters
  const [minFilter, setMinFilter] = useState(0);
  const [maxFilter, setMaxFilter] = useState(0);
  let filteredListings = [...listings];

  // Filter by property name
  if (inputName.length > 0) {
    filteredListings = filteredListings.filter(({ name }) =>
      name.toLowerCase().includes(inputName.toLowerCase())
    );
  }

  filteredListings = filterListingsByAmenities(
    filteredListings,
    selectedAmenities
  );

  filteredListings = filterListingsByOccupancyRange(
    filteredListings,
    minFilter,
    maxFilter
  );
  // Amenities Dropdown Filter
  // An array of all Amenities, for Amenities Filter
  // Creates a Set of all unique, possible amenities
  const allAmenitiesSet = new Set([]);
  // Loops through all listings to access units...
  for (let i = 0; i < listings.length; i++) {
    // Loops through all units to access amenities...
    const listing = listings[i];
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
    getPaginationInfo(filteredListings, listingsPerPage, currentPage);
  return (
    <div className="App">
      <Banner
        listingsData={filteredListings}
        setInputName={setInputName}
        listingsPerPage={listingsPerPage}
        setListingsPerPage={setListingsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        numberOfPages={numberOfPages}
        allAmenitiesArr={allAmenitiesArr}
        selectedAmenities={selectedAmenities}
        setSelectedAmenities={setSelectedAmenities}
        minFilter={minFilter}
        maxFilter={maxFilter}
        setMinFilter={setMinFilter}
        setMaxFilter={setMaxFilter}
      />
      <ListingsBody
        listingsData={filteredListings}
        firstListingIndex={firstListingIndex}
        lastListingIndex={lastListingIndex}
      />
    </div>
  );
}

export default App;

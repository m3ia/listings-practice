import "../../App.css";

// For Amenities Dropdown Filter
const AmenitiesDropdown = ({
  allAmenitiesArr,
  selectedAmenities,
  setSelectedAmenities,
}) => {
  function addSelectedAmenities(amenity) {
    // If selectedAmenities is empty, set it to amenity
    if (selectedAmenities.length === 0) {
      setSelectedAmenities((prev) => (prev = [amenity]));
    } else if (
      selectedAmenities.length > 0 &&
      selectedAmenities.includes(amenity)
    ) {
      // if selectedAmenities already has the selected item, remove it from the array
      setSelectedAmenities((prev) => {
        let newPrev = [];
        for (let i = 0; i < prev.length; i++) {
          if (prev[i] === amenity) {
            continue;
          }
          newPrev.push(prev[i]);
        }
        return newPrev;
      });
    } else if (
      selectedAmenities.length > 0 &&
      !selectedAmenities.includes(amenity)
    ) {
      // if selectedAmenities has at least 1 item, add amenity
      setSelectedAmenities((prev) => [...prev, amenity]);
    }
  }

  // Function that deselects an amenity when user clicks "x" for amenity
  function deselectAmenity(selectedAmenity) {
    setSelectedAmenities((prev) => {
      let newPrev = [];
      for (let i = 0; i < prev.length; i++) {
        if (prev[i] === selectedAmenity) {
          continue;
        } else {
          newPrev.push(prev[i]);
        }
      }
      return newPrev;
    });
  }
  return (
    <div className="amenities-dropdown-filter">
      {/*  Amenities Selection Box  */}
      <div className="selected-amenities border-solid border-2 border-green-500">
        {selectedAmenities.length === 0 && (
          <span className="mx-3 text-sm italic text-slate-400 bg-white w-fit">
            Filter by amenities
          </span>
        )}
        {selectedAmenities.length > 0 &&
          selectedAmenities.map((selectedAmenity) => (
            <span
              key={selectedAmenity}
              className="amenity-button rounded-full-auto bg-green-500"
            >
              {selectedAmenity}
              <button
                className="amenities-x text-neutral-50 font-bold"
                key={selectedAmenity}
                onClick={() => deselectAmenity(selectedAmenity)}
              >
                {" "}
                ×{" "}
              </button>
            </span>
          ))}
      </div>
      {/* Dropdown multi-select list of all unique amenities */}
      <select
        multiple
        className="amenities-dropdown border-solid border-2 border-green-500"
      >
        {allAmenitiesArr
          .filter((amenity) => !selectedAmenities.includes(amenity))
          .map((amenity) => (
            <option
              key={amenity}
              onClick={(event) => {
                addSelectedAmenities(event.target.value);
              }}
            >
              {amenity}
            </option>
          ))}
      </select>
    </div>
  );
};
// For Property Name Filter
const PropertyNameFilter = ({ setSearchTerm }) => {
  return (
    <div>
      <input
        className="placeholder:italic placeholder:text-slate-400 block bg-white w-fit border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
        type="text"
        placeholder="Search by property name"
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
      />
    </div>
  );
};

// For Pagination
const PaginationStation = ({
  listingsPerPage,
  setListingsPerPage,
  currentPage,
  setCurrentPage,
  numberOfPages,
}) => {
  return (
    <>
      <div>
        <div className="pages-counter">
          Page {currentPage} / {numberOfPages}
          <br />
          <div className="pagination-button">
            {currentPage > 1 && (
              <button
                className="rounded bg-orange-100 border-2 border-r-orange-500
                            border-b-orange-500
                            "
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous Page
              </button>
            )}{" "}
            {currentPage < numberOfPages && (
              <button
                className="rounded bg-orange-100 border-2 border-r-orange-500
                            border-b-orange-500
                            "
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next Page
              </button>
            )}
          </div>
          <div className="number-listings-settings">
            <p>
              Show{" "}
              {[10, 20, 30].map((n) =>
                n !== listingsPerPage ? (
                  <a
                    key={n}
                    href="#"
                    onClick={() => {
                      setListingsPerPage(n);
                      setCurrentPage(1);
                    }}
                  >
                    <u>{n} </u>
                  </a>
                ) : (
                  `${n} `
                )
              )}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

function Banner({
  setSearchTerm,
  currentPage,
  numberOfPages,
  setCurrentPage,
  setListingsPerPage,
  listingsPerPage,
  allAmenitiesArr,
  selectedAmenities,
  setSelectedAmenities,
}) {
  return (
    <div className="Banner-container border border-orange-500">
      <div className="amenities-dropdown-filter">
        <AmenitiesDropdown
          allAmenitiesArr={allAmenitiesArr}
          selectedAmenities={selectedAmenities}
          setSelectedAmenities={setSelectedAmenities}
        />
      </div>
      <div className="property-name-filter">
        <PropertyNameFilter setSearchTerm={setSearchTerm} />
      </div>
      <div className="pagination-station">
        <PaginationStation
          currentPage={currentPage}
          numberOfPages={numberOfPages}
          setCurrentPage={setCurrentPage}
          setListingsPerPage={setListingsPerPage}
          listingsPerPage={listingsPerPage}
        />
      </div>
    </div>
  );
}

export default Banner;

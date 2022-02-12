import { ArrowCircleRightIcon } from '@heroicons/react/outline'
import '../../App.css';

// For Property Name Filter
const PropertyNameFilter = ({setSearchTerm}) => {
    return (
        <input
            type="text"
            placeholder="Search by property name"
            onChange={event => {setSearchTerm(event.target.value)}} 
      />
    );
}

// For Pagination
const PaginationStation = ({ listingsPerPage, setListingsPerPage, currentPage, setCurrentPage, numberOfPages}) => {
    return (
        <>
            <div>
                <div className="pages-counter flex-auto">
                    Page {currentPage} / {numberOfPages}
                    <br />
                    <div className="pagination-button">
                        {currentPage > 1 && (
                            <button className="rounded bg-orange-100 border-2 border-r-orange-500
                            border-b-orange-500
                            "
                            onClick={() => setCurrentPage(currentPage-1)}
                            >
                                Previous Page
                            </button>
                        )} {' '}
                        {currentPage < numberOfPages && (
                            <button className="rounded bg-orange-100 border-2 border-r-orange-500
                            border-b-orange-500
                            "
                            onClick={() => setCurrentPage(currentPage+1)}
                            >
                                Next Page
                            </button>
                        )
                        }

                    </div>
                        <p>    Show 10  20  30
                        </p>
                </div>
            </div>
        </>
    )
}

function Banner({setSearchTerm, currentPage, numberOfPages, setCurrentPage, setListingsPerPage}) {
  return (
    <div className="Banner-container">
      <div className="propertyNameFilter">
        <PropertyNameFilter setSearchTerm={setSearchTerm} />
      </div>
      <div className="pagination-station">
        <PaginationStation currentPage={currentPage} numberOfPages={numberOfPages}
        setCurrentPage={setCurrentPage} />
      </div>
    </div>
  );
}

export default Banner;

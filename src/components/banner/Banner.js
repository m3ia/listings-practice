import '../../App.css';

// For Property Name Filter
const PropertyNameFilter = ({setSearchTerm}) => {
    return (
        <div>
            <input
            className=
            "placeholder:italic placeholder:text-slate-400 block bg-white w-fit border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            type="text"
            placeholder="Search by property name"
            onChange={event => {setSearchTerm(event.target.value)}} 
            />
      </div>
    );
}

// For Pagination
const PaginationStation = ({ listingsPerPage, setListingsPerPage, currentPage, setCurrentPage, numberOfPages}) => {
    return (
        <>
            <div>
                <div className="pages-counter">
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
                    <div className="number-listings-settings">
                        <p>
                            Show {' '}
                            {[10, 20, 30].map((n) => (
                                n !== listingsPerPage ? (
                                    <a 
                                        key={n}
                                        href ="#" 
                                        onClick={() => {
                                            setListingsPerPage(n);
                                            setCurrentPage(1);
                                        }
                                            }>
                                        <u>{n} {' '}</u>
                                    </a>
                                ) : `${n} ` 
                            ))}
                        </p>
                    </div>  
                </div>
            </div>
        </>
    )
}

function Banner({setSearchTerm, currentPage, numberOfPages, setCurrentPage, setListingsPerPage, listingsPerPage}) {
  return (
    <div className="Banner-container border border-orange-500">
      <div className="propertyNameFilter">
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

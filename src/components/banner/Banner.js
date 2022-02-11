import '../../App.css';

const PropertyNameFilter = ({setSearchTerm}) => {
    return (
        <input
            type="text"
            placeholder="Search by property name"
            onChange={event => {setSearchTerm(event.target.value)}} 
      />
    );
}
    
function Banner({setSearchTerm}) {
  return (
    <div className="Banner-container">
      <header>
        <p>This is the banner</p>
      </header>
      <div className="propertyNameFilter">
        <PropertyNameFilter setSearchTerm={setSearchTerm} />
      </div>
    </div>
  );
}

export default Banner;

import { listings } from "../../mockData";
import '../../App.css';

const listingsData = listings.sort((a, b) => a.name > b.name ? 1: -1);

const unitTypes = [];

/*
{
  oneBdrm:
  { 
    min: 1,
    max: 10,
    sqFt: [356.50, 232352, 2323],
    avgSqFt: 23432,
    amenities: ['fireplace', 'accessible bathroom']
  }
  twoBedrm:
  {
    min: 2,
    max: 10,
    sqFt: [500.50, 3522, 328],
    avgSqFt: 242.34,
    amenities: ['internet']
  }
}
*/
function unitMapCreator(units) {
  const unitMap = new Map();
  // Loop over units 
  units.forEach( (unit) => {
    // Check if type already exists, and if so, update it
    if (unitMap.has(unit.type)) {
      const stats = unitMap.get(unit.type);
      // Picks the min of the minOccupancies between the passed unit and the current
      stats.min = Math.min(stats.min, unit.minOccupancy);
      stats.max = Math.max(stats.max, unit.maxOccupancy);
      stats.sqFt.push(unit.sqft);
      stats.avgSqFt = stats.sqFt.reduce((a, b) => a + b) / stats.sqFt.length;  
    } else {
      unitMap.set(unit.type, {
        min: unit.minOccupancy,
        max: unit.maxOccupancy,
        sqFt: [unit.sqft],
        avgSqFt: [unit.sqft]
      })
    }
  });

  // Returns an array of unitMap's key-value pairs, from https://stackoverflow.com/questions/43885365/using-map-on-an-iterator
  return Array.from(unitMap, ([key, value]) => [key, value]);
}

function ListingsBody() {
    return (
    <div className="Listings-container">
      <header>
        <p>
          <code>Here is the Listings Body</code>
        </p>
      </header>
      <body className="Listings-table">
        <table class="table-auto" aria-label="simple table">
          <thead>
            <tr>
              <th>Property Info</th>
              <th align="right">Unit&nbsp;Info</th>
            </tr>
          </thead>
          <tbody>
          {listingsData.map((listing) => (
            <tr
              key={listing.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <td align="left">
                {listing.name}
                <br />
                <img src={listing.picture} />
              </td>
              <td align="right">
                <table class="unit-table table-auto">
                  <thead>
                    <th>Unit&nbsp;type</th>
                    <th>Average&nbsp;Square&nbsp;Footage</th>
                    <th>Range</th>
                  </thead>
                  <tbody>
                    {unitMapCreator(listing.units).map(([unitType, stats]) => (
                      <tr>
                        <td>{unitType}</td>
                        <td>{stats.avgSqFt}</td>
                        <td>{stats.min} - {stats.max}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
              {/* <td align="left">Unit Type Here</td>
              <td align="left">Avg sq fooage Here</td>
              <td align="left">Range here</td> */}
            </tr>
          ))}
        </tbody>
        </table>
      </body>
    </div>
  );
}

export default ListingsBody;

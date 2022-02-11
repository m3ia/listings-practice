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
  const unitTypes = {
    studio: 'Studio',
    oneBdrm: '1-bedroom',
    twoBdrm: '2-bedroom',
    threeBdrm: '3-bedroom',
    fourBdrm: '4-bedroom'
  }
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
      unitMap.set(unitTypes[unit.type], {
        min: unit.minOccupancy,
        max: unit.maxOccupancy,
        sqFt: [unit.sqft],
        avgSqFt: unit.sqft
      })
    }
  });
  // Returns an array of unitMap's key-value pairs, from https://stackoverflow.com/questions/43885365/using-map-on-an-iterator
  return Array.from(unitMap, ([key, value]) => [key, value]);
}

function ListingsBody() {
    return (
    <>
      <header>
        <p>
          <code>Here is the Listings Body</code>
        </p>
      </header>
      <div className="Listings-table">
        <table className="table-auto" aria-label="simple table">
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
                <table className="unit-table table-auto">
                  <thead>
                    <tr>
                      <th align="left">Unit&nbsp;type</th>
                      <th align="center">Average&nbsp;Sq.&nbsp;Ft</th>
                      <th align="right">Range</th>
                    </tr>
                  </thead>
                  <tbody>
                    {unitMapCreator(listing.units).map(([unitType, stats]) => (
                      <tr>
                        <td align="left">{unitType}</td>
                        <td align="center">~{(stats.avgSqFt).toFixed(0)} sqft</td>
                        <td align="center">{stats.min} - {stats.max}</td>
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
      </div>
    </>
  );
}

export default ListingsBody;

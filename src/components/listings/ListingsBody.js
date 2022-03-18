import "../../App.css";

/*
Example format for the units Map: 
{
  1 bdr:
  { 
    min: 1,
    max: 10,
    sqFt: [356.50, 232352, 2323],
    avgSqFt: 23432,
  }
  2 bdr:
  {
    min: 2,
    max: 10,
    sqFt: [500.50, 3522, 328],
    avgSqFt: 242.34,
  }
}
*/
export const unitMapCreator = (units) => {
  const unitMap = new Map();
  const unitTypes = {
    studio: "Studio",
    oneBdrm: "1 bdr",
    twoBdrm: "2 bdr",
    threeBdrm: "3 bdr",
    fourBdrm: "4 bdr",
  };
  // Loop over units
  units.forEach((unit) => {
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
        avgSqFt: unit.sqft,
      });
    }
  });
  // Returns an array of unitMap's key-value pairs, from https://stackoverflow.com/questions/43885365/using-map-on-an-iterator
  return Array.from(unitMap, ([key, value]) => [key, value]);
};

function ListingsBody({ listingsData, firstListingIndex, lastListingIndex }) {
  return (
    <div className="Listings-container border border-sky-500">
      <div>
        <div className="listings-heading">
          <div>Property Info</div>
          <div>Unit Info</div>
        </div>
        {listingsData
          .sort((a, b) => (a.name > b.name ? 1 : -1))
          .map((listing) => (
            <div className="listing-info" key={listing.id}>
              <div className="property-info">
                {listing.name}
                <br />
                <img src={listing.picture} />
              </div>
              <div>
                <table className="unit-table table-auto">
                  <thead>
                    <tr>
                      <th align="left">Unit&nbsp;type</th>
                      <th align="center">Average&nbsp;Sq.&nbsp;Ft</th>
                      <th align="right">Range</th>
                    </tr>
                  </thead>
                  <tbody>
                    {unitMapCreator(listing.units)
                      .sort((a, b) => (a > b ? 1 : -1))
                      .map(([unitType, stats]) => (
                        <tr key={unitType}>
                          <td align="left">{unitType}</td>
                          <td align="center">
                            {stats.avgSqFt.toFixed(0)} sqft
                          </td>
                          <td align="center">
                            {stats.min} - {stats.max}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))
          .slice(firstListingIndex, lastListingIndex)}
      </div>
    </div>
  );
}

export default ListingsBody;

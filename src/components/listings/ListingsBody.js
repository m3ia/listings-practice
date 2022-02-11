import { listings } from "../../mockData";
import '../../App.css';

const listingsData = listings.sort((a, b) => a.name > b.name ? 1: -1);

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
                <th>Property</th>
                <th align="right">Unit&nbsp;Type</th>
                <th align="right">Avg&nbsp;Square&nbsp;Footage</th>
                <th align="right">Range</th>
              </tr>
          </thead>
          <tbody>
          {/* {listingsData.map((listing, key) => {
          return (
            <div key={key}>
              {listing.name}
              <br />
              <img src={listing.picture} />
            </div>
          );
        })} */}
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
              <td align="left">Unit Type Here</td>
              <td align="left">Avg sq fooage Here</td>
              <td align="left">Range here</td>
            </tr>
          ))}
        </tbody>
        </table>
      </body>
    </div>
  );
}

export default ListingsBody;

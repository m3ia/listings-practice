import { listings } from "../../mockData";
import '../../App.css';

function ListingsBody() {
    return (
    <div className="Listings-container">
      <header>
        <p>
          <code>Here is the Listings Body</code>
        </p>
      </header>
      <body className="Listings-body">
        {listings.sort((a, b) => a.name > b.name ? 1: -1).map((listing, key) => {
          return (
            <div key={key}>
              {listing.name}
              <br />
              <img src={listing.picture} />
            </div>
          );
        })}
      </body>
    </div>
  );
}

export default ListingsBody;

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
        {listings.map((listing, key) => {
          return (
            <div key={key}>
              {listing.name +
                ", " +
                listing.picture}
            </div>
          );
        })}
      </body>
    </div>
  );
}

export default ListingsBody;

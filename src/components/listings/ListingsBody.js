import { listings } from "../../mockData";
import '../../App.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(property, unitType, avgSqFt, range) {
  return { property, unitType, avgSqFt, range };
}

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
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
                <TableCell>Property</TableCell>
                <TableCell align="right">Unit&nbsp;Type</TableCell>
                <TableCell align="right">Avg&nbsp;Square&nbsp;Footage</TableCell>
                <TableCell align="right">Range</TableCell>
              </TableRow>
          </TableHead>
          <TableBody>
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
            <TableRow
              key={listing.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">
                {listing.name}
                <br />
                <img src={listing.picture} />
                </TableCell>
              <TableCell align="left">Unit Type Here</TableCell>
              <TableCell align="left">Avg sq fooage Here</TableCell>
              <TableCell align="left">Range here</TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
      </TableContainer>
      </body>
    </div>
  );
}

export default ListingsBody;

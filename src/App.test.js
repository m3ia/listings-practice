import { render, screen } from '@testing-library/react';
import App, { getPaginationInfo, listingsData } from './App';
import { unitMapCreator } from './components/listings/ListingsBody';

// UNIT TESTS
// Does the Mapping function work?
test('unitMapCreator works', () => {
  const unitData = [
    {
      "type": "oneBdrm",
      "minOccupancy": 1,
      "maxOccupancy": 2,
      "sqft": 10,
      "amenities": ["a", "b", "c"]
    },
    {
      "type": "twoBdrm",
      "minOccupancy": 3,
      "maxOccupancy": 4,
      "sqft": 10,
      "amenities": ["d", "e", "f"]
    }
  ];
  const unitMapperTestResult = unitMapCreator(unitData);
  expect(unitMapperTestResult[0][0]).toEqual("1 bdr");
  expect(unitMapperTestResult[1][0]).toEqual("2 bdr");
  expect(unitMapperTestResult[0][1]["max"]).toEqual(2)
  expect(unitMapperTestResult[1][1]["max"]).toEqual(4)
  expect(unitMapperTestResult[0][1]["avgSqFt"]).toEqual(10);
  expect(unitMapperTestResult[1][1]["max"]).toEqual(4);
    // Expected Result:
    // [
    //   ["1 bdr", 
    //     {
    //     min: 1,
    //     max: 2, 
    //     sqFt: [10],
    //     avgSqFt: 10,
    //     }
    //   ],
    //   ["2 bdr":
    //     {
    //       min: 3,
    //       max: 4, 
    //       sqFt: [10],
    //       avgSqFt: 10,
    //       amenities: ["d", "e", "f"]
    //     }
    //   ]
    // ]
})

// Does pagination work?
test('pagination math works', () => {
  const exArr = [ 1, 2, 3, 4, 5];
  const { numberOfListings, numberOfPages, firstListingIndex, lastListingIndex } = getPaginationInfo(exArr, 10, 1);
  expect(numberOfListings).toEqual(5);
  expect(numberOfPages).toEqual(1);
  expect(firstListingIndex).toEqual(0);
  expect(lastListingIndex).toEqual(10);
})

// Screen tests
// Does our Navigation Banner show?
test('should render banner component', () => {
  render(<App />);
  const bannerElement = screen.getByText('Next Page');
  expect(bannerElement).toBeInTheDocument();
})

// Does our Listings component show?
test('should render listings body compoent', () => {
  render(<App />);
  const listingsElement = screen.getByText('Property Info');
  expect(listingsElement).toBeInTheDocument();
})

// TESTS I'D RUN THAT I HAVE NOT COMPLETED YET
// Does content update with multiple filters on?

// Does content update correctly--no matter the order of the set filters?


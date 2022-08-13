# Listings Practice
I used this project to practice dynamically updating a view of mock-up property listings according to 3 ways of searching:
1. Typing a property name in the search bar
2. Selecting/deselecting amenities
3. Filtering by occupancy range

## Spec
The goals are, in decreasing level of priority:
1. Display a list of all listings with their image and property name, sorted alphabetically by property name
2. Calculate for each property and for each unit type within that property's set of units the average square footage of that unit type & the range of possible occupancy of that unit type, displaying this data in a table associated with the property image
3. Create three inputs to filter the data, (1) a text input on the property name, (2) a dropdown input to filter on a unit amenity, and (3) two text inputs to filter on a minimum and maximum occupancy range
4. Paginate the listings, visually showing the number of records per page which a user can change, an indication of the current page number, and a way to navigate between them

![Apr-02-2022 20-18-32](https://user-images.githubusercontent.com/38749469/161409829-a406de7d-7af8-4792-a507-a83a69b5433a.gif)

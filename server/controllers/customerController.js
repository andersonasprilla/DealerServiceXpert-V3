import Customer from "../models/customerSchema.js";
import readOnlyQueryHandler from "../utils/readOnlyQueryHandler.js";

// Define the queryCustomers handler using ReadOnlyQueryHandler
const queryCustomers = readOnlyQueryHandler(Customer, {
  // Specify fields to populate in the resulting documents
  populateFields: [], 
  
  // Define fields that are searchable in the query
  searchFields: ['firstName', 'lastName', 'vehicle', 'phone'],
  
  // Set default sorting options, sorting by last name, then first name in ascending order
  sortOptions: { lastName: 1, firstName: 1 }, 
  
  // Include any additional middleware functions to be run before the query
  preQueryMiddleware: [] 
});

export { queryCustomers };

/**
 * Recursive function to build query based on parameters
 * @param {Object} queryParams - The parameters to query by
 * @returns {Object} - The query object
 */
const  buildQuery = (queryParams) => {
    const query = {};
  
    Object.keys(queryParams).forEach(key => {
      if (typeof queryParams[key] === 'object' && !Array.isArray(queryParams[key])) {
        // Recursive call for nested objects
        query[key] = buildQuery(queryParams[key]);
      } else if (Array.isArray(queryParams[key])) {
        // Handle arrays (e.g., vehicleIds or repairOrderIds)
        query[key] = { $in: queryParams[key] };
      } else {
        // Simple key-value pair
        query[key] = queryParams[key];
      }
    });
  
    return query;
  }
  
  export default buildQuery;
  
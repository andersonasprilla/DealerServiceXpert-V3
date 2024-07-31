// Function to build a query object based on the provided query parameters and allowed fields
const buildQuery = (queryParams, allowedFields = []) => {
  const query = {}; // Initialize an empty query object

  // Iterate over each key in the query parameters
  Object.keys(queryParams).forEach(key => {
    // Only process keys that are included in the allowed fields
    if (allowedFields.includes(key)) {
      // If the value is an object and not an array, handle it as a nested query
      if (typeof queryParams[key] === 'object' && !Array.isArray(queryParams[key])) {
        // Recursively build the nested query
        const nestedQuery = buildQuery(queryParams[key], allowedFields);
        // Flatten the nested query keys into the main query object
        Object.keys(nestedQuery).forEach(nestedKey => {
          query[`${key}.${nestedKey}`] = nestedQuery[nestedKey];
        });
      } else if (Array.isArray(queryParams[key])) {
        // If the value is an array, use the $in operator
        query[key] = { $in: queryParams[key] };
      } else {
        // For other types of values, assign them directly to the query object
        query[key] = queryParams[key];
      }
    }
  });

  // If no allowed fields are present in the query, set an impossible condition
  if (Object.keys(query).length === 0) {
    query._id = null;
  }

  return query; // Return the constructed query object
};

export default buildQuery;
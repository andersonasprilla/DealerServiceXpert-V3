/**
 * Extract pagination parameters from the request query
 * @param {Object} reqQuery - The request query object
 * @returns {Object} - An object containing page, limit, and skip values
 */
export const getPaginationParams = (reqQuery) => {
    const page = parseInt(reqQuery.page, 10) || 1;
    const limit = Math.min(parseInt(reqQuery.limit, 10) || 10, 50);
    const skip = (page - 1) * limit;
  
    return { page, limit, skip };
  };
  
  /**
   * Generate pagination metadata
   * @param {number} page - Current page number
   * @param {number} limit - Number of items per page
   * @param {number} total - Total number of items
   * @returns {Object} - An object containing pagination metadata
   */
  export const getPaginationMetadata = (page, limit, total) => {
    return {
      page,
      pages: Math.ceil(total / limit),
      total
    };
  };
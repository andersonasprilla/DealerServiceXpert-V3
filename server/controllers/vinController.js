import { vinDecodeQueryHandler } from "../utils/sqlQueryHandler.js";

// @desc    Query VIN decode information
// @route   GET /api/vindecode
// @access  Private
const queryVinDecode = async (req, res) => {
  try {
    // Destructure the VIN from the query parameters in the request.
    const { vin } = req.query;
    
    // Validate the VIN length. If the VIN is missing or its length is not 17 characters, return a 400 Bad Request response.
    if (!vin || vin.length !== 17) {
      return res.status(400).json({
        success: false,
        message: 'Invalid VIN. VIN must be a 17-digit '
      });
    }

    // Call vinDecodeQueryHandler with the query parameters from the request.
    const result = await vinDecodeQueryHandler(req.query);
    if (result) {
      // If the result is not null, return a 200 OK response with the decoded VIN data.
      res.json({
        success: true,
        data: result
      });
    } else {
      // If no data is found for the given VIN, return a 404 Not Found response.
      res.status(404).json({ 
        success: false,
        message: 'No data found for the given VIN'
      });
    }
  } catch (err) {
    // If an error occurs, return a 500 Internal Server Error response with the error message.
    res.status(500).json({ 
      success: false,
      message: err.message 
    });
  }
};

// Export the queryVinDecode function for use in other modules.
export { queryVinDecode };

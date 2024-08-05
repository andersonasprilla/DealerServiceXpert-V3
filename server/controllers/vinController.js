import { vinDecodeQueryHandler } from "../utils/sqlQueryHandler.js";

const queryVinDecode = async (req, res) => {
  try {
    const { vin } = req.query;
    
    // Validate the VIN length
    if (!vin || vin.length !== 17) {
      return res.status(400).json({
        success: false,
        message: 'Invalid VIN. VIN must be a 17-digit '
      });
    }

    const result = await vinDecodeQueryHandler(req.query);
    if (result) {
      res.json({
        success: true,
        data: result
      });
    } else {
      res.status(404).json({ 
        success: false,
        message: 'No data found for the given VIN'
      });
    }
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: err.message 
    });
  }
};

export { queryVinDecode };

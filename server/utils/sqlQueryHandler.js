import { sql } from '../config/sqlConfig.js';

const vinDecodeQueryHandler = async (query) => {
  const { vin, year } = query;

  try {
    let result;
    if (year) {
      result = await sql.query`EXEC [dbo].[spVinDecode] @v = ${vin}, @year = ${year}`;
    } else {
      result = await sql.query`EXEC [dbo].[spVinDecode] @v = ${vin}`;
    }

    if (result.recordset.length === 0) {
      return null;
    }

    // Process the results to extract only the required fields
    const fieldsToExtract = ['Model', 'Model Year'];
    const decodedInfo = result.recordset.reduce((acc, record) => {
      if (fieldsToExtract.includes(record.Variable)) {
        acc[record.Variable] = record.Value;
      }
      return acc;
    }, {});

    return decodedInfo;
  } catch (err) {
    console.error('Error executing VIN decode query:', err);
    throw new Error('Failed to decode VIN');
  }
};

export { vinDecodeQueryHandler };

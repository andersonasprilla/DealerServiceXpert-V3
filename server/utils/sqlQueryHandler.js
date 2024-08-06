import { sql } from '../config/sqlConfig.js';

const vinDecodeQueryHandler = async (query) => {
  // Destructure the VIN and year from the query object.
  const { vin, year } = query;

  try {
    let result;
    // If the year is provided in the query, execute the stored procedure with both VIN and year parameters.
    if (year) {
      result = await sql.query`EXEC [dbo].[spVinDecode] @v = ${vin}, @year = ${year}`;
    } else {
      // If the year is not provided, execute the stored procedure with only the VIN parameter.
      result = await sql.query`EXEC [dbo].[spVinDecode] @v = ${vin}`;
    }

    // Check if the result set is empty. If it is, return null.
    if (result.recordset.length === 0) {
      return null;
    }

    // Specify the fields to extract from the result.
    const fieldsToExtract = ['Make', 'Model', 'Model Year'];
    // Reduce the result set to only include the specified fields.
    const decodedInfo = result.recordset.reduce((acc, record) => {
      if (fieldsToExtract.includes(record.Variable)) {
        acc[record.Variable] = record.Value;
      }
      return acc;
    }, {});

    // Return the decoded information.
    return decodedInfo;
  } catch (err) {
    // Log any errors that occur during the execution of the query.
    console.error('Error executing VIN decode query:', err);
    // Throw an error if the VIN decoding fails.
    throw new Error('Failed to decode VIN');
  }
};

// Export the vinDecodeQueryHandler function for use in other modules.
export { vinDecodeQueryHandler };

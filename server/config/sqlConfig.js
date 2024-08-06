import sql from 'mssql'; // Import the mssql module for SQL Server connection.
import dotenv from 'dotenv'; // Import dotenv to load environment variables from a .env file.

dotenv.config(); // Load environment variables from .env file.

const sqlConfig = {
  user: process.env.SQL_USER, // SQL Server username from environment variable.
  password: process.env.SQL_PASSWORD, // SQL Server password from environment variable.
  database: process.env.SQL_DATABASE, // Database name from environment variable.
  server: process.env.SQL_SERVER || 'localhost', // Server address from environment variable or default to 'localhost'.
  port: parseInt(process.env.SQL_PORT, 10) || 1433, // Server port from environment variable or default to 1433.
  pool: {
    max: 10, // Maximum number of connections in the pool.
    min: 0, // Minimum number of connections in the pool.
    idleTimeoutMillis: 30000 // Time in milliseconds a connection must sit idle in the pool before being closed.
  },
  options: {
    encrypt: true, // Use encryption for the connection.
    trustServerCertificate: true // Trust the server certificate (useful for self-signed certificates).
  }
};

const connectSQL = async () => {
  try {
    await sql.connect(sqlConfig); // Attempt to connect to the SQL Server with the provided configuration.
    console.log('SQL Server connected on port %d', sqlConfig.port); // Log successful connection.
  } catch (err) {
    console.error('SQL Server connection error:', err); // Log any connection errors.
    process.exit(1); // Exit the process with an error code if the connection fails.
  }
};
 
export { connectSQL, sql }; // Export the connectSQL function and the sql module.

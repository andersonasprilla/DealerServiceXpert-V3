import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

const sqlConfig = {
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE,
  server: process.env.SQL_SERVER || 'localhost',
  port: parseInt(process.env.SQL_PORT, 10) || 1433,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
};

// console.log('SQL Config (without password):', { ...sqlConfig, password: '******' });

const connectSQL = async () => {
  try {
    await sql.connect(sqlConfig);
    console.log('SQL Server connected on port %d', sqlConfig.port);
  } catch (err) {
    console.error('SQL Server connection error:', err);
    process.exit(1);
  }
};
 
export { connectSQL, sql };
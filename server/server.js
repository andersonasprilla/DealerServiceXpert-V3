import express from 'express';

import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
const port = process.env.PORT || 5002;
import customerRoutes from './routes/customerRoutes.js';

connectDB(); // Connect to the database

const app = express();

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/customers', customerRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
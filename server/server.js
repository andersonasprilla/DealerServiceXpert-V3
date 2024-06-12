import express from 'express';
import customers from './data/customers.js';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
const port = process.env.PORT || 5002;

connectDB(); // Connect to the database

const app = express();

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.get('/api/customers', (req, res) => {
    res.json(customers);
    });

app.get('/api/customers/:id', (req, res) => {
    const customer = customers.find((c) => c._id === req.params.id);
    res.json(customer);
    }
);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
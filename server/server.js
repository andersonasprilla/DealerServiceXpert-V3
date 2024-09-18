import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
dotenv.config();
import  connectMongoDb  from './config/mongoDbConfig.js';
import { connectSQL } from './config/sqlConfig.js';
import { notFound, errorConverter, errorHandler } from './middleware/errorMiddleware.js';
const port = process.env.PORT || 5002;
import customerRoutes from './routes/customerRoutes.js';
import userRoutes from './routes/userRoutes.js';
import repairOrderRoutes from './routes/repairOrderRoutes.js';
import vinRoutes from './routes/vinRoutes.js';

// Connect to the databases
connectMongoDb();
// connectSQL();

const app = express();

// CORS middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware
app.use(cookieParser());

// Root route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// API versioning
app.use('/api/v1/customers', customerRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/repair-orders', repairOrderRoutes);
app.use('/api/v1/vin', vinRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorConverter);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`MongoDb server running on port ${port}`);
});
import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
  vin: {
    required: true,
    type: String,
    match: [/^[A-HJ-NPR-Z0-9]{17}$/, 'Must be a valid 17-character VIN'],
  },
  make: {
    required: true,
    type: String,
  },
  model: {
    required: true,
    type: String
  },
  year: {
    required: true,
    type: String,
  },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
} , { versionKey: false });

const Vehicle = mongoose.model('Vehicle', vehicleSchema, 'vehicles');

export default Vehicle;
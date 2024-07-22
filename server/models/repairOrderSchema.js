import mongoose from 'mongoose';

const repairOrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  hatNumber: {
    required: true,
    type: String,
    match: [/^\d{4}$/, 'Must be a 4-digit number']
  },
  repairOrderNumber: {
    required: true,
    type: String,
    match: [/^\d{6}$/, 'Must be a 6-digit number']
  },
  repairDescription: {
    required: true,
    type: String,
  },
  specialOrderParts: [
    {
      partNumber: {
        required: true,
        type: String,
      },
      partDescription: {
        required: true,
        type: String,
      },
    },
  ],
} , { timestamps: true, versionKey: false });

const RepairOrder = mongoose.model('RepairOrder', repairOrderSchema, 'repairOrders');

export default RepairOrder;


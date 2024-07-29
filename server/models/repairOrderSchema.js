import mongoose from 'mongoose';

const repairOrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  
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
  status: {
    type: String,
    enum: ['checked-in', 'in-repair', 'completed', 'special-order'],
    default: 'checked-in'
  },
  specialOrder: {
    type: String, 
    default: ''
  },

} , { timestamps: true, versionKey: false });

const RepairOrder = mongoose.model('RepairOrder', repairOrderSchema, 'repair-orders');

export default RepairOrder;
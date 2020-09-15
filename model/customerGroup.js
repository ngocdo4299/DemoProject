import mongoose from 'mongoose';
// import { logger } from '../helper/logger.js';
const Schema = mongoose.Schema;

const customerGroupSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name field is required'],
  },
  description: {
    type: String,
    required: [true, 'Description field is required'],
  },
  priority: {
    type: Number,
    required: [true, 'Priority field is required'],
  },
  status: {
    type: String,
    default: 'active',
  },
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

export const CustomerGroup = mongoose.model('customerGroups', customerGroupSchema);

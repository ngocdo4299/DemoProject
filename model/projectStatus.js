import mongoose from 'mongoose';
// import { logger } from '../helper/logger.js';
const Schema = mongoose.Schema;

const projectStatusSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name field is required'],
  },
  description: {
    type: String,
    required: [true, 'Description field is required'],
  },
  status: {
    type: String,
    default: 'active',
  },
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

export const ProjectStatus = mongoose.model('projectStatus', projectStatusSchema);

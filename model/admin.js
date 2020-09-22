/* eslint-disable no-console */
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
// import { logger } from '../helper/logger.js';
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
  userName: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password field is required'],
  },
  status: {
    type: String,
    default: 'active',
  },
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

AdminSchema.pre('save', async function save(next) {
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    return next();
  } catch (err) {

    return next(err);
  }
});

AdminSchema.statics.verifyPassword = async function (userPassword, unverifiedPassword) {
  if ( bcrypt.compareSync(unverifiedPassword, userPassword)) {
    return true;
  } else {
    return false;
  }
};
export const Admin = mongoose.model('admin', AdminSchema);

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

AdminSchema.statics.verifyPassword = async function (verifyUser) {
  const user = await this.findOne({ userName: verifyUser.userName, status: 'active' });
  if (!user){
    return { error: true, message: 'Username not found' };
  }
  else {
    if (user && bcrypt.compareSync(verifyUser.password, user.password)) {
      return { error: false, message: { fullname: user.fullName, username: user.userName } };
    } else {
      return { error: true, message: 'Incorrect password' };
    }
  }
};
export const Admin = mongoose.model('admin', AdminSchema);

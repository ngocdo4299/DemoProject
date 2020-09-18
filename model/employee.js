import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const employee = new Schema({
  fullName: {
    type: String,
    required: [true, 'Employee name field is required'],
    unique: true,
  },
  DoB: {
    type: Date,
    required: true,
    trim: true,
  },
  idNumber: {
    type: String,
    required: [true, 'ID number field is required'],
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number field is required'],
  },
  address: {
    type: String,
    required: [true, 'Address field is required'],
  },
  language: [
    {
      languageName: String,
    },
  ],
  certification: [
    {
      certificationName: String,
    },
  ],
  techStackList: [
    {
      techStack:
      {
        type: ObjectId,
        ref: 'techStacks',
      },
      exp: String,
      description: String,
    },
  ],
  projectList: [
    {
      project:
      {
        type: ObjectId,
        ref: 'projects',
      },
    },
  ],
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

export const Employee = mongoose.model('employees', employee);

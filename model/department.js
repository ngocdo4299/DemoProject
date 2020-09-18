import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const department = new Schema({
  name: {
    type: String,
    required: [true, 'Name field is required'],
    unique: true,
  },
  functionality: {
    type: String,
    required: [true, 'Description field is required'],
  },
  techStackList: [
    {
      techStack:
      {
        type: ObjectId,
        ref: 'techStacks',
      },
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
  employeeList: [
    {
      employee:
      {
        type: ObjectId,
        ref: 'employees',
      },
    },
  ],
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

export const Department = mongoose.model('departments', department);

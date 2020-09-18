import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const project = new Schema({
  name: {
    type: String,
    required: [true, 'Project name field is required'],
    unique: true,
  },
  startDate: {
    type: Date,
    required: [true, 'Start Date field is required'],
  },
  endDate: {
    type: Date,
    required: [true, 'Start Date field is required'],
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number field is required'],
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
  projectTypes: [
    {
      projectType:
      {
        type: ObjectId,
        ref: 'projecttypes',
      },
    },
  ],
  projectStatus: {
    type: ObjectId,
    ref: 'projectstatuses',
  },
  departments: {
    type: ObjectId,
    ref: 'departments',
  },
  employees: [
    {
      employee:
      {
        type: ObjectId,
        ref: 'employees',
      },
    },
  ],
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

export const Project = mongoose.model('projects', project);

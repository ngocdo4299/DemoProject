import { logger } from '../../../helper/logger.js';
import { errorResponse } from '../../../helper/response.js';
import { Department } from '../../../model/department.js';
import { TechStack } from '../../../model/techStack.js';

export const createNewDepartment = async (data) => {
  try {
    const department = await Department.findOne({ name: data.name }).lean();
    if (department) {
      return {
        status: 404,
        code: 'DEPARTMENT_EXISTED',
        error: true,
      };
    }
    for( let e of data.techStackList){
      // eslint-disable-next-line no-await-in-loop
      const findStack = await TechStack.findOne({ _id: e.techStack, status: 'active' }).lean();
      if( !findStack) {
        return {
          status: 404,
          code: 'TECH_STACK_NOT_FOUND',
          error: true,
          message: `TechStack with id data: ${e.techStack} is not existed`,
          data: e.techStack,
        };
      }
    }
    const newDepartment = await Department.create(data);

    return {
      status: 200,
      code: 'DEPARTMENT_CREATE_SUCCESS',
      error: false,
      data: newDepartment._id,
    };

  } catch ( err ) {
    logger(`createNewDepartment error: ${err}`);

    return errorResponse;
  }
};
// $push, index trong mongo
export const getDepartmentDetail = async ( id ) => {
  try {
    const department = await Department.findOne({ _id: id }, '_id name functionality')
      .populate({
        path: 'techStackList',
        populate: {
          path: 'techStack',
          select: ['_id', 'name', 'status'],
        },
      })
      .populate({
        path: 'projectList',
        populate: {
          path: 'project',
          select: ['_id', 'name'],
        },
      })
      .populate({
        path: 'employeeList',
        populate: {
          path: 'employee',
          select: ['_id', 'fullName'],
        },
      })
      .lean();
    if(!department){
      return {
        status: 404,
        code: 'DEPARTMENT_NOT_FOUND',
        error: true,
      };
    }

    return {
      status: 200,
      code: 'GET_DEPARTMENT_DETAIL_SUCCESS',
      error: false,
      data: department,
    };
  } catch (err) {
    logger(`getDepartmentDetail error: ${err}`);

    return errorResponse;
  }
};
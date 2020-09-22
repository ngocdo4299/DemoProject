/* eslint-disable no-console */
import { logger } from '../../../helper/logger.js';
import { errorResponse } from '../../../helper/response.js';
import { Employee } from '../../../model/employee.js';
import { Project } from '../../../model/project.js';
import { TechStack } from '../../../model/techStack.js';

export const createNewEmployee = async (data) => {
  try {
    const employee = await Employee.findOne({ idNumber: data.idNumber });
    if( employee && employee.status !== 'deleted') {
      return {
        status: 404,
        code: 'EMPLOYEE_EXISTED',
        error: true,
      };
    }
    for (let e of data.techStackList) {
      // eslint-disable-next-line no-await-in-loop
      const findStack = await TechStack.findOne({ _id: e.techStack, status: 'active' });
      if(!findStack) {
        return {
          status: 404,
          code: 'TECH_STACK_NOT_FOUND',
          error: true,
          message: `TechStack with id data: ${e.techStack} is not existed`,
          data: e.techStack,
        };
      }
    }
    const newEmployee = await Employee.create(data);

    return {
      status: 200,
      code: 'CREATE_NEW_EMPLOYEE_SUCCESS',
      error: false,
      data: newEmployee._id,
    };

  }catch(err){
    logger(`createNewEmployee ${err}`);

    return errorResponse;
  }
};

export const getEmployeeDetail = async (id) => {
  try {
    let employee = await Employee.findOne({ _id : id, status: 'active' }, 'fullName DoB idNumber phoneNumber address techStackList projectList')
      .populate({
        path: 'techStackList',
        populate: {
          path: 'techStack',
          select: ['name', 'status'],
        },
      });

    if ( !employee ){
      return {
        status: 404,
        code: 'EMPLOYEE_NOT_FOUND',
        error: true,
      };
    }
    if( employee.projectList.length === 0){
      employee.projectList[0] = 'Haven\'t joined any project';

      return {
        status: 200,
        code: 'EMPLOYEE_FOUND',
        error: true,
        data: employee,
      };
    }

    await employee.populate({
      path: 'projectList',
      populate: {
        path: 'project',
        select: ['_id', 'name'],
      },
    });
    employee.projectList[0] = await Project.findOne( { _id: employee.projectList[0].project._id }, 'name projectStatus');

    return {
      status: 200,
      code: 'EMPLOYEE_FOUND',
      error: true,
      data: employee,
    };
  }catch(err){
    logger(`getEmployeeDetail ${err}`);

    return errorResponse;
  }
};

export const updateEmployeeDetail = async ( id, data ) => {
  try {
    const employee = await Employee.findOne({ _id: id, status: 'active' });
    if (!employee){
      return {
        status: 404,
        code: 'EMPLOYEE_NOT_FOUND',
        error: true,
      };
    }
    if( data.techStackList ){
      for( let e of data.techStackList){
        // eslint-disable-next-line no-await-in-loop
        const findStack = await TechStack.findOne({ _id: e.techStack });
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
    }
    await employee.updateOne(data);

    return {
      status: 200,
      code: 'UPDATE_EMPLOYEE_SUCCESS',
      error: false,
    };
  } catch ( err ){
    logger(`updateEmployeeDetail ${err}`);

    return errorResponse;
  }
};

export const deleteOneEmployee = async ( id ) => {
  try {
    const employee = await Employee.findOne({ _id: id, status: 'active' });
    if(!employee){
      return {
        status: 404,
        code: 'EMPLOYEE_NOT_FOUND',
        error: true,
      };
    }
    await employee.updateOne({ status: 'deleted' });

    return {
      status: 200,
      code: 'DELETE_EMPLOYEE_SUCCESS',
      error: false,
    };
  } catch ( err ) {
    logger(`deleteOneEmployee ${err}`);

    return errorResponse;
  }
};
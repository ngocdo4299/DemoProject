/* eslint-disable no-console */
import { logger } from '../../../helper/logger.js';
import { errorResponse } from '../../../helper/response.js';
import { Employee } from '../../../model/employee.js';
import { Project } from '../../../model/project.js';
import { TechStack } from '../../../model/techStack.js';

export const createNewEmployee = async (data) => {
  try {
    const employee = await Employee.findOne({ idNumber: data.idNumber });
    if(employee){
      return {
        status: 404,
        code: 'ID_NUMBER_DUPLICATED',
        error: true,
      };
    }else{
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
      const newEmployee = await Employee.create(data);

      return {
        status: 200,
        code: 'CREATE_NEW_EMPLOYEE_SUCCESS',
        error: false,
        data: newEmployee._id,
      };
    }
  }catch(err){
    logger(`createNewEmployee ${err}`);

    return errorResponse;
  }
};

export const getEmployeeDetail = async (id) => {
  try {
    let employee = await Employee.findOne({ _id : id }, 'fullName DoB idNumber phoneNumber address techStackList projectList')
      .populate({
        path: 'techStackList',
        populate: {
          path: 'techStack',
          select: ['name', 'status'],
        },
      });

    if( !employee ){
      return {
        status: 404,
        code: 'EMPLOYEE_NOT_FOUND',
        error: true,
      };
    }else{
      console.log(employee.projectList.length);
      if( employee.projectList.length === 0){
        employee.projectList[0] = 'Haven\'t joined any project';

        return {
          status: 200,
          code: 'EMPLOYEE_FOUND',
          error: true,
          data: employee,
        };
      }else{
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
      }
    }
  }catch(err){
    logger(`getEmployeeDetail ${err}`);

    return errorResponse;
  }
};
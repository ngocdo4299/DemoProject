/* eslint-disable no-console */
import { logger } from '../../../helper/logger.js';
import { errorResponse } from '../../../helper/response.js';
import { Employee } from '../../../model/employee.js';
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
            status: 200,
            code: 'TECH_STACK_NOT_FOUND',
            error: true,
            message: `TechStack with id data: ${e.techStack} is not existed`,
            data: e.techStack,
          };
        }
      }

      return {
        status: 200,
        code: 'CREATE_NEW_EMPLOYEE_SUCCESS',
        error: false,
        data: data,
      };
    }
  }catch(err){
    logger(`createNewEmployee ${err}`);

    return errorResponse;
  }
};
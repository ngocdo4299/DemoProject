import { ProjectType } from '../../../model/projectTypes.js';
import { logger } from '../../../helper/logger.js';
import { errorResponse } from '../../../helper/response.js';

export const createNewProjectType = async (data) => {
  try {
    const projectType = await ProjectType.findOne({ name: data.name });
    if (!projectType) {
      const newProjectType = await ProjectType.create(data);

      return {
        status: 200,
        code: 'CREATE_NEW_PROJECT_TYPE_SUCCESS',
        error: false,
        data: newProjectType._id,
      };
    }
    else {

      return {
        status: 404,
        code: 'PROJECT_TYPE_EXISTED',
        error: true,
      };
    }
  } catch (err) {
    logger(`createNewProjectType ${err}`);

    return errorResponse;
  }
};

export const getProjectTypeDetail = async (id) => {
  try {
    const projectType = await ProjectType.findOne({ _id: id }, ['_id', 'name', 'description', 'priority', 'status']);
    if(projectType){
      return {
        status: 200,
        code: 'GET_PROJECT_TYPE_DETAIL_SUCESS',
        error: false,
        data: projectType,
      };
    }else{
      return {
        status: 404,
        code: 'PROJECT_TYPE_NOT_EXIST',
        error: true,
      };
    }
  }catch (err) {
    logger(`getProjectTypeDetail ${err}`);

    return errorResponse;
  }
};

export const updateProjectType = async ( id, data ) => {
  try {
    const projectType = await ProjectType.findOne({ _id: id });
    if(projectType){
      await projectType.updateOne(data);

      return {
        status: 200,
        code: 'UPDATE_PROJECT_TYPE_SUCCESS',
        error: false,
        data: data,
      };
    }else {
      return {
        status: 404,
        code: 'PRODUCT_TYPE_NOT_FOUND',
        error: true,
      };
    }
  }catch( err ) {
    logger(`updateProjectType ${err}`);

    return errorResponse;
  }
};

export const deleteProjectType = async (id) => {
  try {
    const projectType = await ProjectType.findOne({ _id: id });
    if(projectType){
      await projectType.deleteOne();

      return {
        status: 200,
        code: 'DELETE_PROJECT_TYPE_SUCCESS',
        error: false,
      };
    }else{

      return {
        status: 404,
        code: 'PRODUCT_TYPE_NOT_FOUND',
        error: true,
      };
    }
  }catch( err ){
    logger(`deleteProjectType ${err}`);

    return errorResponse;
  }
};
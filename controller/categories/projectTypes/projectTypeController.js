import { ProjectType } from '../../../model/projectTypes.js';
import { logger } from '../../../helper/logger.js';
import { errorResponse } from '../../../helper/response.js';

export const createNewProjectType = async (data) => {
  try {
    const projectType = await ProjectType.findOne({ name: data.name });
    if (projectType) {
      return {
        status: 404,
        code: 'PROJECT_TYPE_EXISTED',
        error: true,
      };
    }
    const newProjectType = await ProjectType.create(data);

    return {
      status: 200,
      code: 'CREATE_NEW_PROJECT_TYPE_SUCCESS',
      error: false,
      data: newProjectType._id,
    };
  } catch (err) {
    logger(`createNewProjectType ${err}`);

    return errorResponse;
  }
};

export const getProjectTypeDetail = async (id) => {
  try {
    const projectType = await ProjectType.findOne({ _id: id }, ['_id', 'name', 'description', 'priority', 'status']);
    if (!projectType){
      return {
        status: 404,
        code: 'PROJECT_TYPE_NOT_EXIST',
        error: true,
      };

    }

    return {
      status: 200,
      code: 'GET_PROJECT_TYPE_DETAIL_SUCESS',
      error: false,
      data: projectType,
    };
  }catch (err) {
    logger(`getProjectTypeDetail ${err}`);

    return errorResponse;
  }
};

export const updateProjectType = async ( id, data ) => {
  try {
    const projectType = await ProjectType.findOne({ _id: id });
    if (!projectType){
      return {
        status: 404,
        code: 'PRODUCT_TYPE_NOT_FOUND',
        error: true,
      };
    }
    await projectType.updateOne(data);

    return {
      status: 200,
      code: 'UPDATE_PROJECT_TYPE_SUCCESS',
      error: false,
      data: data,
    };
  }catch( err ) {
    logger(`updateProjectType ${err}`);

    return errorResponse;
  }
};

export const deleteProjectType = async (id) => {
  try {
    const projectType = await ProjectType.findOne({ _id: id });
    if (!projectType){
      return {
        status: 404,
        code: 'PRODUCT_TYPE_NOT_FOUND',
        error: true,
      };

    }

    await projectType.updateOne({ status: 'deleted' });

    return {
      status: 200,
      code: 'DELETE_PROJECT_TYPE_SUCCESS',
      error: false,
    };
  }catch( err ){
    logger(`deleteProjectType ${err}`);

    return errorResponse;
  }
};

export const getListProjectTypes = async (params) => {
  try {
    const skipRecord = (params.page - 1) * params.limit;
    let regex;

    if( !params.search ) {
      regex = '()+';
    }else{
      regex = `(${params.search})+`;
    }

    const totalRecords = await ProjectType.countDocuments({ 'name': new RegExp(regex, 'gmi') });
    const projectTypes = await ProjectType.find({ 'name': new RegExp(regex, 'gmi') }, '_id name priority description status')
      .sort( [[`${params.sortBy}`, params.sortOrder]])
      .skip(skipRecord)
      .limit(params.limit);

    if (!projectTypes) {

      return {
        status: 200,
        code: 'GET_LIST_PRODUCT_TYPES_FAILED',
        error: true,
      };
    }
    else {
      const totalPage = Math.ceil(totalRecords/params.limit);

      return {
        status: 200,
        code: 'GET_LIST_PRODUCT_TYPES_SUCCESS',
        error: false,
        message: `Page: ${params.page}/${totalPage}`,
        data: projectTypes,
      };
    }
  }catch (err){
    logger(`getListProjectTypes ${err}`);

    return errorResponse;
  }
};
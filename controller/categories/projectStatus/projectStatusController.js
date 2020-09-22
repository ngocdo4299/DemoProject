import { logger } from '../../../helper/logger.js';
import { errorResponse } from '../../../helper/response.js';
import { ProjectStatus } from '../../../model/projectStatus.js';

export const createNewProjectStatus = async (data) => {
  try {
    const projectStatus = await ProjectStatus.findOne({ name: data.name });

    if (projectStatus) {
      return {
        status: 404,
        code: 'PROJECT_STATUS_EXISTED',
        error: true,
      };

    }
    const newProjectStatus = await ProjectStatus.create(data);

    return {
      status: 200,
      code: 'CREATE_NEW_PROJECT_STATUS_SUCCESS',
      error: false,
      data: newProjectStatus._id,
    };

  }catch (err) {
    logger(`createNewProjectStatus ${err}`);

    return errorResponse;
  }
};

export const getProjectStatusDetail = async (id) => {
  try {
    const projectStatus = await ProjectStatus.findOne({ _id: id }, ['_id', 'name', 'description', 'status']);
    if (!projectStatus){
      return {
        status: 404,
        code: 'PROJECT_STATUS_NOT_EXIST',
        error: true,
      };

    }

    return {
      status: 200,
      code: 'GET_PROJECT_STATUS_DETAIL_SUCESS',
      error: false,
      data: projectStatus,
    };
  }catch (err) {
    logger(`getProjectStatusDetail ${err}`);

    return errorResponse;
  }
};

export const getProjectStatuses = async (params) => {
  try {
    const skipRecord = (params.page - 1) * params.limit;
    let regex;

    if( !params.search ) {
      regex = '()+';
    }else{
      regex = `(${params.search})+`;
    }

    const totalRecords = await ProjectStatus.countDocuments({ 'name': new RegExp(regex, 'gmi') });
    const projectStatus = await ProjectStatus.find({ 'name': new RegExp(regex, 'gmi') }, '_id name description status')
      .sort( [[`${params.sortBy}`, params.sortOrder]])
      .skip(skipRecord)
      .limit(params.limit);

    if (!projectStatus) {

      return {
        status: 200,
        code: 'GET_LIST_PRODUCT_STATUS_FAILED',
        error: true,
      };
    }
    else {
      const totalPage = Math.ceil(totalRecords/params.limit);

      return {
        status: 200,
        code: 'GET_LIST_PRODUCT_STATUS_SUCCESS',
        error: false,
        message: `Page: ${params.page}/${totalPage}`,
        data: projectStatus,
      };
    }
  }catch (err){
    logger(`getProjectStatuses ${err}`);

    return errorResponse;
  }
};

export const updateProjectStatus = async (id, data) => {
  try {
    const projectStatus = await ProjectStatus.findOne({ _id: id });
    if (!projectStatus){
      return {
        status: 404,
        code: 'PROJECT_STATUS_NOT_FOUND',
        error: true,
      };
    }
    await projectStatus.updateOne(data);

    return {
      status: 200,
      code: 'UPDATE_PROJECT_STATUS_SUCCESS',
      error: false,
      data: data,
    };
  }catch(err) {
    logger(`updateProjectStatus ${err}`);

    return errorResponse;
  }
};

export const deleteProjectStatus = async (id) => {
  try {
    const projectStatus = await ProjectStatus.findOne({ _id: id });
    if (!projectStatus){
      return {
        status: 404,
        code: 'PROJECT_STATUS_NOT_FOUND',
        error: true,
      };
    }else{
      await projectStatus.updateOne({ status: 'deleted' });

      return {
        status: 200,
        code: 'DELETE_PROJECT_STATUS_SUCCESS',
        error: false,
      };
    }
  }catch(err) {
    logger(`deleteProjectStatus ${err}`);

    return errorResponse;
  }
};
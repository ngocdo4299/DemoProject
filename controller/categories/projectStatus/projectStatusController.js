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

export const getProjectStatuses = async (search = '', page = 1, limit = 10, sortBy = 'name', sortOrder = 1) => {
  try {
    if ( search !== '' && (typeof search !== 'string') ){
      search = search.toString().trim();
    }

    if ( Number.isInteger(parseInt(page)) && parseInt(page) > 0 ){
      page = parseInt(page);
    } else {
      page = 1;
    }

    if ( Number.isInteger(parseInt(limit)) && parseInt(limit) > 0 ){
      limit = parseInt(limit);
    } else {
      limit = 10;
    }

    if ( ['asce', 'ASCE', 'Asce', '1'].includes(sortOrder)) {
      sortOrder = 1;
    }

    if (['desc', 'DESC', 'Desc', '-1'].includes(sortOrder)) {
      sortOrder = -1;
    }

    sortBy = sortBy.toString().trim();
    if ( ! ['name', 'status'].includes(sortBy) ){
      sortBy = 'name';
    }

    const skipRecord = (page - 1) * limit;
    let regex = `(${search})+`;

    const totalRecords = await ProjectStatus.countDocuments({ 'name': new RegExp(regex, 'gmi') }).lean();
    const projectStatus = await ProjectStatus.find({ 'name': new RegExp(regex, 'gmi') }, '_id name description status')
      .sort( [[`${sortBy}`, sortOrder]])
      .skip(skipRecord)
      .limit(limit);

    const totalPage = Math.ceil(totalRecords/limit);

    return {
      status: 200,
      code: 'GET_LIST_PRODUCT_STATUS_SUCCESS',
      error: false,
      message: `Page: ${page}/${totalPage}`,
      data: projectStatus,
    };
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
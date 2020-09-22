import { logger } from '../../../helper/logger.js';
import { errorResponse } from '../../../helper/response.js';
import { TechStack } from '../../../model/techStack.js';

export const createNewTechStack = async (data) => {
  try {
    const techStack = await TechStack.findOne({ name: data.name });

    if (techStack) {
      return {
        status: 404,
        code: 'TECH_STACK_EXISTED',
        error: true,
      };
    }
    const newTechStack = await TechStack.create(data);

    return {
      status: 200,
      code: 'CREATE_NEW_TECH_STACK_SUCCESS',
      error: false,
      data: newTechStack._id,
    };
  }catch (err) {
    logger(`createNewTechStack ${err}`);

    return errorResponse;
  }
};

export const getTechStackDetail = async (id) => {
  try {
    const techStack = await TechStack.findOne({ _id: id }, ['_id', 'name', 'description', 'status']);
    if (!techStack){
      return {
        status: 404,
        code: 'TECH_STACK_NOT_EXIST',
        error: true,
      };
    }

    return {
      status: 200,
      code: 'GET_TECH_STACK_DETAIL_SUCESS',
      error: false,
      data: techStack,
    };
  }catch (err) {
    logger(`getTechStackDetail ${err}`);

    return errorResponse;
  }
};

export const getTechStacks = async (params) => {
  try {
    const skipRecord = (params.page - 1) * params.limit;
    let regex;

    if( !params.search ) {
      regex = '()+';
    }else{
      regex = `(${params.search})+`;
    }

    const totalRecords = await TechStack.countDocuments({ 'name': new RegExp(regex, 'gmi') });
    const techStack = await TechStack.find({ 'name': new RegExp(regex, 'gmi') }, '_id name description status')
      .sort( [[`${params.sortBy}`, params.sortOrder]])
      .skip(skipRecord)
      .limit(params.limit);

    if (!techStack) {

      return {
        status: 200,
        code: 'GET_LIST_TECH_STACK_FAILED',
        error: true,
      };
    }
    else {
      const totalPage = Math.ceil(totalRecords/params.limit);

      return {
        status: 200,
        code: 'GET_LIST_TECH_STACK_SUCCESS',
        error: false,
        message: `Page: ${params.page}/${totalPage}`,
        data: techStack,
      };
    }
  }catch (err){
    logger(`getTechStackes ${err}`);

    return errorResponse;
  }
};

export const updateTechStack = async (id, data) => {
  try {
    const techStack = await TechStack.findOne({ _id: id });
    if (!techStack){
      return {
        status: 404,
        code: 'PROJECT_TECH_STACK_FOUND',
        error: true,
      };
    }
    await techStack.updateOne(data);

    return {
      status: 200,
      code: 'UPDATE_TECH_STACK_SUCCESS',
      error: false,
      data: data,
    };
  }catch(err) {
    logger(`updateTechStack ${err}`);

    return errorResponse;
  }
};

export const deleteTechStack = async (id) => {
  try {
    const techStack = await TechStack.findOne({ _id: id });
    if (!techStack){
      return {
        status: 404,
        code: 'PROJECT_STATUS_NOT_FOUND',
        error: true,
      };
    }
    await techStack.updateOne({ status: 'deleted' });

    return {
      status: 200,
      code: 'DELETE_PROJECT_STATUS_SUCCESS',
      error: false,
    };
  }catch(err) {
    logger(`deleteTechStack ${err}`);

    return errorResponse;
  }
};
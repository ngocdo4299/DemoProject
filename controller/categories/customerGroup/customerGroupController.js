import { CustomerGroup } from '../../../model/customerGroup.js';
import { logger } from '../../../helper/logger.js';
import { errorResponse } from '../../../helper/response.js';

export const createNewCustomerGroup = async (data) => {
  try {
    const customerGroup = await CustomerGroup.findOne({ name: data.name }).lean();
    if (customerGroup) {
      return {
        status: 404,
        code: 'CUSTOMER_GROUP_EXISTED',
        error: true,
      };

    }
    const newCustomerGroup = await CustomerGroup.create(data);

    return {
      status: 200,
      code: 'CREATE_NEW_CUSTOMER_GROUP_SUCCESS',
      error: false,
      data: newCustomerGroup._id,
    };
  } catch (err) {
    logger(`createNewCustomerGroup ${err}`);

    return errorResponse;
  }
};

export const getCustomerGroupDetail = async (id) => {
  try {
    const customerGroup = await CustomerGroup.findOne({ _id: id }, ['_id', 'name', 'description', 'priority', 'status']);
    if ( !customerGroup ){
      return {
        status: 404,
        code: 'CUSTOMER_GROUP_NOT_EXIST',
        error: true,
      };
    }

    return {
      status: 200,
      code: 'GET_CUSTOMER_GROUP_DETAIL_SUCESS',
      error: false,
      data: customerGroup,
    };
  }catch (err) {
    logger(`getCustomerGroupDetail ${err}`);

    return errorResponse;
  }
};

export const updateCustomerGroup = async ( id, data ) => {
  try {
    const customerGroup = await CustomerGroup.findOne({ _id: id });
    if( !customerGroup ){
      return {
        status: 404,
        code: 'CUSTOMER_GROUP_NOT_FOUND',
        error: true,
      };
    }
    await customerGroup.updateOne(data);

    return {
      status: 200,
      code: 'UPDATE_CUSTOMER_GROUP_SUCCESS',
      error: false,
      data: data,
    };

  }catch( err ) {
    logger(`updateCustomerGroup ${err}`);

    return errorResponse;
  }
};

export const deleteCustomerGroup = async (id) => {
  try {
    const customerGroup = await CustomerGroup.findOne({ _id: id });
    if( !customerGroup){
      return {
        status: 404,
        code: 'CUSTOMER_GROUP_NOT_FOUND',
        error: true,
      };
    }
    await customerGroup.updateOne({ status: 'deleted' });

    return {
      status: 200,
      code: 'DELETE_CUSTOMER_GROUP_SUCCESS',
      error: false,
    };
  }catch( err ){
    logger(`deleteCustomerGroup ${err}`);

    return errorResponse;
  }
};

export const getListCustomerGroups = async (search = '', page = 1, limit = 10, sortBy = 'name', sortOrder = 1) => {
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

    const totalRecords = await CustomerGroup.countDocuments({ 'name': new RegExp(regex, 'gmi') }).lean();
    const customerGroups = await CustomerGroup.find({ 'name': new RegExp(regex, 'gmi') }, '_id name priority description status')
      .sort( [[`${sortBy}`, sortOrder]])
      .skip(skipRecord)
      .limit(limit);
    const totalPage = Math.ceil(totalRecords/limit);

    return {
      status: 200,
      code: 'GET_LIST_CUSTOMER_GROUP_SUCCESS',
      error: false,
      message: `Page: ${page}/${totalPage}`,
      data: customerGroups,
    };
  }catch (err){
    logger(`getListCustomerGroups ${err}`);

    return errorResponse;
  }
};
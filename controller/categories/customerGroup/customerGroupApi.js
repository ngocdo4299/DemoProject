import { createNewCustomerGroup, deleteCustomerGroup, getListCustomerGroups, getCustomerGroupDetail, updateCustomerGroup } from './customerGroupController.js';
import { removeEmpty } from '../../../helper/removeEmpty.js';
export const createCustomerGroup = async (req, res) => {
  const requiredFields = [
    { 'key': 'name', 'type': 'string' },
    { 'key': 'description', 'type': 'string' },
    { 'key': 'priority', 'type': 'number' },
  ];

  for( let field of requiredFields){
    if (!(field.key in req.body)){
      return res.status(404).json(
        {
          status: 404,
          code: `${field.key.toUpperCase()}_IS_REQUIRED`,
          error: true,
          message: `${field.key} is required`,
        },
      );

    }else if( field.key in req.body && typeof req.body[field.key] !== field.type ) {
      return res.status(404).json(
        {
          status: 404,
          code: `${field.key.toUpperCase()}_IS_A_${field.type.toUpperCase()}`,
          error: true,
          message: `${field.key} must be a ${field.type}`,
        },
      );

    }
  }

  const result = await createNewCustomerGroup(req.body);
  res.status(result.status).json(result);

};

export const getGroupList = async (req, res) => {
  const result = await getListCustomerGroups((req.query.search, req.query.page, req.query.limit, req.query.sortBy, req.query.sortOrder));
  res.status(result.status).json(result);
};

export const updateGroup = async (req, res) => {
  const acceptableFields = [
    { 'key': 'name', 'type': 'string' },
    { 'key': 'description', 'type': 'string' },
    { 'key': 'status', 'type': 'string' },
    { 'key': 'priority', 'type': 'number' },
  ];

  let updateData = {
    'name': undefined,
    'description': undefined,
    'priority': undefined,
    'status': undefined,
  };

  for( let field of acceptableFields){
    if( field.key in req.body ) {
      if (typeof req.body[field.key] !== field.type ) {
        return res.status(404).json(
          {
            status: 404,
            code: `${field.key.toUpperCase()}_IS_A_${field.type.toUpperCase()}`,
            error: true,
            message: `${field.key} must be a ${field.type}`,
          },
        );

      }
      updateData[field.key] = req.body[field.key];
    }
  }

  const result = await updateCustomerGroup(req.params.id, removeEmpty(req.body) );
  res.status(result.status).json(result);
};

export const getGroupDetail = async (req, res) => {
  const result = await getCustomerGroupDetail(req.params.id);
  res.status(result.status).json(result);
};

export const deleteGroup = async (req, res) => {
  const result = await deleteCustomerGroup(req.params.id);
  res.status(result.status).json(result);
};


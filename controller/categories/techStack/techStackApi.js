import { createNewTechStack, deleteTechStack, getTechStackDetail, getTechStacks, updateTechStack } from './teckStackController.js';
import { removeEmpty } from '../../../helper/removeEmpty.js';

export const createTechStack = async (req, res) => {

  const requiredFields = [
    { 'key': 'name', 'type': 'string' },
    { 'key': 'description', 'type': 'string' },
  ];

  for( let field of requiredFields){
    if(!(field.key in req.body)){
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

  const result = await createNewTechStack(req.body);
  res.status(result.status).json(result);
};

export const getTechStack = async (req, res) => {
  const result = await getTechStackDetail(req.params.id);
  res.status(result.status).json(result);
};

export const getListTechStack = async (req, res) => {
  const acceptableSortBy = ['name', 'status'];
  const acceptableSortOrder = {
    'asce': 1,
    'desc': -1,
  };
  let queryParams = {
    'search': undefined,
    'page': 1,
    'limit': 10,
    'sortBy': 'name',
    'sortOrder': 1,
  };
  if( req.query.search ){
    queryParams.search = req.query.search.toString();
  }

  if(req.query.page){
    if( Number.isInteger(parseInt(req.query.page)) && parseInt(req.query.page) > 0 ){
      queryParams.page = parseInt(req.query.page);
    }
  }

  if(req.query.limit){
    if( Number.isInteger(parseInt(req.query.limit)) && parseInt(req.query.limit) > 0) {
      queryParams.limit = parseInt(req.query.limit);
    }
  }

  if( req.query.sortBy){
    if( acceptableSortBy.includes(req.query.sortBy) ){
      queryParams.sortBy = req.query.sortBy;
    }
  }

  if( req.query.sortOrder ){
    const sortOrder = req.query.sortOrder.toString().trim();
    if( sortOrder in acceptableSortOrder){
      queryParams.sortOrder = acceptableSortOrder[sortOrder];
    }
  }
  const result = await getTechStacks(queryParams);
  res.status(result.status).json(result);
};

export const updateTech = async (req, res) => {
  const acceptableFields = [
    { 'key': 'name', 'type': 'string' },
    { 'key': 'description', 'type': 'string' },
    { 'key': 'status', 'type': 'string' },
  ];

  let updateData = {
    'name': undefined,
    'description': undefined,
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

  const result = await updateTechStack(req.params.id, removeEmpty(updateData));
  res.status(result.status).json(result);
};

export const deleteTech = async (req, res) => {
  const result = await deleteTechStack(req.params.id);
  res.status(result.status).json(result);
};
import { removeEmpty } from '../../../helper/removeEmpty.js';
import { createNewProjectType, deleteProjectType, getListProjectTypes, getProjectTypeDetail, updateProjectType } from './projectTypeController.js';

export const createNewType = async (req, res) => {
  const requiredFields = [
    { 'key': 'name', 'type': 'string' },
    { 'key': 'description', 'type': 'string' },
    { 'key': 'priority', 'type': 'number' },
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

  const result = await createNewProjectType(req.body);
  res.status(result.status).json(result);

};

export const getTypeDetail = async (req, res) => {
  const result = await getProjectTypeDetail(req.params.id);
  res.status(result.status).json(result);
};

export const getTypeList = async (req, res) => {
  const result = await getListProjectTypes(req.query.search, req.query.page, req.query.limit, req.query.sortBy, req.query.sortOrder);
  res.status(result.status).json(result);
};

export const updateType = async (req, res) => {
  const acceptableFields = [
    { 'key': 'name', 'type': 'string' },
    { 'key': 'description', 'type': 'string' },
    { 'key': 'status', 'type': 'string' },
    { 'key': 'priority', 'type': 'number' },
  ];

  let updateData = {
    'name': null,
    'description': null,
    'priority': null,
    'status': null,
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

  const result = await updateProjectType(req.params.id, removeEmpty(updateData));
  res.status(result.status).json(result);
};

export const deleteType = async (req, res) => {
  const result = await deleteProjectType(req.params.id);
  res.status(result.status).json(result);
};


import { createNewProjectStatus, deleteProjectStatus, getProjectStatusDetail, getProjectStatuses, updateProjectStatus } from './projectStatusController.js';
import { removeEmpty } from '../../../helper/removeEmpty.js';

export const createStatus = async (req, res) => {

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

  const result = await createNewProjectStatus(req.body);
  res.status(result.status).json(result);
};

export const updateStatus = async (req, res) => {
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

  const result = await updateProjectStatus(req.params.id, removeEmpty(req.body));
  res.status(result.status).json(result);
};

export const getStatus = async (req, res) => {

  const result = await getProjectStatuses(req.query.search, req.query.page, req.query.limit, req.query.sortBy, req.query.sortOrder);
  res.status(result.status).json(result);
};

export const getStatusDetail = async (req, res) => {
  const result = await getProjectStatusDetail(req.params.id);
  res.status(result.status).json(result);
};

export const deleteStatus = async (req, res) => {
  const result = await deleteProjectStatus(req.params.id);
  res.status(result.status).json(result);
};
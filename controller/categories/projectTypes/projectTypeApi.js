import { createNewProjectType, deleteProjectType, getProjectTypeDetail, updateProjectType } from './projectTypeController.js';

export const createNewType = async (req, res) => {
  const requiredFields = [
    { 'key': 'name', 'type': 'string' },
    { 'key': 'description', 'type': 'string' },
    { 'key': 'priority', 'type': 'number' },
  ];

  for( let field of requiredFields){
    if(!(field.key in req.body)){
      res.status(404).json(
        {
          status: 404,
          code: `${field.key.toUpperCase()}_IS_REQUIRED`,
          error: true,
          message: `${field.key} is required`,
        },
      );

      return 0;
    }else if( field.key in req.body && typeof req.body[field.key] !== field.type ) {
      res.status(404).json(
        {
          status: 404,
          code: `${field.key.toUpperCase()}_IS_A_${field.type.toUpperCase()}`,
          error: true,
          message: `${field.key} must be a ${field.type}`,
        },
      );

      return 0;
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
  const result = {
    status: 200,
    code: 'GET_PROJECT_TYPE_LIST_SUCCESS',
    error: false,
  };
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
    'name': undefined,
    'description': undefined,
    'priority': undefined,
    'status': undefined,
  };

  for( let field of acceptableFields){
    if( field.key in req.body ) {
      if (typeof req.body[field.key] !== field.type ) {
        res.status(404).json(
          {
            status: 404,
            code: `${field.key.toUpperCase()}_IS_A_${field.type.toUpperCase()}`,
            error: true,
            message: `${field.key} must be a ${field.type}`,
          },
        );

        return 0;
      } else {
        updateData[field.key] = req.body[field.key];
      }}
  }

  JSON.parse(JSON.stringify(updateData));
  const result = await updateProjectType(req.params.id, updateData);
  res.status(result.status).json(result);
};

export const deleteType = async (req, res) => {
  const result = await deleteProjectType(req.params.id);
  res.status(result.status).json(result);
};


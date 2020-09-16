import { createNewProjectType, deleteProjectType, getListProjectTypes, getProjectTypeDetail, updateProjectType } from './projectTypeController.js';

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
  const acceptableSortBy = ['name', 'priority'];
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

  const result = await getListProjectTypes(queryParams);
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


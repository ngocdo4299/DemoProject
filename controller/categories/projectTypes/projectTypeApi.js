import { createNewProjectType, getProjectTypeDetail } from './projectTypeController.js';

export const createNewType = async (req, res) => {
  const requiredFields = [ 'name', 'description', 'priority' ];

  for( let key of requiredFields){
    if(!(key in req.body)){
      res.status(404).json(
        {
          status: 404,
          code: `${key.toUpperCase()}_IS_REQUIRED`,
          error: true,
          message: `${key} is required`,
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
  const result = {
    status: 200,
    code: 'UPDATE_PROJECT_TYPE_SUCCESS',
    error: false,
  };
  res.status(result.status).json(result);
};

export const deleteType = async (req, res) => {
  const result = {
    status: 200,
    code: 'DELETE_PROJECT_TYPE_SUCCESS',
    error: false,
  };
  res.status(result.status).json(result);
};


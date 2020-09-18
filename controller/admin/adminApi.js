import { loginUser, createUser } from './adminController.js';

export const login = async (req, res) => {
  const requiredFields = [
    { 'key': 'userName', 'type': 'string' },
    { 'key': 'password', 'type': 'string' },
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
  const result = await loginUser(req);
  res.status(result.status).json(result);
};

export const registry = async (req, res) => {
  const requiredFields = [
    { 'key': 'userName', 'type': 'string' },
    { 'key': 'password', 'type': 'string' },
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
  const result = await createUser(req);
  res.status(result.status).json(result);
};

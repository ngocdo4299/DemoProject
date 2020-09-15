import { createNewProjectType } from './projectTypeController.js';

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


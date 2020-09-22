import { createNewDepartment, getDepartmentDetail } from './departmentController.js';

export const createDepartment = async (req, res) => {
  // required fields for req body
  const requiredFields = [
    { 'key': 'name', 'type': 'string' },
    { 'key': 'functionality', 'type': 'string' },
    { 'key': 'techStackList', 'type': 'object' },
  ];

  // required fields for tech stack in tech stack list
  const requiredTechStackList = [{ 'key': 'techStack', 'type': 'string' }];

  // check if req body has all required field
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

  // check if tech stack list in req body has all required fields
  if( Array.isArray(req.body.techStackList) ){
    req.body.techStackList.forEach((e) => {
      for( let field of requiredTechStackList){
        if(!(field.key in e)){
          return res.status(404).json(
            {
              status: 404,
              code: `${field.key.toUpperCase()}_IS_REQUIRED`,
              error: true,
              message: `${field.key} is required`,
            },
          );
        }
        if( field.key in e && typeof e[field.key] !== field.type ) {
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
    });
  }else{
    res.status(404).json(
      {
        status: 404,
        code: 'TECH_STACK_MUST_BE_AN_ARRAY',
        error: true,
      },
    );
  }

  // check to remove projectList field
  if( req.body.projectList ){
    delete req.body.projectList;
  }

  // check to remove employeeList field
  if( req.body.employeeList ){
    delete req.body.employeeList;
  }
  const result = await createNewDepartment(req.body);
  res.status(result.status).json(result);
};

export const getDepartment = async ( req, res ) => {
  const result = await getDepartmentDetail(req.params.id);
  res.status(result.status).json(result);
};
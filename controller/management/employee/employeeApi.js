import moment from 'moment';
import { removeEmpty } from '../../../helper/removeEmpty.js';
import { createNewEmployee, deleteOneEmployee, getEmployeeDetail, updateEmployeeDetail } from './employeeController.js';

export const createEmployee = async (req, res) => {

  // required fields for req body
  const requiredFields = [
    { 'key': 'fullName', 'type': 'string' },
    { 'key': 'DoB', 'type': 'string' },
    { 'key': 'idNumber', 'type': 'string' },
    { 'key': 'phoneNumber', 'type': 'string' },
    { 'key': 'address', 'type': 'string' },
    { 'key': 'techStackList', 'type': 'object' },
  ];

  // required fields for tech stack in tech stack list
  const requiredTechStackList = [
    { 'key': 'techStack', 'type': 'string' },
    { 'key': 'exp', 'type': 'string' },
    { 'key': 'description', 'type': 'string' },
  ];

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
  // check if tech stack list in req body has all required fields
  if(Array.isArray(req.body.techStackList)) {
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
  } else {
    return res.status(404).json(
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

  // check if DoB is in valid form
  if( !moment(req.body.DoB, 'YYYY-MM-DD', true).isValid() ){
    return res.status(404).json(
      {
        status: 404,
        code: 'DOB_IS_INVALID',
        error: true,
        message: 'YYYY-MM-DD format required, example: 1999-04-02 ',
      },
    );
  }
  const result = await createNewEmployee(req.body);
  res.status(result.status).json(result);
};

export const getEmployee = async ( req, res ) => {
  const result = await getEmployeeDetail(req.params.id);
  res.status(result.status).json(result);
};

export const updateEmployee = async ( req, res ) => {
  // them kiem tra dob valid in update data
  const acceptableFields = [
    { 'key': 'fullName', 'type': 'string' },
    { 'key': 'DoB', 'type': 'string' },
    { 'key': 'idNumber', 'type': 'string' },
    { 'key': 'phoneNumber', 'type': 'string' },
    { 'key': 'address', 'type': 'string' },
    { 'key': 'language', 'type': 'object' },
    { 'key': 'certification', 'type': 'object' },
    { 'key': 'techStackList', 'type': 'object' },
  ];
  // required fields for tech stack in tech stack list
  const requiredTechStackList = [
    { 'key': 'techStack', 'type': 'string' },
    { 'key': 'exp', 'type': 'string' },
    { 'key': 'description', 'type': 'string' },
  ];

  let updateData = {
    'fullName': null,
    'DoB': null,
    'idNumber': null,
    'phoneNumber': null,
    'address': null,
    'language': null,
    'certification': null,
    'techStackList': null,
  };

  for( let field of acceptableFields){
    if( field.key in req.body ) {
      if ( field.key === 'DoB' && !moment(req.body.DoB, 'YYYY-MM-DD', true).isValid() ){
          return res.status(404).json(
            {
              status: 404,
              code: 'DOB_IS_INVALID',
              error: true,
              message: 'YYYY-MM-DD format required, example: 1999-04-02 ',
            },
          );
      }
      if ( field.key === 'techStackList' && Array.isArray(req.body.techStackList) ){
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
              res.status(404).json(
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
  const result = await updateEmployeeDetail( req.params.id, removeEmpty( req.body ));
  res.status(result.status).json(result);
};

export const deleteEmployee = async (req, res) => {
  const result = await deleteOneEmployee(req.params.id);
  res.status(result.status).json(result);
};
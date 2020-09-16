import jwt from 'jsonwebtoken';
import { logger } from '../helper/logger.js';
export const generateToken = async (data, expriredTime) => {
  try{
    const result = await jwt.sign( { data }, process.env.TOKEN_ACCESS, { expiresIn: expriredTime } );

    return result;
  }catch(err){
    logger(`generateToken ${err}`);
  }
};

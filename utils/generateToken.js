import jwt from 'jsonwebtoken';
export const generateToken = async (data, expriredTime) => {
  const result = await jwt.sign( { data }, process.env.TOKEN_ACCESS, { expiresIn: expriredTime } );

  return result;
};

import jwt from 'jsonwebtoken';
import { removeEmpty } from '../helper/removeEmpty.js';

export const verifyToken = (req, res, next) => {
  // remove null or undefined value in json object
  req.body = removeEmpty(req.body);

  const authHeader = req.headers['authorization'];
  if (typeof authHeader !== 'undefined') {
    req.token = authHeader.split(' ')[1];
    jwt.verify(req.token, process.env.TOKEN_ACCESS, (err) => {
      if (err) {
        res.send({
          status: 403,
          code: 'VERIFY_TOKEN_FAILED',
          error: true,
          message: err.message,
        });
      }
      else {
        next();
      }
    });
  } else {
    res.send({
      status: 403,
      code: 'VERIFY_TOKEN_FAILED',
      error: true,
      message: 'Token undefined',
    });
  }
};

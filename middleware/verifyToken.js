import jwt from 'jsonwebtoken';
import { responseFormalize } from '../helper/response.js';
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (typeof authHeader !== 'undefined') {
    req.token = authHeader.split(' ')[1];
    jwt.verify(req.token, process.env.TOKEN_ACCESS, (err) => {
      if (err) {
        res.send(responseFormalize(403, 'VERIFY_TOKEN_FAILED', true, err.message));
      }
      else {
        next();
      }
    });
  } else {
    res.send(responseFormalize(403, 'VERIFY_TOKEN_FAILED', true));
  }
};

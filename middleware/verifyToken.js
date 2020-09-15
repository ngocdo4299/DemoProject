import jwt from 'jsonwebtoken';
export const verifyToken = (req, res, next) => {
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

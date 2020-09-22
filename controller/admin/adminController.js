import { Admin } from '../../model/admin.js';
import { errorResponse } from '../../helper/response.js';
import { generateToken } from '../../utils/generateToken.js';
import { logger } from '../../helper/logger.js';

const loginUser = async (req) => {
  try {
    const data = req.body;
    const admin = await Admin.findOne({ userName: data.userName, status: 'active' });
    if (!admin){
      return {
        status: 404,
        code: 'USER_NOT_FOUND',
        error: true,
      };
    }
    const result = await Admin.verifyPassword( admin.password, data.password );
    if (result) {
      const token = await generateToken(result.message, 60 * 60);

      return {
        status: 200,
        code: 'TOKEN_GENERATE_SUCCESS',
        error: false,
        data: token,
      };
    }

    return {
      status: 203,
      code: 'TOKEN_GENERATE_FAILED',
      error: true,
      message: result.message,
    };
  } catch (err) {
    logger(`loginUser ${err}`);

    return errorResponse;
  }
};

const createUser = async (req) => {
  const data = req.body;
  try {
    const user = await Admin.findOne({ userName: data.userName, status: 'active' });
    if (user) {

      return {
        status: 404,
        code: 'USER_EXISTED',
        error: true,
      };
    }
    const newUser = await Admin.create(data);

    return {
      status: 200,
      code: 'CREATE_NEW_ADMIN_SUCCESS',
      error: false,
      data: newUser._id,
    };
  } catch (err) {
    logger(`createUser ${err}`);

    return errorResponse;
  }
};

export { loginUser, createUser };
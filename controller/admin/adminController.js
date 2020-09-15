import { Admin } from '../../model/admin.js';
import { errorResponse } from '../../helper/response.js';
import { generateToken } from '../../utils/generateToken.js';
import { logger } from '../../helper/logger.js';

const loginUser = async (req) => {
  try {
    const data = req.body;
    const result = await Admin.verifyPassword(data);
    if (!result.error) {
      const token = await generateToken(result.message, 60 * 60);

      return {
        status: 200,
        code: 'TOKEN_GENERATE_SUCCESS',
        error: false,
        data: token,
      };
    } else {
      return {
        status: 203,
        code: 'TOKEN_GENERATE_FAILED',
        error: true,
        message: result.message,
      };
    }
  } catch (err) {
    logger(`loginUser ${err}`);

    return errorResponse;
  }
};

const createUser = async (req) => {
  const data = req.body;
  try {
    const user = await Admin.findOne({ userName: data.userName, status: 'active' });
    if (!user) {
      const newUser = await Admin.create(data);

      return {
        status: 200,
        code: 'CREATE_NEW_ADMIN_SUCCESS',
        error: false,
        data: newUser._id,
      };
    }
    else {
      return {
        status: 404,
        code: 'USER_EXISTED',
        error: true,
      };
    }
  } catch (err) {
    logger(`createUser ${err}`);

    return errorResponse;
  }
};

export { loginUser, createUser };
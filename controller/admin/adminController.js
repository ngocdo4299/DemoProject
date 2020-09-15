import { Admin } from '../../model/admin.js';
import { responseFormalize, errorResponse } from '../../helper/response.js';
import { generateToken } from '../../utils/generateToken.js';
import { logger } from '../../helper/logger.js';

const loginUser = async (req) => {
  try {
    const data = req.body;
    const result = await Admin.verifyPassword(data);
    if (!result.error) {
      const token = await generateToken(result.message, 60 * 60);

      return responseFormalize(200, 'TOKEN_GENERATE_SUCCESS', false, null, token);
    } else {
      return responseFormalize(203, 'TOKEN_GENERATE_FAILED', true, result.message);
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

      return responseFormalize(200, 'CREATE_NEW_USER_SUCCESS', '', '', newUser._id);
    }
    else { return responseFormalize(200, 'USER_EXISTED', true); }
  } catch (err) {
    logger(`createUser ${err}`);

    return errorResponse;
  }
};

export { loginUser, createUser };
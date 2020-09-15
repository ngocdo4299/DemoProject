import { ProjectType } from '../../../model/projectTypes.js';
import { logger } from '../../../helper/logger.js';
import { errorResponse } from '../../../helper/response.js';
export const createNewProjectType = async (data) => {
  try {
    const projectType = await ProjectType.findOne({ name: data.name });
    if (!projectType) {
      const newProjectType = await ProjectType.create(data);

      return {
        status: 200,
        code: 'CREATE_NEW_PROJECT_TYPE_SUCCESS',
        error: false,
        data: newProjectType._id,
      };
    }
    else {

      return {
        status: 404,
        code: 'PROJECT_TYPE_EXITED',
        error: true,
      };
    }
  } catch (err) {
    logger(`createUser ${err}`);

    return errorResponse;
  }
};
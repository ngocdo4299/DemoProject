import express from 'express';
import { createNewType } from '../controller/categories/projectTypes/projectTypeApi.js';
import { verifyToken } from '../middleware/verifyToken.js';
const router = express.Router();

// create new project type
// name of new project type should be includeded in request body
router.post('/types/', verifyToken, createNewType);

export default router;
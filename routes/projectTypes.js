import express from 'express';
import { createNewType, deleteType, getTypeDetail, getTypeList, updateType } from '../controller/categories/projectTypes/projectTypeApi.js';
import { verifyToken } from '../middleware/verifyToken.js';
const router = express.Router();

// create new project type
// name of new project type should be includeded in request body
router.post('/types/', verifyToken, createNewType);

router.get('/types/', verifyToken, getTypeList);

router.get('/types/:id', verifyToken, getTypeDetail);

router.put('/types/:id', verifyToken, updateType);

router.delete('/types/:id', verifyToken, deleteType);

export default router;
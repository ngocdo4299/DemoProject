import express from 'express';
import { createStatus, deleteStatus, getStatus, getStatusDetail, updateStatus } from '../controller/categories/projectStatus/projectStatusApi.js';
import { verifyToken } from '../middleware/verifyToken.js';
const router = express.Router();

router.post('/status/', verifyToken, createStatus);

router.get('/status/', verifyToken, getStatus);

router.get('/status/:id', verifyToken, getStatusDetail);

router.put('/status/:id', verifyToken, updateStatus);

router.delete('/status/:id', verifyToken, deleteStatus);

export default router;
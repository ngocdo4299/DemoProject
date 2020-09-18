import express from 'express';
import { createEmployee } from '../controller/management/employee/employeeApi.js';
import { verifyToken } from '../middleware/verifyToken.js';
const router = express.Router();

router.post('/employee/', verifyToken, createEmployee);

// router.get('/status/', verifyToken, getStatus);

// router.get('/status/:id', verifyToken, getStatusDetail);

// router.put('/status/:id', verifyToken, updateStatus);

// router.delete('/status/:id', verifyToken, deleteStatus);

export default router;
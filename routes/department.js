import express from 'express';
import { createDepartment, getDepartment } from '../controller/management/department/departmentApi.js';
import { verifyToken } from '../middleware/verifyToken.js';
const router = express.Router();

router.post('/department/', verifyToken, createDepartment);

// router.get('/employee/', verifyToken, getStatus);

router.get('/department/:id', verifyToken, getDepartment );

// router.put('/employee/:id', verifyToken, );

// router.delete('/employee/:id', verifyToken, );

export default router;
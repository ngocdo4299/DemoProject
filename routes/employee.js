import express from 'express';
import { createEmployee, getEmployee, updateEmployee } from '../controller/management/employee/employeeApi.js';
import { verifyToken } from '../middleware/verifyToken.js';
const router = express.Router();

router.post('/employee/', verifyToken, createEmployee);

// router.get('/status/', verifyToken, getStatus);

router.get('/employee/:id', verifyToken, getEmployee);

router.put('/employee/:id', verifyToken, updateEmployee);

// router.delete('/status/:id', verifyToken, deleteStatus);

export default router;
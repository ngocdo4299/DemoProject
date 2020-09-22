import express from 'express';
import { createEmployee, deleteEmployee, getEmployee, updateEmployee } from '../controller/management/employee/employeeApi.js';
import { verifyToken } from '../middleware/verifyToken.js';
const router = express.Router();

router.post('/employee/', verifyToken, createEmployee);

// router.get('/employee/', verifyToken, getStatus);

router.get('/employee/:id', verifyToken, getEmployee);

router.put('/employee/:id', verifyToken, updateEmployee);

router.delete('/employee/:id', verifyToken, deleteEmployee);

export default router;
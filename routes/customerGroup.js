import express from 'express';
import { createCustomerGroup, deleteGroup, getGroupDetail, getGroupList, updateGroup } from '../controller/categories/customerGroup/customerGroupApi.js';
import { verifyToken } from '../middleware/verifyToken.js';
const router = express.Router();

// create new project type
// name of new project type should be includeded in request body
router.post('/customers/', verifyToken, createCustomerGroup);

router.get('/customers/', verifyToken, getGroupList);

router.get('/customers/:id', verifyToken, getGroupDetail);

router.put('/customers/:id', verifyToken, updateGroup);

router.delete('/customers/:id', verifyToken, deleteGroup);

export default router;
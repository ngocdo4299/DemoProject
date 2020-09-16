import express from 'express';
import { createTechStack, deleteTech, getListTechStack, getTechStack, updateTech } from '../controller/categories/techStack/techStackApi.js';
import { verifyToken } from '../middleware/verifyToken.js';
const router = express.Router();

router.post('/techstacks/', verifyToken, createTechStack);

router.get('/techstacks/', verifyToken, getListTechStack);

router.get('/techstacks/:id', verifyToken, getTechStack);

router.put('/techstacks/:id', verifyToken, updateTech);

router.delete('/techstacks/:id', verifyToken, deleteTech);

export default router;
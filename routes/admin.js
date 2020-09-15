import express from 'express';
import { login, registry } from '../controller/admin/adminApi.js';

const router = express.Router();

//sign in
router.get('/admins/', login);

// register
router.post('/admins/', registry);

export default router;

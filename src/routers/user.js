/** @format */

import {
	register,
	login,
	getUsers,
	getUser,
	updateUser,
	deleteUser,
	getCurrentUser,
	handleVerifyCode,
} from '../controllers/user.js';
import { Router } from 'express';
import { verifyAccessToken } from '../middlewares/authorization.js';
import { verifyAdmin } from '../middlewares/verifyAdmin.js';
import { createPermission } from '../controllers/admin.js';

const router = Router();
router.post('/register', register);
router.post('/login', login);
router.post('/verify-code', handleVerifyCode);
// middleware
router.use(verifyAccessToken);
router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

// admin routes
router.use(verifyAdmin);
router.post('/admin/create-permission', createPermission);

export default router;

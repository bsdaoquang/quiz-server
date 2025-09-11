/** @format */

import {
	register,
	login,
	getUsers,
	getUser,
	updateUser,
	deleteUser,
	getCurrentUser,
} from '../controllers/user.js';
import { Router } from 'express';
import { verifyAccessToken } from '../middlewares/authorization.js';

const router = Router();
router.post('/register', register);
router.post('/login', login);

// middleware
router.use(verifyAccessToken);
router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;

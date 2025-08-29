/** @format */

import {
	register,
	login,
	getUsers,
	getUser,
	updateUser,
	deleteUser,
} from '../controllers/user.js';
import { Router } from 'express';

const router = Router();
router.post('/register', register);
router.post('/login', login);

// middleware
router.get('/', getUsers);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;

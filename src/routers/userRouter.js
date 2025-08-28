/** @format */
import { Router } from 'express';
import {
	createUser,
	loginUser,
	getUsers,
	getUserById,
	updateUser,
	deleteUser,
	createHistory,
	getHistories,
	getHistoryById,
	updateHistory,
	deleteHistory,
} from '../controllers/userController.js';

const router = Router();
router.post('/login', loginUser);
router.post('', createUser);

router.get('', getUsers);
router.post('/histories', createHistory);
router.get('/histories', getHistories);
router.delete('/:id', deleteUser);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.get('/histories/:id', getHistoryById);
router.put('/histories/:id', updateHistory);
router.delete('/histories/:id', deleteHistory);

export default router;

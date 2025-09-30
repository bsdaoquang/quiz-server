/** @format */

import { Router } from 'express';
import { verifyTeacher } from '../middlewares/verifyTeacher.js';
import {
	createManyQuestions,
	createQuestion,
	deleteQuestions,
	getQuestions,
} from '../controllers/questions.js';
import { verifyAccessToken } from '../middlewares/authorization.js';

const router = Router();
router.use(verifyAccessToken);
router.use(verifyTeacher);

router.post('/', createQuestion);
router.post('/many', createManyQuestions);
router.get('/', getQuestions);
router.delete('/', deleteQuestions);

export default router;

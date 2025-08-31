/** @format */

import { Router } from 'express';
import {
	createQuestion,
	deleteQuestion,
	getAllQuestions,
	getQuestionById,
	updateQuestion,
} from '../controllers/questions.js';
import { verifyAccessToken } from '../middlewares/authorization.js';
import { verifyTeacher } from '../middlewares/verifyTeacher.js';

const router = Router();

router.get('/', getAllQuestions);
router.get('/:id', getQuestionById);

router.use(verifyAccessToken);
router.use(verifyTeacher);

router.post('/', createQuestion);
router.put('/:id', updateQuestion);
router.delete('/:id', deleteQuestion);

export default router;

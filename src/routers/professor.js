/** @format */

import { Router } from 'express';
import {
	createProfessor,
	getProfessors,
	getProfessorById,
	updateProfessor,
	deleteProfessor,
	loginProfessor,
} from '../controllers/professor.js';

const router = Router();

router.post('/', createProfessor);
router.put('/:id', updateProfessor);
router.post('/login', loginProfessor);

export default router;

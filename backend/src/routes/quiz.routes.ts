import { Router } from 'express';
import { getAllQuizzes, createQuiz, getQuizById, deleteQuiz } from '../controllers/quiz.controller';

const router = Router();

router.get('/', getAllQuizzes);
router.post('/', createQuiz);
router.get('/:id', getQuizById);
router.delete('/:id', deleteQuiz);

export default router;
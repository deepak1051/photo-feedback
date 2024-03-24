import express from 'express';
import { auth } from '../middleware/auth.js';
import {
  createFeedback,
  getUserFeedbacks,
  getFeedbacks,
  voteFeedback,
  getSingleFeedback,
} from '../controllers/feedbacks.js';

const router = express.Router();

router.use(auth);

router.get('/', getFeedbacks);
router.get('/:feedbackId', getSingleFeedback);
router.post('/:feedbackId/vote', voteFeedback);
// router.get('/:userId', getUserFeedbacks);
router.post('/', createFeedback);

export default router;

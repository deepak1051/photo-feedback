import express from 'express';
import { auth } from '../middleware/auth.js';
import {
  createComment,
  getComments,
  createReplyComment,
  getReplyComment,
  deleteComment,
} from '../controllers/comments.js';

const router = express.Router();

router.use(auth);

router.get('/:feedbackId', getComments);
router.post('/:feedbackId', createComment);
router.delete('/:commentId', deleteComment);

router.post('/:commentId/reply', createReplyComment);
router.get('/:commentId/reply', getReplyComment);

// router.post('/:commentId', commentReply);

export default router;

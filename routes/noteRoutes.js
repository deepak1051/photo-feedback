import express from 'express';
import {
  createNote,
  deleteNote,
  getNote,
  getNotes,
  updateNote,
} from '../controllers/notes.js';
import { auth } from '../middleware/auth.js';
const router = express.Router();

router.get('/', auth, getNotes);
router.post('/', auth, createNote);

router.get('/:id', auth, getNote);
router.put('/:id', auth, updateNote);
router.delete('/:id', auth, deleteNote);

export default router;

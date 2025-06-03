import express from 'express';
import { getAllNotes, createNotes, updateNotes, deleteNotes, getById } from '../controllers/notesController.js';
const router = express.Router();
router.get('/', getAllNotes);
router.post('/', createNotes);
router.put('/:id', updateNotes);
router.delete('/:id', deleteNotes);
router.get('/:id', getById)
export default router;

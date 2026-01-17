import express from 'express';
import {
  createSession,
  getSessionById,
  updateSession,
  deleteSession,
  getActiveSessions,
  getRecentSessions,
  joinSession,
  endSession,
} from '../controllers/sessionController.js';

const router = express.Router();

// Define your session-related routes here
router.post('/', createSession);
router.get('/:sessionId', getSessionById);
router.put('/:sessionId', updateSession);
router.delete('/:sessionId', deleteSession);
router.get('/active', getActiveSessions);
router.get('/recent', getRecentSessions);
router.post('/:sessionId/join', joinSession);
router.post('/:sessionId/end', endSession);

export default router;

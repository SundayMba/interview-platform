import express from 'express';
import getStreamToken from '../controllers/handleGetToken.js';

const router = express.Router();

router.get('/token', getStreamToken);

export default router;

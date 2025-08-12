import express from 'express';
import { listStreamsHandler } from '../controllers/streamsController.js';

const router = express.Router();

router.get('/', listStreamsHandler);

export default router;

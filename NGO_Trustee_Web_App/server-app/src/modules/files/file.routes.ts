import express from 'express';
import * as FileController from './file.controller';
import { protect } from '../../middleware/auth';
import { upload } from '../../middleware/upload';

const router = express.Router();

router.use(protect);
router.post('/upload', upload.single('file'), FileController.uploadFile);

export default router;

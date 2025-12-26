import express from 'express';
import * as FileController from './file.controller';
import { protect } from '../../middleware/auth';
import { upload } from '../../middleware/upload';

const router = express.Router();

router.use(protect);
router.post('/upload', upload.single('file'), FileController.uploadFile);
router.get('/list', FileController.listFiles);
router.put('/:id', FileController.updateFile);
router.delete('/:id', FileController.deleteFile);

export default router;


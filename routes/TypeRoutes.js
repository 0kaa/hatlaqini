import express from 'express';
const router = express.Router();
import { CreateType } from './../controllers/TypeController.js'
router.post('/', CreateType);

export default router
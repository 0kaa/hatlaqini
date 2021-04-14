import express from 'express'
const router = express.Router()
import { CreateLocation } from '../controllers/LocationController.js';
router.post('/', CreateLocation)

export default router
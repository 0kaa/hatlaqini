import express from 'express'
const router = express.Router()
import { CreateLocation } from './../controllers/location.js';
router.post('/', CreateLocation)

export default router
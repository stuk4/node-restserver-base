import { Router } from 'express';
import { check } from 'express-validator';
import { search } from '../controllers/search.js';
;
const router = Router()

router.get('/:colection/:term',search)

export default router
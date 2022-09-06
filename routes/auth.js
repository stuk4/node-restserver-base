import { Router } from 'express';
import { check } from 'express-validator';
import { login } from '../controllers/auth.js';
import { validateFields } from '../middlewares/validate-fields.js';
const router = Router()


router.post('/login',[
    check('email','El correo es obliatorio').isEmail(),
    check('password','La contraseña es obliatoria').not().isEmpty(),
    validateFields
],login)

export default router
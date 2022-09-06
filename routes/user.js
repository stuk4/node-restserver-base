import { Router } from 'express';
import { check } from 'express-validator';
import { usersDelete, usersGet, usersPatch, usersPost, usersPut } from '../controllers/user.js';
import {  validateFields } from '../middlewares/validate-fields.js';
import {emailExist, existUserById, isValidRole } from '../helpers/db-validators.js'
const router = Router()


router.get('/', usersGet)
router.post('/',[
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('password','La contraseña debe ser de más de 6 caracteres').isLength({min:6}),
    check('email','El correo no es válido').isEmail(),
    check('email').custom(emailExist),
    // check('role','No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('role').custom(isValidRole),
    validateFields
],usersPost)
router.put('/:id',[
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existUserById),
    check('role').custom(isValidRole),
    validateFields
], usersPut)
router.delete('/:id',[
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existUserById),
    validateFields
], usersDelete)
router.patch('/', usersPatch)

export default router
import { Router } from 'express';
import { check } from 'express-validator';
import { createCategory, deleteCategory, getCategories, getCategory, updateCategory } from '../controllers/categories.js';
import { existCategoryById } from '../helpers/db-validators.js';
import { validateFields } from '../middlewares/validate-fields.js';
import { validateJWT } from '../middlewares/validate-jwt.js';
import { isAdminRole } from '../middlewares/validate-roles.js';
const router = Router()

// OBTENER TODAS LAS CATEGORIAS - PUBLIC
router.get('/',getCategories)
// DETALLE DE CATEGORIA - PUBLIC
// TODO: CREAR middleware si existe una categoria
router.get('/:id',[
    check('id','No es un id de mongo válido').isMongoId(),
    check('id').custom(existCategoryById),
    validateFields,
],getCategory)

// Crear categoria - privado - cualquier persona con un token valido
router.post('/',[
    validateJWT,
    check('name','El nombre es obligatorio').not().isEmpty()
],createCategory)

// Actualizar - privado -cualquier token válido
router.put('/:id',[
    validateJWT,
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existCategoryById),
    validateFields
],updateCategory)
router.delete('/:id',[
    validateJWT,
    isAdminRole,
    check('id','No es un id de mongo válido').isMongoId(),
    check('id').custom(existCategoryById),
    validateFields

],deleteCategory)


export default router
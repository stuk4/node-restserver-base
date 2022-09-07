import { Router } from 'express';
import { check } from 'express-validator';
import { getProducts,createProduct,updateProduct,
    deleteProduct, 
    getProduct} from '../controllers/products.js';
import { existProductById } from '../helpers/db-validators.js';
import { validateFields } from '../middlewares/validate-fields.js';
import { validateJWT } from '../middlewares/validate-jwt.js';
import { isAdminRole } from '../middlewares/validate-roles.js';
const router = Router()

router.get('/',
[
    check('id','No es un id Mongo válido').isMongoId(),
    check('id').custom(existProductById)
],
getProducts);

router.get('/:id',[
    check('id','No es un id de mongo válido').isMongoId(),
    check('id').custom(existProductById),
    validateFields,
],getProduct)
router.post('/',[
    validateJWT,
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('category','No es un id de Mongo válido').isMongoId(),
    validateFields

],createProduct);
router.put('/:id',[
    validateJWT,
    // check('category','No es un id de Mongo válido').isMongoId(),
    check('id').custom(existProductById)
],updateProduct)

router.delete('/:id',[
    validateJWT,
    isAdminRole,
    check('id','No es un id de mongo válido').isMongoId(),
    check('id').custom(existProductById),
    validateFields

],deleteProduct)


export default router
import { Router } from 'express';
import { check } from 'express-validator';
import { loadFile, showImage, updateImageCLoudinary } from '../controllers/uploads.js';
import { permittedColections } from '../helpers/db-validators.js';
import { validateFields } from '../middlewares/validate-fields.js';
import { validateUploadedFile } from '../middlewares/validate-file.js';
const router = Router()


router.post('/',validateUploadedFile,loadFile)


router.put('/:colection/:id',[
    validateUploadedFile,
    check('id','El id debe ser de mongo').isMongoId(),
    check('colection').custom( c => permittedColections(c,['users','products'])),
    validateFields
// ],updateImage)
],updateImageCLoudinary)

router.get('/:colection/:id',[
    check('id','El id debe ser de mongo').isMongoId(),
    check('colection').custom( c => permittedColections(c,['users','products'])),
    validateFields
],showImage

)
export default router
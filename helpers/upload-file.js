import {v4} from 'uuid'
import path from 'path';

const uuidv4 = v4;

const uploadFile =  async (files,validExtensions=['png','jpg','jpeg','gif'],folder='') =>{
    return new Promise((resolve,reject) =>{
        const {file} = files;
        const cuttedName = file.name.split('.')
        const extension = cuttedName[cuttedName.length -1]
        // Validar extenciones
        
    
        if(!validExtensions.includes(extension)){
            reject(`La extención: ${extension} no es permitida - ${validExtensions}`)
        }
        const tmpName = uuidv4() +'.'+extension;
        const uploadPath = path.join(path.resolve(), '/uploads/',folder,tmpName) 
        file.mv(uploadPath, (err) =>{
          if (err) {
            reject(err)
            return res.status(500).json({err})
          }
          resolve(tmpName)
        
        });
    }); 
    
}

export {
    uploadFile
}
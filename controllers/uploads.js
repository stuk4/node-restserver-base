import {  request, response } from "express";
import { uploadFile } from "../helpers/upload-file.js";
import path from 'path';
import fs from 'fs';
import {Product, User} from '../models/index.js'
const loadFile = async (req=request,res=response) =>{
 



  try {
    const fileName = await uploadFile(req.files,undefined,'imgs')
    res.json({
      fileName
    })
  } catch (error) {
    res.status(400).json({error})
  }
  
}

const updateImage = async (req=request,res=response ) =>{
  const { id,colection} = req.params;
  let model;
  switch (colection) {
    case 'users':
      model = await User.findById(id);
      if(!model){
        return res.status(400).json({
          msg:`No existe un usuario con el id: ${id}`
        })
      }
      break;
    case 'products':
      model = await Product.findById(id);
      if(!model){
        return res.status(400).json({
          msg:`No existe un usuario con el id: ${id}`
        })
      }
      break;
  
    default:
      return res.status(500).json({msg:`Aún no implementado`})
      
  }
 
  try {
   if(model.img){
     // Borrar imagen del servidor
     const pathImage = path.join(path.resolve(),'/uploads/',colection,model.img)
     console.log("Path image",pathImage)
     if(fs.existsSync(pathImage)){
       fs.unlinkSync(pathImage);
     }
   }
 } catch (error) {
   console.log(error)
 }
  const name =  await uploadFile(req.files,undefined,colection)
  model.img = name;
   // Limpiar imagenes previas
  await model.save()
  res.json(model)
}
const showImage = async (req=request,res=response) =>{
  const { id,colection } = req.params;

  let model;
  switch (colection) {
    case 'users':
      model = await User.findById(id);
      if(!model){
        return res.status(400).json({
          msg:`No existe un usuario con el id: ${id}`
        })
      }
      break;
    case 'products':
      model = await Product.findById(id);
      if(!model){
        return res.status(400).json({
          msg:`No existe un usuario con el id: ${id}`
        })
      }
      break;
  
    default:
      return res.status(500).json({msg:`${ colection } - Aún no implementado`})
      
  }
 
  try {
   if(model.img){
     // Borrar imagen del servidor
     const pathImage = path.join(path.resolve(),'/uploads/',colection,model.img)
     
     if(fs.existsSync(pathImage)){
       return res.sendFile(pathImage)
     }
   }
 } catch (error) {
   console.log(error)
 }
  const pathImage = path.join(path.resolve(),'/assets/no-image.jpg')
  res.sendFile(pathImage)
}
export {
  loadFile,
  updateImage,
  showImage
}
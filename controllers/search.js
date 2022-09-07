import {  request, response } from "express";
import mongoose  from "mongoose";
import { Category, Product, User } from "../models/index.js";
const { isValidObjectId} = mongoose
const permitedColections = [
    'users',
    'categories',
    'products',
    'roles'
]
const searchUsers = async (term='',res=response)=>{

    try {
        
        const isMongoId = isValidObjectId(term)
        console.log(isMongoId)
        if(isMongoId){
            //    
            const user = await User.findById(term);
            return res.json({
                results:(user)?[user]:[]
            })
        }
        //Busquedas insensibles
        const regex = new RegExp(term,'i')
        const users = await User.find({
            $or:[{name:regex},{email:regex}],
            $amd:[{status:true}]
        })
        res.json({
            results:users
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg:'Error en el servidor, contacte al administrador'
        })
    }
}
const searchCategories = async (term='',res=response)=>{

    try {
        
        const isMongoId = isValidObjectId(term)
        console.log(isMongoId)
        if(isMongoId){
            //    
            const category = await Category.findById(term);
            return res.json({
                results:(category)?[category]:[]
            })
        }
        //Busquedas insensibles
        const regex = new RegExp(term,'i')
        const category = await Category.find({
            $or:[{name:regex}],
            $amd:[{status:true}]
        })
        res.json({
            results:category
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg:'Error en el servidor, contacte al administrador'
        })
    }
}
const searchProducts = async (term='',res=response)=>{

    try {
        
        const isMongoId = isValidObjectId(term)
        console.log(isMongoId)
        if(isMongoId){
            //    
            const product = await Product.findById(term)
                                    .populate('category','name');
            return res.json({
                results:(product)?[product]:[]
            })
        }
        //Busquedas insensibles
        const regex = new RegExp(term,'i')
        const product = await Product.find({
            $or:[{name:regex}],
            $amd:[{status:true}]
        })
        .populate('category','name');
        res.json({
            results:product
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg:'Error en el servidor, contacte al administrador'
        })
    }
}
const search = (req=request,res=response) =>{
    try {
        
        const {colection,term} = req.params;
        if(!permitedColections.includes(colection)){
            return res.status(400).json({
                msg:`Las colecciones permitidas son: ${permitedColections}`
            })
        }
        switch (colection) {
            case 'users':
                searchUsers(term,res);
                break;
            case 'categories':
                searchCategories(term,res)
                break
            case 'products':
                searchProducts(term,res)
                break;
            case 'roles':
                break;
    
            default:
                res.status(500).json({
                    msg:'Busqueda aún no implementada'
                })
                break;
        }
     
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg:"Error en el servidor, contacte al administrador"
        })
    }
}
export {
    search
}
import { json, request, response } from "express";
import category from "../models/category.js";
import {Category} from '../models/index.js';
const createCategory = async (req=request,res=response) =>{
    try {
        
        const name = req.body.name.toUpperCase();
        const categoryDB = await Category.findOne({name})
    
        if(categoryDB){
            return res.status(400).json({
                msg:`La categoria ${categoryDB.name}, ya existe`
            })
        }
    
        // Generar la data a guardar
        const  data = {
            name,
            user:req.user._id
        }
        const category = await Category(data)
        // Guardar DB
        await category.save()
        res.status(201).json(category);
    } catch (error) {
        console.log(error)
        res.status(400).json({
            msg:"Datos incorrectos"
        })
    }
}
const getCategories = async (req=request,res=response) =>{
    const { limit=5,from=0 } = req.query
    const query = {status:true}

    const [total,categories] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
            .populate('user','name')
            .skip(Number(from))
            .limit(Number(limit))
    ])
 
    res.json({
        total,
        categories
    })
}
const getCategory = async (req=request,res=response) =>{
    const {id } = req.params;
    const category = await Category.findById(id)
                    .populate('user','name')
    res.json(category)
}
const updateCategory = async (req=request,res=response) =>{
    const { id } = req.params;
    const { status,user,...data } = req.body;
    try {
        
        data.name = data.name.toUpperCase();
        data.user = req.user._id;
        const category = await Category.findByIdAndUpdate(id,data,{new:true});
        res.json(category)
    } catch (error) {
        console.log(error)
        res.status(400).json({
            msg:"Datos incorrectos"
        })
    }

}
const deleteCategory = async (req=request,res=response) =>{
    const { id } = req.params;
    const categoryDeleted = await Category.findByIdAndUpdate(id,{status:false},{new:true})
    res.json(categoryDeleted)

}
export {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory
}
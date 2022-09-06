import {response,request } from 'express';
import User from '../models/user.js';
import bcryptjs from 'bcryptjs';

const usersGet = async (req=request,res = response) =>{
    
    const { limit=5,from=0 } = req.query
    const query = {status:true}

    const [total,users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(from))
            .limit(Number(limit))
    ])
 
    res.json({
        total,
        users
    })
}
const usersPut = async(req=request,res = response) =>{

    const {id} = req.params;
    // Excluir datos
    const { _id,password,google,email,...rest } =req.body;
   
    
    if(password){
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(password,salt)
    }
    const user = await User.findByIdAndUpdate(id,rest);
    
    res.json(user)
}

const usersPost = async (req=request,res = response) =>{
    
    const {name,email,password,role} = req.body;
    const user = new User({name,email,password,role});
    // Verificar si el correo existe
    
    // Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password,salt)
 
    await user.save()
    res.json({
        user
    })
}

const usersDelete = async (req,res = response) =>{
    const { id } = req.params

    const user = await User.findByIdAndUpdate(id,{status:false},{new:true})
 
    res.json(user)
}

const usersPatch = (req,res = response) =>{
  
    console.log("PORT: ",process.env.PORT)
    res.json({
        msg:"patch API - controlador"
    })
}

export {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete
}
import {response,request } from 'express';
import User from '../models/user.js';
import bcryptjs from 'bcryptjs';

const usersGet = (req=request,res = response) =>{
    
    const {q} = req.query
    
    res.json({
        msg:"get API - controlador",
        q
    })
}
const usersPut = (req=request,res = response) =>{

    const id = req.params.id
    console.log("ID USER ",id)
    res.json({
        msg:"put API - controlador",
        id
    })
}

const usersPost = async (req=request,res = response) =>{
    
    const {name,email,password,role} = req.body;
    const user = new User({name,email,password,role});
    // Verificar si el correo existe
    const existEmail = await User.findOne({email})
    if(existEmail){
        return res.status(400).json({
            msg:'El corre ya esta registrado'
        })
    }
    // Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password,salt)
 
    await user.save()
    res.json({
        msg:"post API - controlador",
        user
    })
}

const usersDelete = (req,res = response) =>{
  
    console.log("PORT: ",process.env.PORT)
    res.json({
        msg:"delete API - controlador"
    })
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
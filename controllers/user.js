import {response,request } from 'express'


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

const usersPost = (req=request,res = response) =>{

    const {name,age} = req.body;

    console.log(req.params)
    res.json({
        msg:"post API - controlador",
        name,
        age
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
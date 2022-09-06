import { request, response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
const validateJWT = async (req=request,res=response,next) =>{

    const token = req.header('x-token');
    if(!token){
        return res.status(401).json({
            msg:"No hay token en la petición"
        })
    }

    try {
        const {uid} = jwt.verify(token,process.env.SECRET_PRIVATE_KEY)
        // Ya que la request pasa por referencia, guardo el uid en esta
        const user = await User.findById(uid)

        if(!user){
            return res.status(401).json({
                msg:'Token no válido - usuario no existe en DB'
            }) 
        }

        // Verificar si el uuid tiene estado true
        if(!user.status){
            return res.status(401).json({
                msg:'Token no válido - usuario con estado:false'
            })
        }
        req.user = user
     
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg:'Token no válido'
        })
    }

}

export {
    validateJWT
}
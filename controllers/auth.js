import { json, request, response } from "express";
import User from "../models/user.js";
import bcrypt from 'bcryptjs';
import { generateJWT } from "../helpers/generate-jwt.js";
import { googleVerify } from "../helpers/google-verify.js";
const login = async (req=request,res=response) =>{
    const { email,password } = req.body;
    try {
        // Verificar si el email existe
        const user  = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                msg:'Usuario / Password no son correctos'
            });
        }

        // Si el usuario esta activo
        if(!user.status){
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - estado:false'
            });
        }

        // Verificar la contraseña
        const validPassword = bcrypt.compareSync(password,user.password)
        if(!validPassword){
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - password'
            });
        }

        // Genrar JWT
        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:'Hable con el administrador'
        })
    }
   
} 

const googleSignIn = async (req=request,res=response) =>{
    const { id_token }= req.body;
    try {

        const {email,name,img} = await googleVerify(id_token)
        let user = await User.findOne({email})
        if(!user){
            // Crearlo
            const data = { 
                name,
                email,
                password:'test',
                role:'USER_ROLE',
                img,
                google:true
            };
            user = new User(data)
            await user.save()
        }
        // Si el user en db 
        if(!user.status){
            return res.status(401).json({
                msg:'Hable con el administrador usuario bloqueado'
            });
        }
        const token = await generateJWT(user.id)
        res.json({
            user,
            token
        })


     
        
    } catch (error) {
        console.log(error)
        res.status(400).json({
            msg:'El token no se pudo verificar'
        })
    }
}


export {
    login,
    googleSignIn
}
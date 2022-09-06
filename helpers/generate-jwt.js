import jwt from "jsonwebtoken"

const generateJWT = (uid) =>{
    return new Promise((resolve,reject) =>{
        const payload = {uid};
        jwt.sign(payload,process.env.SECRET_PRIVATE_KEY,{
            expiresIn:'4h'
        },(err,token) =>{
            if(err){
                console.log(err);
                reject("No se pudo generar el token")
            }else{
                resolve(token);
            }
            
        })
    })
}

export {
    generateJWT
}
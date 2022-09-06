import { request, response } from "express";
import { validationResult } from "express-validator";
import User from "../models/user.js";

const validateFields = (req=request,res=response,next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors)
    }
    // Si el middleware pasa, sigo con el siguiente
    next();
}

export {
    validateFields,
    
};
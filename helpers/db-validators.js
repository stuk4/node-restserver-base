import { Category, Product } from '../models/index.js';
import Role from '../models/role.js'
import User from '../models/user.js';
const isValidRole = async (role = '') => {
    const existRole = await Role.findOne({role});
    if(!existRole){
        throw new Error(`El rol ${role} no está registrado en la BD`)
    }
}
const emailExist = async (email = '') =>{
    const existEmail = await User.findOne({email})
    if(existEmail){
       throw new Error(`El correo: ${email}, ya está registrado`)
    }
  
}
const existUserById = async (id) =>{
    const existUser = await User.findById(id);
    if(!existUser){
       throw new Error(`El id no existe: ${id}`)
    }
  
}
const existCategoryById = async (id) =>{
        const category = await Category.findById(id)
        if(!category){
            throw new Error(`El id no existe ${id}`);
        }
}
const existProductById = async (id) =>{
        const product = await Product.findById(id)
        if(!product){
            throw new Error(`El id no existe ${id}`);
        }
}
export {
    isValidRole,
    emailExist,
    existUserById,
    existCategoryById,
    existProductById
}
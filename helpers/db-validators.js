import Role from '../models/role.js'
const isValidRole = async (role = '') => {
    const existRole = await Role.findOne({role});
    if(!existRole){
        throw new Error(`El rol ${role} no está registrado en la BD`)
    }
}

export {
    isValidRole
}
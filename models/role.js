import mongoose from "mongoose";
const { Schema, model} = mongoose;
const RoleSchema =  Schema({
    role:{
        type:String,
        required:[true,'The role is necessary']
    }
})


export default model('Role',RoleSchema);
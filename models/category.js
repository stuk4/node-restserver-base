import mongoose from "mongoose";
const { Schema, model} = mongoose;
const CategoryScheme =  Schema({
    name:{
        type:String,
        required:[true,'The name is necessary'],
        unique:true
    },
    status:{
        type:Boolean,
        default:true,
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
})

// Limpiar objeto que entrega al crear y formatear
CategoryScheme.methods.toJSON = function(){
    const {__v,status,...data} = this.toObject();

    return data;

}

export default model('Category',CategoryScheme);
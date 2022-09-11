import mongoose from "mongoose";
const { Schema, model} = mongoose;
const ProductSchema =  Schema({
    name:{
        type:String,
        required:[true,'The name is necessary'],
        unique:true
    },
    status:{
        type:Boolean,
        default:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    price:{
        type:Number,
        default:0
    },
    category:{
        type:Schema.Types.ObjectId,
        ref:'Category',
        required:true
    },
    description:{
        type:String
    },
    available:{
        type:Boolean,
        default:true
    },
    img:{
        type:String
    }

})

// Limpiar objeto que entrega al crear y formatear
ProductSchema.methods.toJSON = function(){
    const {__v,status,...data} = this.toObject();

    return data;

}

export default model('Product',ProductSchema);
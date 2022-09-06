import mongoose from "mongoose";
const {Schema,model} = mongoose;
const UserSchema = Schema({
    name:{
        type:String,
        required:[true,'The name is necessary']
    },
    email:{
        type:String,
        required:[true,'The email is necessary'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'The password is necessary'],
    },
    img:{
        type:String,
    },
    role:{
        type:String,
        required:true,
        enum:['ADMIN_ROLE','USER_ROLE']
    },
    status:{
        type:Boolean,
        default:true
    },
    google:{
        type:Boolean,
        default:false
    }

})
// Limpiar objeto que entrega al crear y formatear
UserSchema.methods.toJSON = function(){
    const {__v,password,_id,...user} = this.toObject();
    user.uid = _id;
    return user;

}

export default model('User',UserSchema);

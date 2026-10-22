import mongoose from "mongoose";
import { genderEnum, providerEnum, roleEnum } from "../../enum/user.enum.js";

const userSchema = new mongoose.Schema({
fName :{ type : String,
    minLength : 2,
    maxLength : 10,
    required : true,
    trim : true
},
lName : {type : String,
    minLength : 2 ,
    maxLength : 10 ,
    required : true,
    trim : true
},
email : {
    type : String ,
    unique : true,
    required : true,
    lowercase : true,
    trim : true
},
password :{
    type : String,
    trim : true,
    required : function(){
        return this.provider == providerEnum.system ? true : false
    }
},
age : {
    type : Number,
    required : function(){
        return this.provider == providerEnum.system ? true : false
    }    
},
provider : {
    type : String,
    enum : Object.keys(providerEnum),
    default : providerEnum.system
},
gender : {
    type : String,
    enum : Object.keys(genderEnum),
    default : genderEnum.male
},
role : {
    type : String ,
    enum : Object.keys(roleEnum),
    default : roleEnum.user
},

phone : String,

isConfirmed: Boolean,
coverOfImages : [String],
profileImage : String,
changeCredentialAt : Date


},{
    timestamps : true,
    strict : true,
    strictQuery : true,
    toJSON : {virtuals : true},
    toObject : {virtuals : true}
})

 const userModel = mongoose.models.User || mongoose.model("User" , userSchema);


 export default userModel;
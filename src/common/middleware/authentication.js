
import  jwt  from 'jsonwebtoken';
import { findById } from '../../DB/db.service.js';
import userModel from '../../DB/model/user.model.js';
export const authentication = async(req,res,next)=>{
const {authorization} = req.headers;

if(!authorization){
    throw new Error("token is required" , {cause : 400});
}

const verifyToken = jwt.verify(authorization , "mohab1234");

if(!verifyToken){
    throw new Error("invalid token");
}

const user = await findById({
    model : userModel,
    id : verifyToken.id
})

req.user = user;
console.log(verifyToken);


next();
}
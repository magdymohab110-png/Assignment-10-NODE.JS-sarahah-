
import { model } from "mongoose";
import { CompareSync, HashSync } from "../../common/security/hash.js";
import * as dbServices from "../../DB/db.service.js";
import userModel from "../../DB/model/user.model.js";
import { providerEnum } from "../../enum/user.enum.js";
import { Encrypt } from './../../common/security/enctypt.js';
import jwt from "jsonwebtoken";
import {OAuth2Client} from 'google-auth-library';
const client = new OAuth2Client();

// sign up user

export const signUp = async (req , res , next) =>{
    const {fName,lName ,email,password,age,gender,phone,role} = req.body;

    const paths = [];
    console.log(req.files);
    
    for (const file of req.files.attachments) {
        paths.push(file.path);
        
    }

    if(await dbServices.findOne({
        model : userModel,
        filter : {email : email.toLowerCase()}
    }))
    {
        throw new Error("email already exist" , {cause : 409});
    }

    const user = await dbServices.create({
        model : userModel,
        data :{
            fName,
            lName,
            gender,
            age,
            email,
            password :await HashSync(password),
            provider : providerEnum.system,
            phone : Encrypt(phone),
            gender,
            role,
            profileImage : req.files.attachment[0].path,
            coverOfImages : paths
        }
    });

    return res.status(201).json({mesage : "user created successfully" , user});
}

// sign in user

export const signIn = async(req,res,next)=>{
    const {email , password} =req.body;
    const user = await dbServices.findOne({
        model : userModel,
        filter : {email : email.toLowerCase()}
    })
    if(!user){
        throw new Error("email not exist" , {cause : 404});
        
    }

    if(!CompareSync({plainText : password , Encrypt : user.password})){
        throw new Error("password invalid" , {cause : 400});
    }

    const access_token = jwt.sign({ id : user._id} ,"mohab1234" , {
        expiresIn : 60*5
    });

    const refresh_token = jwt.sign({id : user._id } ,"mohab1234123");

    return res.status(200).json({message : "done" , user , access_token})

}

// get profile user

export const getProfile = async (req,res,next) =>{

    const user = req.user
    return res.status(200).json({message : "user profile found successfully" , user});

}

// sign up with google gmail

export const signUpWithGmail = async(req,res,next) =>{
    const {idToken} = req.body;

  const verifyToken = await client.verifyIdToken({
      idToken,
      audience: "937290768910-d9atnrcpu0g8m9dmp8aqvigmhoirn8l7.apps.googleusercontent.com"
  });
  const payload = verifyToken.getPayload();



    const {email ,email_verified ,picture, given_name , family_name } = payload;
    let user = await dbServices.findOne({
        model : userModel,
        filter : {email : email.toLowerCase()}
    })

    if(!user){
        user = await dbServices.create({
            model: userModel,
            data: {
                email,
                isConfirmed : email_verified,
                profileImage : picture,
                fName : given_name,
                lName : family_name,
                provider : providerEnum.google
            }
        })
    }

    if(user.provider == providerEnum.system){
        throw new Error("the account already exist on system please log in with system" , {cause : 400});
    }
    const access_token = jwt.sign({id : user._id} , "mohab123" ,{
        expiresIn : 60*5
    });
    const refresh_token = jwt.sign({id : user._id} , "aser1234");

    return res.status(200).json({message : "user loggin in with google successfully"});

    
}
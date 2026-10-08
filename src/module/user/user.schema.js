import joi from "joi";
import { genderEnum, roleEnum } from "../../enum/user.enum.js";

export const signUpSchema = {
    body : joi.object({
        fName : joi.string().min(2).max(10).required(),
        lName : joi.string().min(2).max(10).required(),
        email : joi.string().email().required(),
        password : joi.string().required(),
        age : joi.number().min(20).max(60),
        profileImage : joi.string(),
        coverOfImages : joi.array(),
        gender : joi.string().valid(...Object.keys(genderEnum)),
        role : joi.string().valid(...Object.keys(roleEnum)),
        phone : joi.number()
    })
}

export const signInSchema = {
    body : joi.object({
        email : joi.string().email().required(),
        password : joi.string().required()
    })
}
import joi from "joi";
import { genderEnum, roleEnum } from "../../enum/user.enum.js";
import { generalRules } from "../../common/utils/generalRules.js";


//====================================== sign up schema ===========================
export const signUpSchema = {
    body : joi.object({
        fName : generalRules.fName.required(),
        lName : generalRules.lName.required(),
        email : generalRules.email.required(),
        password : generalRules.password.required(),
        age : generalRules.age,
        gender : joi.string().valid(...Object.keys(genderEnum)),
        role : joi.string().valid(...Object.keys(roleEnum)),
        phone : generalRules.phone
    }).required(),
    files:joi.object({
        attachment : joi.array().items(generalRules.file).max(1).required(),
        attachments : joi.array().items(generalRules.file).max(5).required()
        }).required()
}

//====================================== sign in schema ===========================

export const signInSchema = {
    body : joi.object({
        email : joi.string().email().required(),
        password : joi.string().required()
    }).required()
}
//====================================== refresh token schema ===========================

export const refreshTokenSchema = {
    headers : generalRules.token.required()
}

//======================================  token schema ===========================
export const shareProfileSchema = {
    params : joi.object({
        id : generalRules.id.required()
    }).required()
}

//======================================  update profile schema ===========================
export const updateProfileSchema = {
    body: joi.object({
        fName : generalRules.fName,
        lName : generalRules.lName,
        age : generalRules.age,
        gender : generalRules.gender,
        phone : generalRules.phone
    }).required()
}

//======================================  update password schema ===========================
export const updatePasswordSchema = {
    body : joi.object({
        oldPassword : generalRules.password.required(),
        newPassword : generalRules.password.required(),
        cPassword : generalRules.password.valid(joi.ref("newPassword")).required()
    }).required()
}

//======================================  confirm email schema ===========================
export const confirmEmailSchema = {
    body : joi.object({
        email : generalRules.email,
        otp : generalRules.otp.required()
    }).required()
}

//======================================  send otp schema ===========================
export const reSendOtpSchema = {
    body : joi.object({
        email : generalRules.email.required()
    }).required()
}

//======================================  forget password schema ===========================
export const forgetPasswordSchema = {
    body : joi.object({
        email : generalRules.email.required()
    }).required()
}

//======================================  reset password schema ===========================

export const resetPasswordSchema = {
    body : joi.object({
        email : generalRules.email.required(),
        password : generalRules.password.required(),
        otp : generalRules.otp.required()
    }).required()
}
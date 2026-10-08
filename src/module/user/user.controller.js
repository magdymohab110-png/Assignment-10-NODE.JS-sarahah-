import { Router } from "express";
import * as US from './user.service.js';
import Validation from "../../common/middleware/validation.js";
import { signInSchema, signUpSchema } from "./user.schema.js";
import { authentication } from "../../common/middleware/authentication.js";
import { authoriztion } from "../../common/middleware/authroization.js";
import { multerLocal } from "../../common/middleware/multer.js";

const userRouter = Router();

// sign up user
userRouter.post("/signup" , 
    multerLocal({customPath : "admins" ,customTypes : ["image/png"]}).fields([
        {name : "attachment" , max : 1},
        {name : "attachments" , max : 5}
    ]) 
    ,Validation(signUpSchema), US.signUp);

//sign in user
userRouter.post("/signin" ,Validation(signInSchema), US.signIn);

// get profile user
userRouter.get("/profile" , authentication , authoriztion(["user"]) , US.getProfile);

//user signup with gmail (google);
userRouter.post("/signup/gmail" , US.signUpWithGmail);

export default userRouter;
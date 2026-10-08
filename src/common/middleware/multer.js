import multer from "multer"
import fs from "fs"
import { randomUUID } from "crypto";

export const multerLocal = ({customPath = "General" , customTypes = []})=>{
    const fullPath = `uploads/${customPath}`;
    if(!fs.existsSync(fullPath)){
        fs.mkdirSync(fullPath , {recursive : true});
    }
    const storage = multer.diskStorage({
        destination : (req,file,cb)=>{
            cb(null , fullPath)
        },
        filename : (req,file,cb)=>{
           cb(null, randomUUID() + "__" + file.originalname) 
        }
    })

    function fileFilter(req,file,cb){
        if(!customTypes.includes(file.mimetype)){
            cb(new Error("invalid file" , {cause : 400}))
        }
        else{
            cb(null , true)
        }
    }
    const upload = multer({storage , fileFilter});
    return upload;
}
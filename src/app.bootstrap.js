import express from "express";
import { port } from "./config/config.js";
import connectDB  from "./DB/connectionDB.js";
import userRouter from "./module/user/user.controller.js";
import cors from "cors"
import { connectRedis } from "./DB/redis.connection.js";
const app = express();

const bootstrap = async()=>{

    app.use(cors({
        origin : "*"
    }));
    app.use(express.json());
    
    app.get("/" , (req,res,next)=>{
    return res.status(200).json({message : "hello in our sarahah app .... 👍"});
})

await connectDB();
await connectRedis();

app.use("/users" , userRouter);


app.all("{/*demo}" , (req,res,next)=>{
    throw new Error(`the URL : ${req.originalUrl} with method ${req.method} not found`,
        {cause : 404}
    )
})



app.use((err , req , res , next)=>{
res.status(err.cause || 500).json({message : err.message , stack : err.stack});
})

app.listen(port , ()=>{
    console.log(`server is running in port ${port}`);
})


}

export default bootstrap;
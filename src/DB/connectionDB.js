import mongoose from "mongoose";

 async function connectDB(){
    try{
        await mongoose.connect("mongodb+srv://mohab:12345@cluster0.lqcy3on.mongodb.net/Assignment_9(Sarahah)" , {serverSelectionTimeoutMS : 5000});
        console.log("DB is connected successfully");

    }catch{
        console.log("DB is failed to connect");

    }
}

export default connectDB;
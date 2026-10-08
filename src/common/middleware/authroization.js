
export const authoriztion = (roles = [])=>{
    return(req,res,next)=>{
        if(!roles.includes(req.user.role)){
            throw new Error("unAuthrized" , {cause : 401});
        }
        next();
    }
}
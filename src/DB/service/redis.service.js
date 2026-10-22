import { redis_client } from "../redis.connection.js"

// set value redis

export const setValue = async({key, value , ttl} = {}) =>{
    try {
        
         value = typeof value == "string" ? value : JSON.stringify(value);

        ttl ? 
        redis_client.set(key , value , {EX : ttl}) :
        redis_client.set(key , value)

    } catch (error) {
        console.log(error , "\nsetValue redis error");
        
    }
}


// get value redis

export const getValue = async(key) =>{
    try {

        try {
            return JSON.parse(await redis_client.get(key))
        } catch (error) {
            return await redis_client.get(key);
        }
    } catch (error) {
        console.log(error , "\ngetValue redis error");
        
    }
}

// update value redis

export const update = async({key,value ,ttl} = {}) =>{
    try {
        if(!await redis_client.exists(key)) return 0;
        redis_client.set(key,value , {EX : ttl})
    } catch (error) {
        console.log(error , "\nupdate redis error");
        
    }
}

// ttl redis

export const ttl = async(key) =>{

    try {
        return await redis_client.ttl(key);
    } catch (error) {
        console.log(error , "\nttl redis error");
        
    }
}

// we see if key exists

export const exists = async(key) =>{
    try {
        return await redis_client.exists(key);
    } catch (error) {
        console.log(error , "\nexists redis error");
        
    }
}

// expire

export const expire = async({key , ttl}) =>{
try {
        if(!key.length) return 0;
    return await redis_client.expire(key , ttl);

} catch (error) {
    console.log(error , "\nexists redis error");
    
}
}

// delete key
export const deleteKey = async(key)=>{
    try {
    
        return await redis_client.del(key);
    } catch (error) {
        console.log(error , "\ndeletKey redis error");
        
    }
}

// get all keys
export const keys = async(key)=>{
    try {
        
        return await redis_client.keys(`${key}*`)
    } catch (error) {
        console.log(error , "\nkey redis error");
        
    }
}

// incr 
export const incr = async(key)=>{
    try {
        return await redis_client.incr(key);
    } catch (error) {
        console.log(error , "\nincr redis error");
        
    }
}
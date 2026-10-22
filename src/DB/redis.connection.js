import { createClient } from "redis"

export const redis_client = createClient({
  url: "rediss://default:gQAAAAAAA5U1AAIgcDI5MjZmOGZlOGU2NDc0NzdjYmVjMWM4YjZhODgwNDc2Mw@humane-pig-234805.upstash.io:6379"
});

export async function connectRedis() {
    try {
        await redis_client.connect();
        console.log("redis connected successfully");
        
    } catch (error) {
        console.log("redis fail to connect");
        
    }
} 
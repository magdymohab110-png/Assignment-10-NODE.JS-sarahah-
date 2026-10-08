import { config } from "dotenv";
import {resolve} from "node:path"

const NODE_ENV = process.env.NODE_ENV  || "dev";
const env_path = {
    dev : ".env.development",
    prod : ".env.production"
}

config({path : resolve(`./src/config/${env_path[NODE_ENV]}`)});

export const port = process.env.PORT || "8000";
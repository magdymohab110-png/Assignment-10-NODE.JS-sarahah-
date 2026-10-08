import{hashSync , compareSync} from "bcrypt"

export const HashSync = async(plainText , SALT_ROUNDS = 12) =>{
    return hashSync(plainText,SALT_ROUNDS);
}

export const CompareSync = async({plainText ,Encrypt }) =>{
    return compareSync(plainText ,Encrypt)
}
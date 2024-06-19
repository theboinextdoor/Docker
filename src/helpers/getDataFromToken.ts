import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";


export const getDataFromToken= (request : NextRequest) => {
    try{

        // this token data is now encoded
        const encodedToken = request.cookies.get("token")?.value || ""

        // with the help of jwt we will now decoded the tokenData
        const decodedToken:any=  jwt.verify(encodedToken , process.env.TOKEN_SECRET!)
        return decodedToken.id;
    }catch(err:any){
        throw new Error(err.message)
    }
}
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"




connect();



export async function POST(request:NextRequest){
    try{
        const reqBody = await request.json();
        console.log(reqBody);

        const {email , password} = reqBody;

        //check if user exist in the database or not 
        const existingUser = await User.findOne({email})
        if(!existingUser) {
            return NextResponse.json({error:"User doesn't exist"}, {status: 400})
        }

        // check if the password is correct or not if the user exists inside ther database
        const validPassword = await bcryptjs.compare(password, existingUser.password)
        if(!validPassword){
            return NextResponse.json({error: "Password didn't match"},{status: 400})
        }

        //  create Token Data
        const tokenData = {
            id: existingUser._id,
            username: existingUser.username,
            email: existingUser.email
        }
    
        // create token
        const token= await jwt.sign(tokenData, 
            process.env.TOKEN_SECRET! , {expiresIn : "1d"})

            // this response go ahead and access user cookies
        const response = NextResponse.json({
            message: "Login SUccessfull",
            success: true
        })

        response.cookies.set("token" , token , 
             {
                httpOnly : true ,
            })
        
            return response       //this response is doing all the handeling , it will send the message and handeling the cookies 

    }catch(error : any){
        return NextResponse.json({error: error.message},{status: 500})
    }
}
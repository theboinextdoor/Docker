import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

// Connect the signup page to the database.
connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        console.log(reqBody);
        const { username, email, password } = reqBody;


        // Check if user already exists.
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }


        // Password Hashing
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);


        // Save the user data to the database.
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });
        const savedUser = await newUser.save();
        console.log(savedUser);


        // sending the email verification
        // await sendEmail({email , emailType: "VERIFY" , userId : savedUser._id})

        // Return the response to the client that user is successfully created.
        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })
    } catch (error:any) {
        console.error("Error:");
        console.error(error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

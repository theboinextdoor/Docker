import nodemailer from 'nodemailer'
import User from "@/models/userModel"
import bcrypt from 'bcryptjs'



export const sendEmail = async({email, emailType, userId}:any) => {
   
    try{

        // create a hashed token 
        const hashedToken = await bcrypt.hash(userId.toString() , 10)

        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(
                userId ,
                {
                verifyToken : hashedToken ,
                verifyTokenExpiry : Date.now() + 3600000
                }
                )
        }else if(emailType === "RESET"){
            await User.findByIdAndUpdate(
                userId,
                {
                    forgotPassword : hashedToken,
                    forgotPasswordTokenExpiry : Date.now() + 3600000
                }
            )
        }

        let transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: process.env.USER,
              pass: process.env.PASSWORD
            }
          });


          const mailoptions = {
            from : "process.env.MY_EMAIL",
            to : email,
            subject : email.type === "VERIFY" ? "Verify your email" : "Reset Your password" ,
            html : `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">herer</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}</p>`
          }


          const mailresponse = await transport.sendMail(mailoptions);
          return mailresponse; 
    }catch(error:any){
        throw new Error(error.message);
    }
}
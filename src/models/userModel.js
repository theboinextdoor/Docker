import mongoose from "mongoose"

//TODO:- Making the Schema
const userSchema = new mongoose.Schema({
    username : {
        type: String ,
        required : [true, "Please Provoide the username"],
        unique : true,
    },
    email: {
        type: String ,
        required : [true , "Please Provide the email"],
        unique : true
    },
    password : {
        type : String,
        required : [true, "Please Provide the password"],
    },
    isVarified : {
        type: Boolean ,
        default : false
    },
    isADmin : {
        type: Boolean ,
        default : false
    },
    forgotPassword: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,

})



//TODO:- Making the Model of the Schema
const User = mongoose.models.User || mongoose.model("User", userSchema);


export default User;
import asyncHandler from '../utils/asyncHandler.js';
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"

const registerUser=asyncHandler( async(req,res)=>{
  //get user details from frontend
  //validation- not empty fields
  //check if user already exsists: using username,email or any one!!
  //check for images, check for avatar(as its compulsary)
  //upload image to cloudinary,check if avatar is uploaded successfully or not cause its compulsary
  //create user object- create entry in db
  //remove password and refresh token from response
  //check for user creation
  //return response to frontend


  //it is used to get data from form and json
  const {fullName,username,email,password}=req.body;
  console.log("Email",email);

  // if (fullName=="") {
  //   throw new ApiError(400,"Full Name Is Required")
  // }
  if (
    [fullName,email,username,password].some((field)=>field?.trim()==="")
  ) {
    throw new ApiError(400,"All fields are required")
  }


  const exsistedUser=User.findOne({
    $or:[
      { username },
      { email }
    ]
  })
if (exsistedUser) {
    throw new ApiError(409,"User with given username or email already exsists")
  }

} )

export {registerUser}
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from '../utils/ApiResponse.js';

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


  const exsistedUser=await User.findOne({
    $or:[
      { username },
      { email }
    ]
  })
if (exsistedUser) {
    throw new ApiError(409,"User with given username or email already exsists")
  }

  const avatarLocalPath=req.files?.avatar[0]?.path;//gpt
  const coverImageLocalPath=req.files?.coverImage[0]?.path;//gpt
  
  if (!avatarLocalPath) {
    throw new ApiError(400,"Avatar Image Is Req.")
  }

  //uploading on cloudinary
  const avatar=await uploadOnCloudinary(avatarLocalPath);
  const coverImage=await uploadOnCloudinary(coverImageLocalPath);
 
  if (!avatar) {
    throw new ApiError(400,"Avatar Image Is Req.")
  }
 
  //entry in db
  const user=await User.create({
    fullName,
    avatar:avatar.url,
    coverImage:coverImage?.url|| "" ,//it is not req field , so cheching for edge cases, if it was not provided by the user then
    email,
    password,
    username:username.toLowerCase()
  })
 
   //checking for user, also can  remove password and refresh token hehe from here only, by chaining. (only if user is found)
  const  createdUser=await User.findById(user._id).select(
    "-password -refreshToken"
  )
  if (!createdUser) {
    throw new ApiError(500,"Something went wrong while registering the user")
  }


  //now to return response as user is made

  return res.status(201).json(
    new ApiResponse(200,createdUser,"User Registered Successfully")
  )


} )

export {registerUser}
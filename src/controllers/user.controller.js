import asyncHandler from '../utils/asyncHandler.js';
import ApiError from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from '../utils/ApiResponse.js';
import jwt from "jsonwebtoken"
//refresh token is long lived
//access token is short lived
const generateAccessAndRefreshToken=async(userId)=>{
  try {
    const user=await User.findById(userId)
    const accessToken=user.generateAccessToken()
    const refreshToken=user.generateRefreshToken()

    user.refreshToken=refreshToken()
    await user.save({validateBeforeSave:false})

    return {accessToken,refreshToken}

  } catch (error) {
    throw new ApiError(500,"Something went wrong while generating refresh and access token")
  }
}

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
    [fullName,email,username,password].some((field)=>field?.trim()=="")
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
  //const coverImageLocalPath=req.files?.coverImage[0]?.path;//gpt

  let coverImageLocalPath;
  if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length>0) {
    coverImageLocalPath=req.files.coverImage[0].path
  }
  
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

const loginUser=asyncHandler(async(req,res)=>{
   //req body=>take data 
   //username or email
   //find the user
   //password check
   //access and refresh token
   //send secure cookies

   const {email,username,password}=req.body;

   if(!username && !email){
    throw new ApiError(400,"Username or Email is required")
   }
   //hERE IS AN ATERNATIvE OF THE ABOVE CODE BASED ON LOGIC DISCUSSED IN VIDEO:
   //IF (! (username || email) ) {
   // THROW NEW APIERROR(400,"USERNAME OR EMAIL IS REQUIRED")
   //}

   const user=await User.findOne({
    $or:[{username},{email}]
   })
   if (!user) {
    throw new ApiError(404,"User not found")
   }

   const isPasswordValid=await user.isPasswordCorrect(password)
   if (!isPasswordValid) {
    throw new ApiError(404,"Invalid user credentials")
   }
  
   const {accessToken,refreshToken}=await generateAccessAndRefreshToken(user._id)

   const loggedInUser=await User.findById(user._id).select("-password -refreshToken")

   //cookkies
   const options={
    httpOnly:true,
    secure:true
   } //makes the cookies only modifiable through the server and cant be modified from the frontend

   return res
   .status(200)
   .cookie("accessToken",accessToken,options)
   .cookie("refreshToken",refreshToken,options)
   .json(
    new ApiResponse(
      200,
      {
        user:loggedInUser,accessToken,refreshToken
      },
      "User logged in successfully"
    )
   )

})

const logoutUser=asyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $set:{
          refreshToken:undefined
        }
      },
      {new:true}
    )

    //cookkies
   const options={
    httpOnly:true,
    secure:true
   }
   return res
   .status(200)
   .clearCookie("accessToken",options)
   .clearCookie("refreshToken",options)
   .json(
    new ApiResponse(
      200,
      {},
      "User logged out successfully"
    )
   )
})

const refreshAccessToken=asyncHandler(async(req,res)=>{
  const incomingRefreshToken=req.cookies.refreshToken||req.body.refreshToken

  if(!incomingRefreshToken){
    throw new ApiError(401,"Refresh Token is missing")
  }

  try {
    const decodedToken=jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET,
  )
    const user=await User.findById(decodedToken?._id)
    
    if(!user){
      throw new ApiError(401,"Invalid Refresh Token")
    }
  
    if(incomingRefreshToken!==user?.refreshToken){
      throw new ApiError(401,"Refresh Token Mismatch,Login Again")
    }
  
    const options={
      httpOnly:true,
      secure:true
     }
     const {accessToken,newRefreshToken}=await generateAccessAndRefreshToken(user._id)
  
     return res
      .status(200)
      .cookie("accessToken",accessToken,options)
      .cookie("refreshToken",newRefreshToken,options)
      .json(
        new ApiResponse(
          200,
          {accessToken,refreshToken:newRefreshToken},
          "Access Token refreshed successfully"
      )
    )
  } catch (error) {
    throw new ApiError(401,error?.message||"Invalid Refresh Token")
  }
})

const changeCurrentPassword=asyncHandler(async(req,res)=>{
  const {oldPassword,newPassword}=req.body

  const user=await User.findById(req.user?._id)

  const isPasswordCorrect=await user.isPasswordCorrect(oldPassword)
  if(!isPasswordCorrect){
    throw new ApiError(
      400,"Invaid Password"
    )
  }

  user.password=newPassword
  await user.save({validateBeforeSave:false})

  return res
  .status(200)
  .json(new ApiResponse(200,{},"Password changed successfully"))


})

const getCurrentUser=asyncHandler(async(req,res)=>{
  return res
  .status(200)
  .json(new ApiResponse(200,req.user,"Current user fetched successfully"))
})

//production tip:when there is file upload, use another controller
const updateAccountDetails=asyncHandler(async(req,res)=>{
  const {fullName,email}=req.body

  if(!fullName || !email){
    throw new ApiError(400,"Full Name and Email are required")
  }
  
  const user=User.findByIdAndUpdate(
    req.user?._id,
    {
      $set:{
        fullName,
        email:email
      }
    },
    {new:true}
  ).select("-password")

  res
  .status(200)
  .json(new ApiResponse(200,user,"Account details updated successfully"))
})

export {registerUser,loginUser,logoutUser,refreshAccessToken,changeCurrentPassword,getCurrentUser}